
export type UnitsType = 'metric' | 'imperial'
export type ForecastMode = 'hourly' | 'daily'

export type SettingsState = {
    location: string;
    unitsType: UnitsType;
    forecastMode: ForecastMode;
}
