import { useState, useEffect } from 'react';
import { LOCATION_ZIP, WEATHER_REFRESH_RATE } from 'util/constants';
import { formatDisplayTime, formatDisplayTemp } from 'util/index';

interface Weather {
    main: {
        temp: number;
        feels_like: number;
        humidity: number;
    };
    sys: {
        sunrise: number;
        sunset: number;
    };
    weather: {
        description: string;
        icon: string;
        main: string;
    }[];
}

const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';

const generateOpenWeatherEndpoint = (base: string, params?: string) =>
    base +
    `?zip=${LOCATION_ZIP}&units=imperial&appid=${OPEN_WEATHER_API_KEY}${
        params ? '&' + params : ''
    }`;

const generateIconLink = (icon?: string) =>
    icon ? `http://openweathermap.org/img/wn/${icon}@4x.png` : '';

const getAPIData = (endpoint: string) =>
    fetch(endpoint)
        .then((res) => res.json())
        .then((data) => data);

const getDataFromWeather = (weather?: Weather) => {
    if (!weather) return {};
    const currentTemperature = formatDisplayTemp(weather.main.temp);
    const feelsLikeTemperature = formatDisplayTemp(weather.main.feels_like);
    const humidy = weather.main.humidity;
    const sunrise = formatDisplayTime(weather.sys.sunrise);
    const sunset = formatDisplayTime(weather.sys.sunset);
    const overallWeather = weather.weather[0];
    const description = overallWeather.description;
    const iconLink = generateIconLink(overallWeather.icon);
    return {
        currentTemperature,
        feelsLikeTemperature,
        sunrise,
        sunset,
        description,
        iconLink,
        humidy,
    };
};

export const useWeather = () => {
    const [rawWeather, setRawWeather] = useState<Weather>();

    const updateWeather = () => {
        getAPIData(generateOpenWeatherEndpoint(WEATHER_ENDPOINT)).then(
            (res: Weather) => {
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

    const weather = getDataFromWeather(rawWeather);
    return {
        ...weather,
    };
};
