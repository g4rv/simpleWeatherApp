import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherData } from './types';

const WEATHER_API_KEY = '4427dfaf9ef64da58a3121536233004';

export const weatherApiSlice = createApi({
	// reducerPath: 'weather',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.weatherapi.com/v1',
	}),
    endpoints(builder) {
        return {
            fetchWeather: builder.query<WeatherData, string>({
                query(location = 'kiev') {
                    return `/forecast.json?key=${WEATHER_API_KEY}&q=${location}&aqi=yes&days=3`
                },
                // transformResponse: (response: WeatherApiResponse) => {
                //     return newResponse
                // }
            })
        }
    }
});

export const { useFetchWeatherQuery } = weatherApiSlice
