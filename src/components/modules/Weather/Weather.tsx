import { useWeather } from 'hooks/useWeather';

export const Weather = () => {
    const {
        currentTemperature,
        feelsLikeTemperature,
        sunrise,
        sunset,
        description,
        iconLink,
    } = useWeather();
    return (
        <div>
            <div>Current Temp: {currentTemperature}</div>
            <div>Feels like Temp: {feelsLikeTemperature}</div>
            <div>Sunrise: {sunrise}</div>
            <div>Sunset: {sunset}</div>
            <div>Description: {description}</div>
            <img src={iconLink} alt='' />
        </div>
    );
};
