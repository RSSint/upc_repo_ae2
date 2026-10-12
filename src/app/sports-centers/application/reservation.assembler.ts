import { Injectable } from '@angular/core';
import { ApiAssembler } from '../../shared/infrastructure/api/api-assembler';
import { CreateReservationRequest, Reservation } from '../domain/model/reservation';
import {
  CreateReservationResource,
  ReservationResource,
} from '../infrastructure/api/resource/reservation.resource';


@Injectable({ providedIn: 'root' })
export class ReservationAssembler implements ApiAssembler<Reservation, ReservationResource> {
 toDomain(resource: ReservationResource): Reservation {
    return {
      id: resource.id,
      sportsCenterId: resource.sportsCenterId,
      activityType: resource.activityType,
      participantName: resource.participantName,
      participants: resource.participants,
      weatherTemperature: resource.weatherTemperature,
      reservedAt: resource.reservedAt,
    };
  }

 toResource(request: CreateReservationRequest): CreateReservationResource {
    return {
      sportsCenterId: request.sportsCenterId,
      activityType: request.activityType,
      participantName: request.participantName,
      participants: request.participants,
      weatherTemperature: request.weatherTemperature,
      reservedAt: request.reservedAt,
    };
  }
}
