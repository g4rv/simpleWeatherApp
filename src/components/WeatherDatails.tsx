import { useAppSelector } from '@/hooks/useAppSelectro';
import CustomRange from './CustomRange';
import WeatherDetailItem from './WeatherDetailItem';
import {
	formatDateTime,
	formatHours,
	getAirQualityResult,
	getUvResult,
} from '@/utils';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const WeatherDetails = () => {
	const [airDetailsIsShown, setAirDetailsIsShown] = useState(false);
	const { current, forecast } = useAppSelector((state) => state.weather);
	const { unitsType } = useAppSelector((state) => state.settings);

	const handleShowAirDetails = () => {
		setAirDetailsIsShown((prev) => !prev);
	};

	const forecastDay = forecast.forecastday[0];
	const currentHour = forecastDay.hour.find(
		(hour) => formatDateTime(hour.time) === 'Now'
	);

	const airQualityIndex =
		unitsType === 'metric'
			? current.air_quality['gb-defra-index']
			: current.air_quality['us-epa-index'];

	const AIR_QUALITY_MAX_RANGE = unitsType === 'metric' ? 10 : 6;

	const uvIndex = current.uv;

	const sunriseTime = forecastDay.astro.sunrise;
	const sunsetTime = forecastDay.astro.sunset;

	const windSpeedValue =
		unitsType === 'metric' ? current.wind_kph : current.wind_mph;
	const windSpeedUnits = unitsType === 'metric' ? 'km' : 'm';

	const windDegree = current.wind_degree;

	const rainChange = forecastDay.day.daily_chance_of_rain;

	const totalPrecip =
		unitsType === 'metric'
			? forecastDay.day.totalprecip_mm
			: forecastDay.day.totalprecip_in;
	const percipUnits = unitsType === 'metric' ? 'mm' : 'in';

	const feelsLikeTemp =
		unitsType === 'metric' ? current.feelslike_c : current.feelslike_f;
	const currentTemp =
		unitsType === 'metric' ? current.feelslike_c : current.feelslike_f;
	const isTempSimilar =
		currentTemp - feelsLikeTemp <= 2 && currentTemp - feelsLikeTemp >= -2;

	const humidity = current.humidity;
	const currentDewPoint =
		unitsType === 'metric'
			? currentHour?.dewpoint_c
			: currentHour?.dewpoint_f;

	const visibility =
		unitsType === 'metric' ? current.vis_km : current.vis_miles;

	const visibilityUnits = unitsType === 'metric' ? 'km' : 'miles';

	const pressure =
		unitsType === 'metric' ? current.pressure_mb : current.pressure_in;
	const pressureUnits = unitsType === 'metric' ? 'mb' : 'in';

	return (
		<div className="grid gap-2 p-2 md:min-h-0">
			<WeatherDetailItem title="air quality" className="col-span-full">
				<p className="mb-3 mt-4 text-xl font-semibold capitalize">
					{airQualityIndex}-
					{getAirQualityResult(airQualityIndex, unitsType)}
				</p>
				<CustomRange
					className="mb-6"
					rangeValue={airQualityIndex}
					maxRange={AIR_QUALITY_MAX_RANGE}
				/>
				<div className="relative before:absolute before:top-0 before:h-[1px] before:w-full before:bg-gray-400/40">
					<div
						className={twMerge(
							'grid grid-rows-[0fr] duration-300',
							airDetailsIsShown && 'grid-rows-[1fr] py-2'
						)}
					>
						<div className="overflow-hidden">
							<table className="w-full">
								<thead>
									<tr>
										<td className="pb-2">Component</td>
										<td className="pb-2 text-center">
											Value
										</td>
									</tr>
								</thead>
								<tbody>
									<tr className="border border-white/50 bg-white/10">
										<td className="py-1 pl-3">
											Carbon Monoxide (μg/m3)
										</td>
										<td className="text-center">
											{current.air_quality.co}
										</td>
									</tr>
									<tr className="border border-white/50">
										<td className="py-1 pl-3">
											Ozone (μg/m3)
										</td>
										<td className="text-center">
											{current.air_quality.o3}
										</td>
									</tr>
									<tr className="border border-white/50 bg-white/10">
										<td className="py-1 pl-3">
											Nitrogen dioxide (μg/m3)
										</td>
										<td className="text-center">
											{current.air_quality.no2}
										</td>
									</tr>
									<tr className="border border-white/50">
										<td className="py-1 pl-3">
											Sulphur dioxide (μg/m3)
										</td>
										<td className="text-center">
											{current.air_quality.so2}
										</td>
									</tr>
									<tr className="border border-white/50 bg-white/10">
										<td className="py-1 pl-3">
											PM2.5 (μg/m3)
										</td>
										<td className="text-center">
											{current.air_quality.pm2_5}
										</td>
									</tr>
									<tr className="border border-white/50">
										<td className="py-1 pl-3">
											PM10 (μg/m3)
										</td>
										<td className="text-center">
											{current.air_quality.pm10}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<button
						onClick={handleShowAirDetails}
						className="mt-2 flex w-full justify-between gap-2"
					>
						<span>See more</span>
						<span>&gt;</span>
					</button>
				</div>
			</WeatherDetailItem>
			<div className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(min(100%,135px),1fr))] gap-2 sm:grid-cols-[repeat(auto-fill,minmax(min(100%,150px),1fr))]">
				<WeatherDetailItem title="uv index">
					<p className="mt-4 flex flex-col gap-1 font-semibold capitalize">
						<span className="text-3xl leading-none">{uvIndex}</span>
						<span className="text-xl leading-none">
							{getUvResult(uvIndex)}
						</span>
					</p>
					<CustomRange
						rangeValue={uvIndex}
						maxRange={11}
						className="mt-3"
					/>
				</WeatherDetailItem>
				<WeatherDetailItem title="sunrise" className='flex flex-col justify-evenly'>
					<p className="text-2xl font-semibold">
						{formatHours(sunriseTime, unitsType)}
					</p>
					<p>Sunset: <span className='text-sm'>{formatHours(sunsetTime, unitsType)}</span></p>
				</WeatherDetailItem>
				<WeatherDetailItem title="wind" className='px-1 pb-1'>
					<div className="relative flex flex-col">
						<p className="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center">
							<span className="text-2xl font-semibold">
								{windSpeedValue}
							</span>
							<span className="font-semibold">
								{windSpeedUnits}/h
							</span>
						</p>
						<div
							className="absolute inset-0 m-auto flex h-full w-0.5 flex-col justify-between opacity-90"
							style={{ rotate: `${windDegree}deg` }}
						>
							<div className="h-[20%] w-full bg-white before:absolute before:h-[5%] before:w-full before:origin-top before:rotate-45 before:bg-white after:absolute after:h-[5%] after:w-full after:origin-top after:-rotate-45 after:bg-white"></div>
							<div className="h-[20%] w-full bg-white before:absolute before:bottom-1 before:right-0 before:h-[6%] before:w-2 before:origin-top before:skew-y-[-35deg] before:bg-white after:absolute after:bottom-1 after:left-0 after:h-[6%] after:w-2  after:origin-top after:skew-y-[35deg] after:bg-white"></div>
						</div>
						<div className="absolute inset-0">
							<span className="absolute left-0 right-0 top-3 mx-auto h-fit w-fit">
								N
							</span>
							<span className="absolute bottom-3 left-0 right-0 mx-auto h-fit w-fit">
								S
							</span>
							<span className="absolute bottom-0 left-4 top-0 my-auto h-fit w-fit">
								W
							</span>
							<span className="absolute bottom-0 right-4 top-0 my-auto h-fit w-fit">
								E
							</span>
						</div>
						<svg
							version="1.0"
							xmlns="http://www.w3.org/2000/svg"
							width="100"
							height="100"
							viewBox="0 0 484 485"
							className=" h-full w-full fill-white"
						>
							<path d="M239 32v10h6V22h-6v10zm-21.8-7.1c-1.8 1.1-1.2 4.1 1 5.5 1.4.8 2.2.7 3.5-.7 2.9-2.9-1-7.1-4.5-4.8zm44.8.5c-2.7 3.3 1.8 7.2 4.8 4.2 1.3-1.3 1.4-2 .6-3.4-1.5-2.3-3.8-2.6-5.4-.8zm-67.6 4c-1 2.6.4 4.8 2.8 4.4 1.7-.2 2.3-1 2.3-2.8 0-1.8-.6-2.6-2.3-2.8-1.3-.2-2.5.3-2.8 1.2zm89.2.2c-.9 2.2 1.2 4.6 3.8 4.2 1.5-.2 2.1-1 2.1-2.8 0-2-.6-2.6-2.6-2.8-1.8-.2-2.9.3-3.3 1.4zm-110.4 4.6c-3 3 .1 7.3 3.6 5.1 2.3-1.4 2.5-2.9.7-4.7-2-1.9-2.7-2-4.3-.4zm133.3.4c-1.8 1.8-1.6 3.3.7 4.7 3.5 2.2 6.6-2.1 3.6-5.1-1.6-1.6-2.3-1.5-4.3.4zM152 42.5c-1.9 2.3-.8 5 2 5 1.6 0 2.6-.6 2.8-1.8.4-1.8-1.4-4.7-2.8-4.7-.4 0-1.3.7-2 1.5zm175.5.1c-1.8 1.8-1.6 3.3.7 4.7 2.1 1.4 4.8.2 4.8-2.2 0-3-3.4-4.5-5.5-2.5zm21.1 9.7c-3.5 5.6-8.7 15-8.4 15.2l2.5 1.4c2 1 2.5.5 6.7-6.9 2.5-4.3 4.6-8.3 4.6-8.7 0-.5-.9-1.4-2-2.1-1.7-1-2.2-.9-3.4 1.1zm-217.3-.6c-.7.2-1.3.8-1.3 1.3 0 1.2 9.1 17 9.9 17 .3 0 1.4-.7 2.4-1.4 1.8-1.4 1.6-1.9-2.8-9.5-4.5-7.7-5.4-8.6-8.2-7.4zm-19.2 14.1c-1.3 2.5.8 5.6 3.5 5 2.9-.5 2.7-6.2-.3-6.6a3 3 0 0 0-3.2 1.6zm254.3-.4c-1.1 2.9 0 5.1 2.6 5.1 2.1 0 2.5-.5 2.5-3 0-2.4-.5-3.1-2.3-3.3-1.3-.2-2.4.3-2.8 1.2zM95 79.5c-1.8 2.2-.8 5 1.9 5 3.2 0 4.9-2.8 3.2-4.9-1.7-2-3.5-2-5.1-.1zm289 0c-1.8 2.1-.3 5.5 2.5 5.5 1.5 0 2.6-.7 3-2 .7-2.3-1-5-3-5-.7 0-1.8.7-2.5 1.5zm-305 16c-1.8 2.2-.8 5 1.9 5 3.2 0 4.9-2.8 3.2-4.9-1.7-2-3.5-2-5.1-.1zm321 0c-1.8 2.1-.3 5.5 2.5 5.5 1.5 0 2.6-.7 3-2 .7-2.3-1-5-3-5-.7 0-1.8.7-2.5 1.5zM64.7 112.7c-1.3 1.2-.7 5.1.9 5.7 2.1.8 2 .8 3.8-1 1.2-1.2 1.3-2 .6-3.5-1-1.9-4-2.6-5.3-1.2zm349.4.6c-1.4 1.7-.6 4.3 1.6 5.1 2.2.9 4.5-1.3 4.1-3.8-.4-2.5-4-3.3-5.7-1.3zM51.2 132l-1.2 2.4c0 .5 16 9.6 16.9 9.6.7 0 3.4-4.1 2.9-4.4-.9-.7-16.8-9.6-17-9.6-.2 0-.9.9-1.6 2zm372.1 2.3a131 131 0 0 0-7.8 4.9c-.9.9.4 4.8 1.6 4.8 1.2 0 16.9-9 16.9-9.7 0-1-2.1-4.3-2.8-4.3-.4.1-3.9 2-7.9 4.3zM42 152.4c-2.7 3.3 1.8 7.2 4.8 4.2 1.3-1.3 1.4-2 .6-3.4-1.5-2.3-3.8-2.6-5.4-.8zm394.5.7c-1.4 4.3 4.5 6.6 6.1 2.4.8-1.9-1.3-4.5-3.7-4.5-1 0-2.1 1-2.4 2.1zM34 173.4c-2.7 3.3 1.8 7.2 4.8 4.2 1.3-1.3 1.4-2 .6-3.4-1.5-2.3-3.8-2.6-5.4-.8zm411 0c-2.7 3.3 1.8 7.2 4.8 4.2 1.3-1.3 1.4-2 .6-3.4-1.5-2.3-3.8-2.6-5.4-.8zm-417 22c-2.7 3.3 1.8 7.2 4.8 4.2 1.3-1.3 1.4-2 .6-3.4-1.5-2.3-3.8-2.6-5.4-.8zm422.3.2c-1.5 3.9 3.8 6.7 6 3.2.8-1.2.7-2.1-.2-3.2-1.7-2.1-5-2-5.8 0zM25.2 216.9c-.8.4-1.2 1.9-1 3.2.2 1.8.9 2.4 2.8 2.4s2.6-.6 2.8-2.4c.3-2-1.1-4.1-2.8-4.1-.3 0-1.1.4-1.8.9zm429.3.7c-1.8 1.8-1.6 3.3.7 4.7 3.5 2.2 6.6-2.1 3.6-5.1-1.6-1.6-2.3-1.5-4.3.4zm-12.3 24.5c.2 1.9.6 3.3 1.1 3.1.4-.1 4.8-.2 9.7-.2 8.9 0 9 0 9-2.5 0-2.4-.2-2.5-6.9-2.5-3.8 0-8.3-.3-10-.6-3.2-.7-3.2-.6-2.9 2.7zm-420.2.4v2.5h20v-5H22v2.5zM454.5 263c-1.5 1.6-1.6 2.2-.5 3.5 1.9 2.2 5.4 1.5 5.8-1.2.5-3.3-3-4.8-5.3-2.3zm-430.1.4c-1 2.6.4 4.8 2.8 4.4 1.7-.2 2.3-1 2.3-2.8 0-1.8-.6-2.6-2.3-2.8-1.3-.2-2.5.3-2.8 1.2zm3.6 22.1c-2.6 3.1 1.8 7.1 4.7 4.2 1.9-1.9.8-5.7-1.6-5.7-1 0-2.4.7-3.1 1.5zm422.3.1c-.6 1.7.6 4.5 2.3 5.1.5.2 1.9-.3 2.9-1.1 1.6-1.2 1.8-1.8.9-3.3-1.5-2.4-5.2-2.9-6.1-.7zM33.7 306.7c-1.3 1.3-.7 4.2 1.2 5.2 2.7 1.5 5.6-.9 4.7-3.7-.7-2.1-4.4-3.1-5.9-1.5zm411 0c-1.3 1.3-.7 4.2 1.2 5.2 2.7 1.5 5.6-.9 4.7-3.7-.7-2.1-4.4-3.1-5.9-1.5zM41.5 329c-.7 2.3 1 5 3 5s3.7-2.7 3-5c-.4-1.3-1.5-2-3-2s-2.6.7-3 2zm394.8-.4c-.6 1.7.6 4.5 2.3 5.1.5.2 1.9-.3 2.9-1.1 1.6-1.2 1.8-1.8.9-3.3-1.5-2.4-5.2-2.9-6.1-.7zM58.2 345.1c-7.7 4.7-8.1 5.2-7.1 7.2l1.4 2.5c.1.1 4.1-2 8.8-4.8l8.7-5.1-1.6-2.5c-.9-1.3-1.7-2.4-1.8-2.3l-8.4 5zm357.6-2.5c-.6 1.3-.9 2.6-.7 2.8l8.4 4.9c8 4.6 8 4.6 9.2 2.4.6-1.2.9-2.5.7-2.8a67 67 0 0 0-8.4-5.2l-8.1-4.6-1.1 2.5zM64.7 366.7c-1.6 1.5-.6 5.2 1.5 5.9 2.8.9 5.2-2 3.7-4.7-1-1.9-3.9-2.5-5.2-1.2zm349.4.7c-.9 1.1-1 2-.1 3.6 1.3 2.4 3.8 2.3 5.3-.1 2.3-3.7-2.5-6.8-5.2-3.5zm-334.6 17c-2.5 1.8-1.5 5 1.6 5.4 2.8.3 4.3-1.6 3.3-4.2-.8-2.1-3-2.6-4.9-1.2zm321 0c-2.7 2-1.5 5.1 2 5.1 2.3 0 3.1-.5 3.3-2.2.4-2.9-2.8-4.7-5.3-2.9zM94.4 401.5c-1 2.5.4 4.5 3 4.5 2.5 0 3.9-2 3-4.5-.4-.8-1.7-1.5-3-1.5-1.4 0-2.7.7-3 1.5zm289-.1c-1.1 2.8.4 4.8 3.3 4.4 2.2-.2 2.8-.8 2.8-2.8 0-2-.6-2.6-2.8-2.8-1.8-.2-2.9.2-3.3 1.2zM112 415.9c-.7 1.5-.6 2.4.6 3.6.9.9 2.1 1.4 2.7 1.2 1.8-.6 3.1-3.3 2.4-5.1-.9-2.2-4.4-2-5.7.3zm254.7-1.3c-1.3 1.3-.7 5.2.9 5.8 2.2.9 4.6-1.3 4.2-3.8-.3-2.1-3.7-3.4-5.1-2zm-232.2 8.6c-4.5 7.7-4.6 8.2-2.9 9.5 1 .7 2.1 1.3 2.5 1.3.4 0 2.8-3.7 5.3-8.2 4.4-7.6 4.6-8.3 3-9.5-1-.7-2.1-1.3-2.5-1.3-.4 0-2.8 3.7-5.4 8.2zm207.2-7c-1.5 1.2-1.3 2 3 9.5 4.7 8.4 6.1 9.5 8.3 6.8 1-1.2.4-2.9-3.3-9.2a37.1 37.1 0 0 0-5.4-8c-.5-.2-1.6.2-2.6.9zm-189.5 20.7c-.8.4-1.2 1.9-1 3.2.2 1.8.9 2.4 2.8 2.4s2.6-.6 2.8-2.4c.3-2-1.1-4.1-2.8-4.1-.3 0-1.1.4-1.8.9zm175.3.7c-1.8 1.8-1.6 3.3.7 4.7 3.5 2.2 6.6-2.1 3.6-5.1-1.6-1.6-2.3-1.5-4.3.4zM239 453v10h6v-20h-6v10zm-65.8-7.8c-3 3 .1 7.3 3.6 5.1 2.3-1.4 2.5-2.9.7-4.7-2-1.9-2.7-2-4.3-.4zm133.4.4c-.9.8-1.6 1.8-1.6 2.2.1 3.8 6.3 4.2 6.8.5.4-3-3.1-4.9-5.2-2.7zm-111.4 5.3c-.8.4-1.2 1.9-1 3.2.2 1.8.9 2.4 2.8 2.4s2.6-.6 2.8-2.4c.3-2-1.1-4.1-2.8-4.1-.3 0-1.1.4-1.8.9zm89.4.7c-2.2 2.1-.3 5.6 2.7 5.2 3.7-.5 3.3-6.7-.5-6.8-.4 0-1.4.7-2.2 1.6zm-68.3 4c-.6 1.7.6 4.5 2.3 5.1.5.2 1.9-.3 2.9-1.1 1.6-1.2 1.8-1.8.9-3.3-1.5-2.4-5.2-2.9-6.1-.7zm45.2.4c-.7 2.3 1 5 3 5s3.7-2.7 3-5c-.9-2.7-5.1-2.7-6 0z" />
						</svg>
					</div>
				</WeatherDetailItem>
				<WeatherDetailItem
					title="rainfall"
					className="flex flex-col justify-between gap-2"
				>
					<p className="mt-2 text-base font-semibold">
						<span className="text-2xl leading-none">
							{rainChange}
						</span>
						<span className="text-xl leading-none">
							{' '}
							{percipUnits}
						</span>
						<br />
						<span> in last hour</span>
					</p>
					<p className="text-sm">
						{totalPrecip} {percipUnits} expected in next 24h
					</p>
				</WeatherDetailItem>
				<WeatherDetailItem
					title="feels like"
					className="flex flex-col gap-2"
				>
					<p className="mt-2 text-3xl">{feelsLikeTemp}&deg;</p>
					<p className="mt-auto text-sm">
						{isTempSimilar
							? 'Similar to the actual temperature'
							: 'is quiet different from actual temperature'}
					</p>
				</WeatherDetailItem>
				<WeatherDetailItem
					title="humidity"
					className="flex flex-col justify-between gap-2"
				>
					<p className="mt-2 text-3xl">{humidity}%</p>
					{currentDewPoint && (
						<p className="text-sm">
							The dew point is {currentDewPoint} right now
						</p>
					)}
				</WeatherDetailItem>
				<WeatherDetailItem
					title="visibility"
					className="flex items-center justify-center text-center px-1"
				>
					<p className="-mt-4 text-3xl">
						{visibility} {visibilityUnits}
					</p>
				</WeatherDetailItem>
				<WeatherDetailItem
					title="pressure"
					className="flex items-center justify-center text-center px-1"
				>
					<p className="-mt-4 text-3xl">
						{pressure} {pressureUnits}
					</p>
				</WeatherDetailItem>
			</div>
		</div>
	);
};
export default WeatherDetails;
