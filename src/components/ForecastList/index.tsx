import React, { useRef } from 'react';
import { RootState } from '@/store/reducers';
import { useSelector } from 'react-redux';

import ForecastItem from '../ForecastItem';
import { formatDate } from '@/utils';

import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';

const ForecastList: React.FC<{ className?: string }> = ({ className = '' }) => {
	const { weatherData } = useSelector((state: RootState) => state.weather);
	const { forecastMode, units } = useSelector(
		(state: RootState) => state.settings
	);

	const swiper = useRef<SwiperRef>(null);
	if (!weatherData) return 'sobething went wrong :(';

	return (
		<section className={`max-w-full overflow-hidden ${className}`}>
			<Swiper
				modules={[Scrollbar]}
				scrollbar={{
					hide: true,
				}}
				spaceBetween={12}
				slidesPerView={'auto'}
				ref={swiper}
				onInit={() => {
					const currentTimeSlideIndex =
						weatherData?.forecast.forecastday[0].hour.findIndex(
							(hour) => formatDate(hour.time) === 'Now'
						) || 0;
					swiper.current?.swiper.slideTo(currentTimeSlideIndex, 0);
				}}
				className={forecastMode === 'daily' ? 'w-fit' : ''}
			>
				{forecastMode === 'daily'
					? weatherData?.forecast.forecastday.map((day) => (
                        <SwiperSlide key={day.date} className="w-fit">
                            <ForecastItem
                                date={formatDate(day.date, units)}
                                condition={day.day.condition.icon}
                                temp={
                                    units === 'metric'
                                        ? day.day.avgtemp_c
                                        : day.day.avgtemp_f
                                }
                            />
                        </SwiperSlide>
                    ))
					: weatherData?.forecast.forecastday[0].hour.map((hour) => (
                        <SwiperSlide
                            key={hour.time_epoch}
                            className="w-fit"
                        >
                            <ForecastItem
                                date={formatDate(hour.time, units)}
                                condition={hour.condition.icon}
                                temp={
                                    units === 'metric'
                                        ? hour.temp_c
                                        : hour.temp_f
                                }
                            />
                        </SwiperSlide>
                    ))}
			</Swiper>
		</section>
	);
};
export default ForecastList;
