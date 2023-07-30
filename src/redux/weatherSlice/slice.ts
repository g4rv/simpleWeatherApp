import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { weatherApiSlice } from './apiSlice';
import { WeatherData } from './types';

const initialState: WeatherData = {
	location: {
		name: '',
		region: '',
		country: '',
		tz_id: '',
		localtime: '',
	},
	current: {
		temp_c: 0,
		temp_f: 0,
		condition: {
			text: '',
			icon: '',
		},
		wind_mph: 0,
		wind_kph: 0,
		wind_degree: 0,
		wind_dir: '',
		pressure_mb: 0,
		pressure_in: 0,
		precip_mm: 0,
		precip_in: 0,
		humidity: 0,
		cloud: 0,
		feelslike_c: 0,
		feelslike_f: 0,
		vis_km: 0,
		vis_miles: 0,
		uv: 0,
		gust_mph: 0,
		gust_kph: 0,
		air_quality: {
			co: 0,
			no2: 0,
			o3: 0,
			so2: 0,
			pm2_5: 0,
			pm10: 0,
			'us-epa-index': 0,
			'gb-defra-index': 0,
		},
	},
	forecast: {
		forecastday: [
			{
				date: '',
				day: {
					avghumidity: 0,
					maxtemp_c: 0,
					maxtemp_f: 0,
					mintemp_c: 0,
					mintemp_f: 0,
					avgtemp_c: 0,
					avgtemp_f: 0,
					maxwind_mph: 0,
					maxwind_kph: 0,
					totalprecip_mm: 0,
					totalprecip_in: 0,
					totalsnow_cm: 0,
					avgvis_km: 0,
					avgvis_miles: 0,
					daily_will_it_rain: 0,
					daily_chance_of_rain: 0,
					daily_will_it_snow: 0,
					daily_chance_of_snow: 0,
					condition: {
						icon: '',
						text: '',
					},
					uv: 0,
				},
				astro: {
					sunset: '',
					sunrise: '',
				},
				hour: [
					{
						chance_of_rain: 0,
						chance_of_snow: 0,
						condition: {
							icon: '',
							text: '',
						},
						temp_c: 0,
						temp_f: 0,
						time: '',
                        wind_mph: 0,
                        wind_kph: 0,
                        wind_degree: 0,
                        wind_dir: '',
                        pressure_mb: 0,
                        pressure_in: 0,
                        precip_mm: 0,
                        precip_in: 0,
                        humidity: 0,
                        cloud: 0,
                        feelslike_c: 0,
                        feelslike_f: 0,
                        windchill_c: 0,
                        windchill_f: 0,
                        heatindex_c: 0,
                        heatindex_f: 0,
                        dewpoint_c: 0,
                        dewpoint_f: 0,
                        will_it_rain: 0,
                        will_it_snow: 0,
                        vis_km: 0,
                        vis_miles: 0,
                        gust_mph: 0,
                        gust_kph: 0,
                        uv: 0,
					},
				],
			},
		],
	},
};

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			weatherApiSlice.endpoints.fetchWeather.matchFulfilled,
			(state, action: PayloadAction<WeatherData>) => {
				state.location = action.payload.location
				state.current = action.payload.current
				state.forecast = action.payload.forecast
			}
		);
	},
});

export default weatherSlice.reducer;
