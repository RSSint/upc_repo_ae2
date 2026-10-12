import { Injectable } from '@angular/core';
import { ApiAssembler } from '../../shared/infrastructure/api/api-assembler';
import { CurrentWeather, OpenMeteoResponse } from '../domain/model/current-weather';


@Injectable({ providedIn: 'root' })
export class OpenMeteoAssembler implements ApiAssembler<CurrentWeather, OpenMeteoResponse> {
 toDomain(resource: OpenMeteoResponse): CurrentWeather {
    const temperature = resource.current?.temperature_2m;
    if (typeof temperature !== 'number' || !Number.isFinite(temperature)) {
      throw new Error('Weather provider returned no valid current temperature.');
    }
    return { temperature };
  }
}
