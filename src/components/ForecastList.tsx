import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import ForecastItem from './ForecastItem';
import { useAppSelector } from '@/hooks/useAppSelectro';
import { formatDateTime } from '@/utils';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/scrollbar';

const ForecastList = () => {
	const { forecastMode, unitsType } = useAppSelector(
		(state) => state.settings
	);
	const forecast = useAppSelector((state) => state.weather.forecast);

	const swiper = useRef<SwiperRef>(null);
    const currentTimeSlideIndex =
    forecast.forecastday[0].hour.findIndex(
        (hour) => formatDateTime(hour.time) === 'Now'
    ) - 1 || 0;
	return (
		<Swiper
			modules={[Scrollbar]}
			scrollbar={{
				hide: true,
			}}
            spaceBetween={12}
			slidesPerView={'auto'}
			grabCursor={true}

			ref={swiper}
			onSlidesGridLengthChange={() => {
				swiper.current?.swiper.slideTo(currentTimeSlideIndex, 0);
			}}
            onInit={() => {
				swiper.current?.swiper.slideTo(currentTimeSlideIndex, 0);
			}}
			className={`max-w-full ${forecastMode === 'daily' ? 'w-fit' : ''}`}
		>
			{forecastMode === 'hourly'
				? forecast.forecastday[0].hour.map((hour) => (
                    <SwiperSlide key={hour.time} className="select-none w-fit pt-2 pb-4">
                        <ForecastItem
                            time={formatDateTime(hour.time, unitsType)}
                            conditionImg={hour.condition.icon}
                            conditionText={hour.condition.text}
                            temp={
                                unitsType === 'metric'
                                    ? hour.temp_c
                                    : hour.temp_f
                            }
                        />
                    </SwiperSlide>
                ))
				: forecast.forecastday.map((day) => (
                    <SwiperSlide key={day.date} className="w-fit pt-2 pb-4">
                        <ForecastItem
                            time={formatDateTime(day.date, unitsType)}
                            conditionImg={day.day.condition.icon}
                            conditionText={day.day.condition.text}
                            temp={
                                unitsType === 'metric'
                                    ? day.day.avgtemp_c
                                    : day.day.avgtemp_f
                            }
                        />
                    </SwiperSlide>
                ))}
		</Swiper>
	);
};
export default ForecastList;
