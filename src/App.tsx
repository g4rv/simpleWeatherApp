import { useEffect } from 'react';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import { useActions } from './hooks/useActions';
import { RootState } from './store/reducers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SettingsActionTypes } from './types/settings';

const App = () => {
	const dispatch = useDispatch();
	const { fetchWeather } = useActions();

	const { location } = useSelector((state: RootState) => state.settings);

	useEffect(() => {
		fetchWeather(location);
	}, []);

	const handleUnitsChange = () => {
		dispatch({ type: SettingsActionTypes.TOGGLE_UNITS });
	};
	const handleForecastModeChange = () => {
		dispatch({ type: SettingsActionTypes.TOGGLE_FORECAST_MODE });
	};

	return (
		<main className="container mx-auto grid h-full grid-rows-[1fr_max-content] bg-cyan-500">
			<CurrentWeather className="place-self-center" />
			<ForecastList />
			<button
				className="absolute left-2 top-4 bg-slate-400"
				onClick={handleUnitsChange}
			>
				c / f
			</button>
			<button
				className="absolute left-2 top-12 bg-slate-400"
				onClick={handleForecastModeChange}
			>
				d / h
			</button>
		</main>
	);
};

export default App;
