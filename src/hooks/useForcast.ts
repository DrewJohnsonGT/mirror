import { useState, useEffect } from 'react';
import { LOCATION_ZIP, FORCAST_REFRESH_RATE, WEEKDAYS } from 'util/constants';
import { formatDisplayTemp } from 'util/index';

interface DayForcast {
    valid_date: number;
    high_temp: number;
    low_temp: number;
    weather: {
        description: string;
        icon: string;
        main: string;
    };
}
interface Forcast {
    data: DayForcast[];
}

const WEATHER_BIT_API_KEY = process.env.REACT_APP_WEATHER_BIT_API_KEY;
const FORCAST_ENDPOINT = 'http://api.weatherbit.io/v2.0/forecast/daily';

const generateWeatherBitEndpoint = (base: string, params?: string) =>
    base +
    `?postal_code=${LOCATION_ZIP}&units=i&days=6&key=${WEATHER_BIT_API_KEY}${
        params ? '&' + params : ''
    }`;

const generateIconLink = (icon?: string) =>
    icon ? `https://www.weatherbit.io/static/img/icons/${icon}.png` : '';

const getAPIData = (endpoint: string) =>
    fetch(endpoint)
        .then((res) => res.json())
        .then((data) => data);

const getForcastData = (dayForcast: DayForcast) => {
    const overallWeather = dayForcast.weather;
    const description = overallWeather.description;
    const iconLink = generateIconLink(overallWeather.icon);
    const high = formatDisplayTemp(dayForcast.high_temp);
    const low = formatDisplayTemp(dayForcast.low_temp);
    const date = dayForcast.valid_date;
    const weekday = WEEKDAYS[new Date(date).getDay()];
    return { iconLink, description, high, low, weekday, date };
};

const getDataFromForcast = (forcast?: Forcast) => {
    return forcast
        ? forcast.data
              .slice(1)
              .map((forcastedWeather) => getForcastData(forcastedWeather))
        : [];
};

export const useForcast = () => {
    const [rawForcast, setRawForcast] = useState<Forcast>();
    const updateForcast = () => {
        getAPIData(generateWeatherBitEndpoint(FORCAST_ENDPOINT)).then(
            (res: Forcast) => {
                setRawForcast(res);
            }
        );
    };
    useEffect(() => {
        updateForcast();
        setInterval(() => {
            updateForcast();
        }, FORCAST_REFRESH_RATE);
    }, []);
    const forcast = getDataFromForcast(rawForcast);
    return {
        forcast,
    };
};
