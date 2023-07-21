import { WeatherAction, WeatherActionTypes, WeatherState } from "@/types/weather";


const initialState: WeatherState = {
	weatherData: null,
	loading: false,
	error: null,
};

export const weatherReducer = (
	state = initialState,
	action: WeatherAction
): WeatherState => {
	switch (action.type) {
		case WeatherActionTypes.FETCH_WEATHER:
			return { ...state, loading: true };
		case WeatherActionTypes.FETCH_WEATHER_SUCCESS:
			return { ...state, loading: false, weatherData: action.payload };
		case WeatherActionTypes.FETCH_WEATHER_ERROR:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};
