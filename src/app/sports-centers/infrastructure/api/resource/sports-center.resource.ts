import { ActivityType } from '../../../domain/model/sports-center';

export interface SportsCenterResource {
  id: number;
  name: string;
  activityType: ActivityType;
  capacity: number;
  latitude: number;
  longitude: number;
}
