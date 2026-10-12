import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SportsCenter } from '../../domain/model/sports-center';
import { SportsCenterAssembler } from '../../application/sports-center.assembler';
import { BaseApi } from '../../../shared/infrastructure/api/base-api';
import { SportsCenterResource } from './resource/sports-center.resource';

@Injectable({ providedIn: 'root' })
export class SportsCentersApi extends BaseApi<SportsCenter, SportsCenterResource> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.sportsCentersApiUrl}${environment.sportsCentersPath}`,
      new SportsCenterAssembler(),
    );
  }

  getSportsCenters(): Observable<SportsCenter[]> {
    return this.getAll();
  }
}
