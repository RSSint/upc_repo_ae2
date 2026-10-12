import { ActivityType, SportsCenter } from './sports-center';

export interface Reservation {
  id: number;
  sportsCenterId: number;
  activityType: ActivityType;
  participantName: string;
  participants: number;
 weatherTemperature: number;
 reservedAt: string;
}


export type CreateReservationRequest = Omit<Reservation, 'id'>;

export interface SportsCenterSummary {
  center: SportsCenter;
 reservations: Reservation[];
  totalParticipants: number;
 availableCapacity: number;
}
