export type WatherLocation = {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string
}

export type Temperature = {
    temp_c: number,
    temp_f: number,
    is_day: number,
    condition: Condition,
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: string,
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
}

export type Condition = {
    text: string,
    icon: string,
    code: number
}

export type AirQuality = {
    co: number,
    no2: number,
    o3: number,
    so2: number,
    pm2_5: number,
    pm10: number,
    us_epa_index: number,
    gb_defra_index: number
}

export type Current = Temperature & {
    last_updated_epoch: number,
    last_updated: string,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
    air_quality: AirQuality
}

export type Forecast = {
    forecastday: Days[]
}

export type Day = {
    maxtemp_c: number,
    maxtemp_f: number,
    mintemp_c: number,
    mintemp_f: number,
    avgtemp_c: number,
    avgtemp_f: number,
    maxwind_mph: number,
    maxwind_kph: number,
    totalprecip_mm: number,
    totalprecip_in: number,
    totalsnow_cm: number,
    avgvis_km: number,
    avgvis_miles: number,
    avghumidity: number,
    daily_will_it_rain: number,
    daily_chance_of_rain: number,
    daily_will_it_snow: number,
    daily_chance_of_snow: number,
    condition: Condition,
    uv: number
}

export type Astro = {
    sunrise: string,
    sunset: string,
    moonrise: string,
    moonset: string,
    moon_phase: string,
    moon_illumination: string,
    is_moon_up: number,
    is_sun_up: number
}

export type HourInfo = Temperature & {
    time_epoch: number,
    time: string,
    windchill_c: number,
    windchill_f: number,
    heatindex_c: number,
    heatindex_f: number,
    dewpoint_c: number,
    dewpoint_f: number,
    will_it_rain: number,
    chance_of_rain: number,
    will_it_snow: number,
    chance_of_snow: number,
    vis_km: number,
    vis_miles: number,
    gust_mph: number,
    gust_kph: number,
    uv: number
}

export type Days = {
    date: string,
    date_epoch: number,
    day: Day,
    astro: Astro,
    hour: HourInfo[],
}

export type WeatherType = {
    location: WatherLocation;
    current: Current;
    forecast: Forecast;
}

export type WeatherState = {
	weatherData: WeatherType | object;
	loading: boolean;
	error: null | string;
};

export enum WeatherActionTypes {
	FETCH_WEATHER = 'FETCH_WEATHER',
	FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS',
	FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR',
}

type FetchWeatherAction = {
	type: WeatherActionTypes.FETCH_WEATHER;
};

type FetchWeatherSuccessAction = {
	type: WeatherActionTypes.FETCH_WEATHER_SUCCESS;
	payload: WeatherType;
};

type FetchWeatherErrorAction = {
	type: WeatherActionTypes.FETCH_WEATHER_ERROR;
	payload: string;
};

export type WeatherAction =
	| FetchWeatherAction
	| FetchWeatherSuccessAction
	| FetchWeatherErrorAction;