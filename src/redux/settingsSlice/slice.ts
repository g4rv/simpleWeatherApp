import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ForecastMode, SettingsState, UnitsType } from './types';

const initialState: SettingsState = {
	location: 'pereyaslav',
	unitsType: 'metric',
	forecastMode: 'hourly',
};

const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setLocation: (state, action: PayloadAction<string>) => {
			state.location = action.payload;
		},
		setUnitsType: (state, action: PayloadAction<UnitsType>) => {
			state.unitsType = action.payload;
		},
		toggleUnitsType: (state) => {
			state.unitsType =
				state.unitsType === 'metric' ? 'imperial' : 'metric';
		},
		setForecastMode: (state, action: PayloadAction<ForecastMode>) => {
			state.forecastMode = action.payload;
		},
		toggleForecastMode: (state) => {
			state.forecastMode =
				state.forecastMode === 'hourly' ? 'daily' : 'hourly';
		},
	},
});

export const {
	setLocation,
	setUnitsType,
	toggleUnitsType,
	setForecastMode,
	toggleForecastMode,
} = settingsSlice.actions;

export default settingsSlice.reducer;
