import { useEffect, useState } from 'react';
import { WEATHER_REFRESH_RATE, WEEKDAYS } from 'util/constants';
import {
  formatDisplayTemp,
  formatDisplayTime,
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
  snow?: number;
  rain?: number;
}
interface RawWeatherResponse {
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
  precip: number;
}

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

const INCHES_IN_MM = 0.0393701;

const generateIconLink = (icon?: string, multiplier?: number) =>
  icon
    ? `http://openweathermap.org/img/wn/${icon}${
        multiplier ? `@${multiplier}x` : ''
      }.png`
    : '';

const getAPIData = async () =>
  await fetch('/api/weather')
    .then(async (res) => await res.json())
    .then((data) => data);

const getWeather = (weather: RawWeatherResponse) => {
  if (!weather) return {};
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
    weather.current.wind_deg,
  );
  return {
    currentTemperature,
    description,
    feelsLikeTemperature,
    humidy,
    iconLink,
    sunrise,
    sunset,
    wind,
  };
};

const getForcast = (dailyForcast: RawForcast[]): Forcast[] => {
  return dailyForcast.slice(0, -2).map((dayForcast) => {
    const overallWeather = dayForcast.weather[0];
    const description = overallWeather.description;
    const iconLink = generateIconLink(overallWeather.icon, 4);
    const high = formatDisplayTemp(dayForcast.temp.max);
    const low = formatDisplayTemp(dayForcast.temp.min);
    const date = dayForcast.dt * 1000;
    const weekday = WEEKDAYS[new Date(date).getDay()];
    const snow = dayForcast.snow ? dayForcast.snow : 0;
    const rain = dayForcast.rain ? dayForcast.rain : 0;
    const precip =
      Math.round(((snow + rain) * INCHES_IN_MM + Number.EPSILON) * 100) / 100;
    return { date, description, high, iconLink, low, precip, weekday };
  });
};

export const useWeather = (): Partial<WeatherResponse> => {
  const [rawWeather, setRawWeather] = useState<RawWeatherResponse>();
  const updateWeather = () => {
    getAPIData()
      .then((res: RawWeatherResponse) => {
        setRawWeather(res);
      })
      .catch((e) => {
        console.log('ERROR FETCHING WEATHER');
        console.error(e);
      });
  };

  useEffect(() => {
    updateWeather();
    const weatherInterval = setInterval(() => {
      updateWeather();
    }, WEATHER_REFRESH_RATE);

    return () => {
      clearInterval(weatherInterval);
    };
  }, []);
  if (!rawWeather) return {};
  const weather = getWeather(rawWeather);
  const forcast = getForcast(rawWeather.daily);
  const { high: todaysHigh, low: todaysLow } = forcast[0];
  return {
    ...weather,
    forcast: forcast.slice(1),
    todaysHigh,
    todaysLow,
  };
};
