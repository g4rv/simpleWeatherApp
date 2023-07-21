import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';

const CurrentWeather: React.FC<{className?: string}> = ({className = ''}) => {
	const { weatherData, loading, error } = useSelector((state: RootState) => state.weather);
    const { units } = useSelector((state: RootState) => state.settings);

    if(loading) return 'loading...'
    if(error) return error

    if(!weatherData) return 'Something went wrong :('

	const currentTemp =
		units === 'metric'
			? weatherData.current.temp_c
			: weatherData.current.temp_f;

	const maxTemp =
		units === 'metric'
			? weatherData.forecast.forecastday[0].day.maxtemp_c
			: weatherData.forecast.forecastday[0].day.maxtemp_f;

	const minTemp =
		units === 'metric'
			? weatherData.forecast.forecastday[0].day.mintemp_c
			: weatherData.forecast.forecastday[0].day.mintemp_f;

	return (
		<>
			{weatherData !== null ? (
				<section className={`flex flex-col items-center bg-slate-600 ${className}`}>
					<h1 className="text-3xl">{weatherData.location.name}</h1>
					<p className="text-8xl font-thin">{currentTemp}&deg;</p>
					<p className="text-xl font-semibold text-gray-400">
						{weatherData.current.condition.text}
					</p>
					<div className="flex flex-col items-center">
						<span className="text-xl font-semibold">
							MIN: {maxTemp}
							&deg;
						</span>
						<span className="text-xl font-semibold">
							MAX: {minTemp}
							&deg;
						</span>
					</div>
				</section>
			) : (
				'Loading...'
			)}
		</>
	);
};

export default CurrentWeather;
