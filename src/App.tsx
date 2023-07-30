import { useAppSelector } from './hooks/useAppSelectro';
import { useFetchWeatherQuery } from './redux/weatherSlice/apiSlice';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import { useAppDispatch } from './hooks/useAppDispatch';
import { setForecastMode, toggleUnitsType } from './redux/settingsSlice/slice';
import { ForecastMode } from './redux/settingsSlice/types';
import { twMerge } from 'tailwind-merge';
import WeatherDetails from './components/WeatherDatails';
import { useState } from 'react';
import SearchInput from './components/SearchInput';

const App = () => {
	const [isDetailsShown, setIsDetailsShown] = useState(false);
	const { location, forecastMode, unitsType } = useAppSelector(
		(state) => state.settings
	);
	const dispatch = useAppDispatch();
	const { isLoading } = useFetchWeatherQuery(location);

	const handleForecastModeChange = (mode: ForecastMode) => {
		dispatch(setForecastMode(mode));
	};

	if (isLoading) return <div>Loading...</div>;

	const handleToggleUnitsType = () => {
		dispatch(toggleUnitsType());
	};

	const handleOpenDetails = () => {
		setIsDetailsShown(true);
	};
	const handleCloseDetails = () => {
		setIsDetailsShown(false);
	};

	return (
		<main className=" relative container mx-auto h-full  bg-cyan-500 bg-[url('./bg2.jpg')] before:absolute before:inset-0 before:-z-[1] before:bg-gray-700/30 bg-no-repeat bg-cover lg:grid lg:grid-cols-[1fr_0.5fr] isolate">
			<div className="relative grid h-full grid-rows-[max-content_1fr_max-content]">
				<button
					onClick={handleToggleUnitsType}
					className="absolute left-6 top-6 box-content aspect-square h-6 w-6 rounded-full bg-purple-300/70 p-2 hidden lg:block"
				>
					<p>{unitsType === 'metric' ? 'C' : 'F'}&deg;</p>
				</button>
				<SearchInput className="place-self-center py-4" />
				<CurrentWeather />
				<div className="relative mx-auto flex  w-full max-w-full flex-col overflow-hidden rounded-t-3xl bg-purple-800/50 before:absolute before:inset-0 before:backdrop-blur-md sm:w-[80%] xl:max-w-xl">
					<div className="relative px-6 pb-2 pt-2 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-full before:bg-purple-950/70">
						<div className="mx-auto flex max-w-sm justify-between gap-2">
							<button
								className={twMerge(
									`relative font-semibold opacity-70 duration-200 before:absolute before:-bottom-2 before:left-0 before:right-0 before:mx-auto before:h-1 before:w-0 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:duration-200`,
									forecastMode === 'hourly' &&
										'opacity-100 before:w-full'
								)}
								onClick={() =>
									handleForecastModeChange('hourly')
								}
							>
								Hourly Forecast
							</button>
							<button
								className={twMerge(
									`relative font-semibold opacity-70 duration-200 before:absolute before:-bottom-2 before:left-0 before:right-0 before:mx-auto before:h-1 before:w-0 before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:duration-200`,
									forecastMode === 'daily' &&
										'opacity-100 before:w-full'
								)}
								onClick={() =>
									handleForecastModeChange('daily')
								}
							>
								Daily Forecast
							</button>
						</div>
					</div>
					<div className="px-4 pt-2">
						<ForecastList />
					</div>
					<div className="before: relative flex justify-evenly gap-4 p-2 before:absolute before:left-0 before:top-0 before:h-[1px] before:w-full before:bg-purple-950/70 lg:hidden">
						<button
							onClick={handleToggleUnitsType}
							className="relative box-content aspect-square h-6 w-6 rounded-full bg-purple-300/70 p-2"
						>
							<p>{unitsType === 'metric' ? 'C' : 'F'}&deg;</p>
						</button>
						<button
							onClick={handleOpenDetails}
							className="relative box-content aspect-square h-6 w-6 rounded-full bg-purple-300/70 p-2 lg:hidden"
						>
							<div className="absolute left-0 right-0 top-[30%] mx-auto h-[2px] w-[50%] bg-white"></div>
							<div className="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto h-[2px] w-[50%] bg-white"></div>
							<div className="absolute bottom-[30%] left-0 right-0 mx-auto h-[2px] w-[50%] bg-white"></div>
						</button>
					</div>
				</div>
			</div>
			<section
				className={twMerge(
					'absolute inset-0 z-10 h-fit max-h-full min-h-full overflow-y-auto bg-gradient-to-tl from-[rgb(69,39,139)] to-[rgb(46,51,90)] pt-12 lg:relative lg:block lg:pt-0',
					!isDetailsShown && 'hidden'
				)}
			>
				<h2 className="hidden">WeatherDetails</h2>
				<button
					onClick={handleCloseDetails}
					className="absolute left-2 top-2 box-content aspect-square h-6 w-6 rounded-full bg-purple-300/70 p-2 lg:hidden"
				>
					<div className="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto h-[2px] w-[50%] rotate-45 bg-white"></div>
					<div className="absolute bottom-0 left-0 right-0 top-0 mx-auto my-auto h-[2px] w-[50%] -rotate-45 bg-white"></div>
				</button>
				<WeatherDetails />
			</section>
		</main>
	);
};

export default App;
