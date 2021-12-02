import { useState, useEffect } from 'react';
import {
    LATITUDE,
    LONGITUDE,
    WEATHER_REFRESH_RATE,
    WEEKDAYS,
} from 'util/constants';
import {
    formatDisplayTime,
    formatDisplayTemp,
    getWindString,
} from 'util/index';

interface Weather {
    description: string;
    icon: string;
    main: string;
}
interface RawForcast {
    dt: number;
    temp: {
        min: number;
        max: number;
    };
    weather: Weather[];
}
interface WeatherResponse {
    current: {
        temp: number;
        feels_like: number;
        humidity: number;
        sunrise: number;
        sunset: number;
        wind_speed: number;
        wind_deg: number;
        weather: Weather[];
    };
    daily: RawForcast[];
}

interface Forcast {
    iconLink: string;
    description: string;
    high: string;
    low: string;
    weekday: string;
    date: number;
}

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';

const generateOpenWeatherEndpoint = (base: string, params?: string) =>
    base +
    `?lon=${LONGITUDE}&lat=${LATITUDE}&units=imperial&exclude=hourly,minutely&appid=${OPEN_WEATHER_API_KEY}${
        params ? '&' + params : ''
    }`;

const generateIconLink = (icon?: string, multiplier?: number) =>
    icon
        ? `http://openweathermap.org/img/wn/${icon}${
              multiplier ? `@${multiplier}x` : ''
          }.png`
        : '';

const getAPIData = (endpoint: string) =>
    fetch(endpoint)
        .then((res) => res.json())
        .then((data) => data);

const getWeather = (weather: WeatherResponse) => {
    const currentTemperature = formatDisplayTemp(weather.current.temp);
    const feelsLikeTemperature = formatDisplayTemp(weather.current.feels_like);
    const humidy = weather.current.humidity;
    const sunrise = formatDisplayTime(weather.current.sunrise);
    const sunset = formatDisplayTime(weather.current.sunset);
    const overallWeather = weather.current.weather[0];
    const description = overallWeather.description;
    const iconLink = generateIconLink(overallWeather.icon, 4);
    const wind = getWindString(
        weather.current.wind_speed,
        weather.current.wind_deg
    );
    return {
        currentTemperature,
        feelsLikeTemperature,
        sunrise,
        sunset,
        description,
        iconLink,
        humidy,
        wind,
    };
};

const getForcast = (dailyForcast: RawForcast[]): Forcast[] => {
    return dailyForcast.slice(0, -2).map((dayForcast) => {
        const overallWeather = dayForcast.weather[0];
        const description = overallWeather.description;
        const iconLink = generateIconLink(overallWeather.icon, 2);
        const high = formatDisplayTemp(dayForcast.temp.max);
        const low = formatDisplayTemp(dayForcast.temp.min);
        const date = dayForcast.dt * 1000;
        const weekday = WEEKDAYS[new Date(date).getDay()];
        return { iconLink, description, high, low, weekday, date };
    });
};

interface WeatherResponse {
    currentTemperature: string;
    feelsLikeTemperature: string;
    sunrise: string;
    sunset: string;
    description: string;
    iconLink: string;
    humidy: number;
    forcast: Forcast[];
    todaysHigh: string;
    todaysLow: string;
    wind: string;
}

export const useWeather = (): Partial<WeatherResponse> => {
    const [rawWeather, setRawWeather] = useState<WeatherResponse>();

    const updateWeather = () => {
        getAPIData(generateOpenWeatherEndpoint(WEATHER_ENDPOINT)).then(
            (res: WeatherResponse) => {
                setRawWeather(res);
            }
        );
    };

    useEffect(() => {
        updateWeather();
        setInterval(() => {
            updateWeather();
        }, WEATHER_REFRESH_RATE);
    }, []);
    if (!rawWeather) return {};
    const weather = getWeather(rawWeather);
    const forcast = getForcast(rawWeather.daily);
    const { high: todaysHigh, low: todaysLow } = forcast[0];
    return {
        ...weather,
        todaysHigh,
        todaysLow,
        forcast: forcast.slice(1),
    };
};
