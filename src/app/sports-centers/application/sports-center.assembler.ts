import { Injectable } from '@angular/core';
import { ApiAssembler } from '../../shared/infrastructure/api/api-assembler';
import { SportsCenter } from '../domain/model/sports-center';
import { SportsCenterResource } from '../infrastructure/api/resource/sports-center.resource';


@Injectable({ providedIn: 'root' })
export class SportsCenterAssembler implements ApiAssembler<SportsCenter, SportsCenterResource> {
 toDomain(resource: SportsCenterResource): SportsCenter {
    return {
      id: resource.id,
      name: resource.name,
      activityType: resource.activityType,
      capacity: resource.capacity,
      latitude: resource.latitude,
      longitude: resource.longitude,
    };
  }
}
