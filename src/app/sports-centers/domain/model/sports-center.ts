
export interface SportsCenter {

  id: number;

  name: string;

  activityType: ActivityType;

  capacity: number;

  latitude: number;

  longitude: number;
}


export type ActivityType = 'fitness' | 'yoga' | 'swimming' | 'cycling';
