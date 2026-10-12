import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { firstValueFrom } from 'rxjs';
import { SportsCentersStore } from '../../application/sports-centers.store';
import { Reservation } from '../../domain/model/reservation';
import { ActivityType } from '../../domain/model/sports-center';
import { ReservationsApi } from '../../infrastructure/api/reservations-api.service';
import { SportsCentersApi } from '../../infrastructure/api/sports-centers-api.service';
import { WeatherApi } from '../../../weather/infrastructure/api/weather-api.service';


@Component({
  selector: 'new-reservation-page',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe, MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
  templateUrl: './new-reservation-page.component.html',
  styleUrl: './new-reservation-page.component.css',
})
export class NewReservationPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  private readonly sportsCentersApi = inject(SportsCentersApi);
  private readonly reservationsApi = inject(ReservationsApi);
  private readonly weatherApi = inject(WeatherApi);
  readonly store = inject(SportsCentersStore);
  readonly activities: ActivityType[] = ['fitness', 'yoga', 'swimming', 'cycling'];
  readonly selectedCenter = signal<ReturnType<SportsCentersStore['findCenter']>>(undefined);
  readonly weatherTemperature = signal<number | null>(null);
  readonly weatherLoading = signal(false);
  readonly weatherError = signal('');
  readonly saving = signal(false);
  readonly submitError = signal('');
  private weatherRequestId = 0;
  readonly form = this.fb.nonNullable.group({
    activityType: this.fb.nonNullable.control<ActivityType | ''>('', Validators.required),
    participantName: this.fb.nonNullable.control('', [Validators.required, (control) =>
      typeof control.value === 'string' && control.value.trim().length > 0 ? null : { whitespace: true }]),
    participants: this.fb.nonNullable.control(1, [Validators.required, Validators.min(1), (control) =>
      Number.isInteger(Number(control.value)) ? null : { integer: true }]),
  });
 ngOnInit(): void {
    this.form.controls.activityType.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((activity) => void this.selectActivity(activity));
    void this.store.refresh().then(() => {
      const activity = this.form.controls.activityType.value;
      if (activity) void this.selectActivity(activity);
    });
  }

 private async selectActivity(activity: ActivityType | ''): Promise<void> {
    const requestId = ++this.weatherRequestId;
    this.selectedCenter.set(undefined);
    this.weatherTemperature.set(null);
    this.weatherError.set('');
    this.submitError.set('');
    this.weatherLoading.set(false);
    if (!activity) return;
    let center = this.store.findCenter(activity);
    if (!center) {
      await this.store.refresh();
      if (requestId !== this.weatherRequestId) return;
      center = this.store.findCenter(activity);
    }
    if (!center) {
      this.weatherError.set('reservation.center-not-found');
      return;
    }
    this.selectedCenter.set(center);
    this.weatherLoading.set(true);
    this.weatherApi.getCurrentWeather(center.latitude, center.longitude)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (weather) => {
          if (requestId !== this.weatherRequestId) return;
          this.weatherTemperature.set(weather.temperature);
          this.weatherLoading.set(false);
        },
        error: () => {
          if (requestId !== this.weatherRequestId) return;
          this.weatherError.set('reservation.weather-error');
          this.weatherLoading.set(false);
        },
      });
  }

 async createReservation(): Promise<void> {
    this.form.markAllAsTouched();
    const activity = this.form.controls.activityType.value;
    const name = this.form.controls.participantName.value.trim();
    const participants = Number(this.form.controls.participants.value);
    const temperature = this.weatherTemperature();
    const activityCenter = activity ? this.store.findCenter(activity) : undefined;
    if (this.form.invalid || !activity || !activityCenter) {
      if (!activityCenter && activity) this.submitError.set('reservation.center-not-found');
      return;
    }
    if (temperature === null || this.weatherLoading() || this.weatherError()) {
      this.submitError.set('reservation.weather-required');
      return;
    }
    this.saving.set(true);
    this.submitError.set('');
    try {
      const [centers, reservations] = await Promise.all([
        firstValueFrom(this.sportsCentersApi.getSportsCenters()),
        firstValueFrom(this.reservationsApi.getReservations(activityCenter.id)),
      ]);
      const center = centers.find((candidate) => candidate.activityType === activity);
      if (!center) throw new Error('Center not found');
      const occupied = reservations.reduce((sum, reservation) => sum + reservation.participants, 0);
      if (!Number.isInteger(participants) || participants <= 0 || participants > center.capacity - occupied) {
        this.form.controls.participants.setErrors({ max: true });
        this.submitError.set('reservation.capacity-exceeded');
        return;
      }
      const request: Omit<Reservation, 'id'> = {
        sportsCenterId: center.id,
        activityType: activity,
        participantName: name,
        participants,
        weatherTemperature: temperature,
        reservedAt: new Date().toISOString(),
      };
      await firstValueFrom(this.reservationsApi.createReservation(request));
      await this.router.navigate(['/home']);
    } catch {
      this.submitError.set('reservation.create-error');
    } finally {
      this.saving.set(false);
    }
  }

cancel(): void {
    void this.router.navigate(['/home']);
  }
}
