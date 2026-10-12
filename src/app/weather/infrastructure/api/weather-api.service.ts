import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CurrentWeather, OpenMeteoResponse } from '../../domain/model/current-weather';
import { OpenMeteoAssembler } from '../../application/open-meteo.assembler';
import { BaseApi } from '../../../shared/infrastructure/api/base-api';

@Injectable({ providedIn: 'root' })
export class WeatherApi extends BaseApi<CurrentWeather, OpenMeteoResponse> {
  constructor(http: HttpClient) {
    super(http, environment.weatherApiUrl, new OpenMeteoAssembler());
  }

  getCurrentWeather(latitude: number, longitude: number): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('latitude', latitude)
      .set('longitude', longitude)
      .set('current', 'temperature_2m');
    return this.getResource(params);
  }
}
