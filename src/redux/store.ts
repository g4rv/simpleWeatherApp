import { configureStore } from '@reduxjs/toolkit';
import settingsSlice from './settingsSlice//slice';
import { weatherApiSlice } from './weatherSlice/apiSlice';
import weatherSlice from './weatherSlice/slice';

export const store = configureStore({
	reducer: {
		settings: settingsSlice,
		weather: weatherSlice,
		[weatherApiSlice.reducerPath]: weatherApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(weatherApiSlice.middleware);
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
