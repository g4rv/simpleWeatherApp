import { ForecastMode, SettingsAction, SettingsActionTypes, SettingsState, UnitsType } from '@/types/settings';

const initialState: SettingsState = {
	location: 'pereyaslav',
	units: 'metric',
	forecastMode: 'hourly',
};

const handleUnitsToggle = (currentState: UnitsType) => {
    if(currentState === 'imperial') return 'metric'
    if(currentState === 'metric') return 'imperial'
    return currentState
}

const handleForecastModeToggle = (currentState: ForecastMode) => {
    if(currentState === 'hourly') return 'daily'
    if(currentState === 'daily') return 'hourly'
    return currentState
}

export const settingsReducer = (
	state = initialState,
	action: SettingsAction
): SettingsState => {
	switch (action.type) {
		case SettingsActionTypes.SET_LOCATION:
			return { ...state, location: action.payload };
		case SettingsActionTypes.SET_UNITS:
			return { ...state, units: action.payload};
		case SettingsActionTypes.SET_FORECAST_MODE:
			return { ...state, forecastMode: action.payload};
		case SettingsActionTypes.TOGGLE_UNITS:
			return { ...state, units: handleUnitsToggle(state.units)};
		case SettingsActionTypes.TOGGLE_FORECAST_MODE:
			return { ...state, forecastMode: handleForecastModeToggle(state.forecastMode)};

		default:
			return state;
	}
};
