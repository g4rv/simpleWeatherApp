export type UnitsType = 'metric' | 'imperial'
export type ForecastMode = 'hourly' | 'daily'

export type SettingsState = {
	location: string;
	units: UnitsType;
	forecastMode: ForecastMode;
};

export enum SettingsActionTypes {
	SET_LOCATION = 'SET_LOCATION',
	SET_UNITS = 'SET_UNITS',
	SET_FORECAST_MODE = 'SET_FORECAST_MODE',
	TOGGLE_UNITS = 'TOGGLE_UNITS',
	TOGGLE_FORECAST_MODE = 'TOGGLE_FORECAST_MODE',
}

type SetLocationAction = {
	type: SettingsActionTypes.SET_LOCATION;
	payload: string;
};

type SetUnits = {
	type: SettingsActionTypes.SET_UNITS;
	payload: UnitsType;
};

type SetForecastMode = {
	type: SettingsActionTypes.SET_FORECAST_MODE;
	payload: ForecastMode;
};

type ToggleUnits = {
	type: SettingsActionTypes.TOGGLE_UNITS;
};

type ToggleForecastMode = {
	type: SettingsActionTypes.TOGGLE_FORECAST_MODE;
};

export type SettingsAction =
	| SetLocationAction
	| SetUnits
	| SetForecastMode
	| ToggleUnits
	| ToggleForecastMode;
