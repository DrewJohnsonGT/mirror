import { useState, useEffect } from 'react';

interface Weather {
    main: {
        temp: number;
        feels_like: number;
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

interface Forcast {}

const REFRESH_RATE = 1000 * 60 * 60;
const LOCATION_ZIP = '45701';
const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const FORCAST_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';
const API_KEY = 'a958de54fdc1d3069e674112c0f7e69d';

const formatDisplayTemp = (temp?: number) =>
    temp !== undefined ? Math.round(temp).toString() : '';

const formatDisplayTime = (timestamp?: number) =>
    timestamp !== undefined
        ? new Date(timestamp * 1000).toLocaleTimeString([], {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
          })
        : '';

const generateEndpoint = (base: string, params?: string) =>
    base +
    `?zip=${LOCATION_ZIP}&units=imperial&appid=${API_KEY}${
        params ? '&' + params : ''
    }`;

const generateIconLink = (icon?: string) =>
    icon ? `http://openweathermap.org/img/wn/${icon}@4x.png` : '';

const getAPIData = (endpoint: string) =>
    fetch(endpoint)
        .then((res) => res.json())
        .then((data) => data);

const getDataFromWeather = (weather?: Weather) => {
    const currentTemperature = formatDisplayTemp(weather?.main?.temp);
    const feelsLikeTemperature = formatDisplayTemp(weather?.main?.feels_like);
    const sunrise = formatDisplayTime(weather?.sys?.sunrise);
    const sunset = formatDisplayTime(weather?.sys?.sunset);
    const overallWeather = weather?.weather[0];
    const description = overallWeather?.description;
    const iconLink = generateIconLink(overallWeather?.icon);
    return {
        currentTemperature,
        feelsLikeTemperature,
        sunrise,
        sunset,
        description,
        iconLink,
    };
};
export const useWeather = () => {
    const [weather, setWeather] = useState<Weather>();
    const [forcast, setForcast] = useState<Forcast>();

    const updateWeather = () => {
        getAPIData(generateEndpoint(WEATHER_ENDPOINT)).then((res: Weather) => {
            setWeather(res);
        });
    };
    const updateForcast = () => {
        getAPIData(generateEndpoint(FORCAST_ENDPOINT, 'cnt=7')).then(
            (res: Forcast) => {
                setForcast(res);
            }
        );
    };
    useEffect(() => {
        updateWeather();
        updateForcast();
        setInterval(() => {
            updateWeather();
            updateForcast();
        }, REFRESH_RATE);
    }, []);
    console.log(weather);
    console.log(forcast);
    const weatherData = getDataFromWeather(weather);

    return {
        ...weatherData,
    };
};
