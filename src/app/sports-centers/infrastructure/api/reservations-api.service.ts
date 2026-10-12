import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ReservationAssembler } from '../../application/reservation.assembler';
import { CreateReservationRequest, Reservation } from '../../domain/model/reservation';
import { BaseApi } from '../../../shared/infrastructure/api/base-api';
import {
  CreateReservationResource,
  ReservationResource,
} from './resource/reservation.resource';

@Injectable({ providedIn: 'root' })
export class ReservationsApi extends BaseApi<
  Reservation,
  ReservationResource,
  CreateReservationResource
> {
  private readonly reservationAssembler: ReservationAssembler;

  constructor(http: HttpClient) {
    const assembler = new ReservationAssembler();
    super(
      http,
      `${environment.sportsCentersApiUrl}${environment.reservationsPath}`,
      assembler,
    );
    this.reservationAssembler = assembler;
  }

getReservations(sportsCenterId?: number): Observable<Reservation[]> {
    const params = sportsCenterId === undefined
      ? undefined
      : new HttpParams().set('sportsCenterId', sportsCenterId);
    return this.getAll(params);
  }

createReservation(request: CreateReservationRequest): Observable<Reservation> {
    return this.postResource(this.reservationAssembler.toResource(request));
  }
}
