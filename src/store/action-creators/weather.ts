import { Dispatch } from 'redux';
import axios from 'axios';
import { WeatherAction, WeatherActionTypes, WeatherType } from '@/types/weather';

export const fetchWeather = (location = 'paris') => {

	const URL = `https://api.weatherapi.com/v1/forecast.json?key=4427dfaf9ef64da58a3121536233004&q=${location}&days=3&aqi=yes&alerts=no`;

	return async (dispatch: Dispatch<WeatherAction>) => {
		try {
			dispatch({ type: WeatherActionTypes.FETCH_WEATHER });
			const response = await axios.get<WeatherType>(URL);
			dispatch({
				type: WeatherActionTypes.FETCH_WEATHER_SUCCESS,
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: WeatherActionTypes.FETCH_WEATHER_ERROR,
				payload: `There was an error during retrieving weather data`,
			});
		}
	};
};
