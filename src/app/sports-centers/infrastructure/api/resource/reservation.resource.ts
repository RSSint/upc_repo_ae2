import { ActivityType } from '../../../domain/model/sports-center';

export interface ReservationResource {
  id: number;
  sportsCenterId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
  weatherTemperature: number;
  reservedAt: string;
}

export type CreateReservationResource = Omit<ReservationResource, 'id'>;
