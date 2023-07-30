import { useAppSelector } from "@/hooks/useAppSelectro";

const CurrentWeather = () => {
    const {location, current, forecast} = useAppSelector(state => state.weather) 
    const {unitsType} = useAppSelector(state => state.settings) 
    
    const currentTemp = unitsType === 'metric' ? current.temp_c : current.temp_f
    const minTemp = unitsType === 'metric' ? forecast.forecastday[0].day.mintemp_c : forecast.forecastday[0].day.mintemp_f
    const maxTemp = unitsType === 'metric' ? forecast.forecastday[0].day.maxtemp_c : forecast.forecastday[0].day.maxtemp_f

    return (
        <div className="flex flex-col gap-3 items-center justify-center">
            <h1 className="text-3xl">{location.name}</h1>
            <p className="text-6xl font-thin">{currentTemp}&deg;</p>
            <div className="flex flex-col text-lg uppercase font-semibold items-center">
                <p className="text-2xl capitalize font-semibold opacity-80 text-gray-300">{current.condition.text}</p>
                <p className="">max: {maxTemp}&deg;</p>
                <p className="">min: {minTemp}&deg;</p>
            </div>
        </div>
    );
};
export default CurrentWeather;