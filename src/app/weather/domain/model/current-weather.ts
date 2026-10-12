
export interface CurrentWeather {
  temperature: number;
}

export interface OpenMeteoResponse {
  current?: {
    temperature_2m?: number;
  };
}
