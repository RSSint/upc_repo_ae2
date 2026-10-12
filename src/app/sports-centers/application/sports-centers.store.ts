import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Reservation } from '../domain/model/reservation';
import { SportsCenter, ActivityType } from '../domain/model/sports-center';
import { SportsCenterSummary } from '../domain/model/reservation';
import { ReservationsApi } from '../infrastructure/api/reservations-api.service';
import { SportsCentersApi } from '../infrastructure/api/sports-centers-api.service';

@Injectable({ providedIn: 'root' })
export class SportsCentersStore {
  private readonly api = inject(SportsCentersApi);
  private readonly reservationsApi = inject(ReservationsApi);
  readonly centers = signal<SportsCenter[]>([]);
  readonly reservations = signal<Reservation[]>([]);
  readonly loading = signal(false);
  readonly loadError = signal('');
 readonly summaries = computed<SportsCenterSummary[]>(() =>
    this.centers().map((center) => {
      const reservations = this.reservations().filter((item) => item.sportsCenterId === center.id);
      const totalParticipants = reservations.reduce((total, item) => total + item.participants, 0);
      return {
        center,
        reservations,
        totalParticipants,
        availableCapacity: center.capacity - totalParticipants,
      };
    }),
  );
 async refresh(): Promise<void> {
    this.loading.set(true);
    this.loadError.set('');
    try {
      const [centers, reservations] = await Promise.all([
        firstValueFrom(this.api.getSportsCenters()),
        firstValueFrom(this.reservationsApi.getReservations()),
      ]);
      this.centers.set(centers);
      this.reservations.set(reservations);
    } catch {
      this.loadError.set("We couldn't load sports center data. Check that the API is running.");
    } finally {
      this.loading.set(false);
    }
  }

  /** Finds the unique center assigned to an activity. */
  findCenter(activityType: ActivityType): SportsCenter | undefined {
    return this.centers().find((center) => center.activityType === activityType);
  }
}
