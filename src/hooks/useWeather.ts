import { useEffect, useState } from 'react';
import {
  LATITUDE,
  LONGITUDE,
  WEATHER_REFRESH_RATE,
  WEEKDAYS,
} from 'util/constants';
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
  precip: number;
}

const WEATHER_ENDPOINT = 'https://api.openweathermap.org/data/2.5/onecall';
const INCHES_IN_MM = 0.0393701;

const generateOpenWeatherEndpoint = (base: string, params?: string) =>
  base +
  `?lon=${LONGITUDE}&lat=${LATITUDE}&units=imperial&exclude=hourly,minutely&appid=${OPEN_WEATHER_MAP_API_KEY}${
    params ? '&' + params : ''
  }`;

const generateIconLink = (icon?: string, multiplier?: number) =>
  icon
    ? `http://openweathermap.org/img/wn/${icon}${
        multiplier ? `@${multiplier}x` : ''
      }.png`
    : '';

const getAPIData = async (endpoint: string) =>
  await fetch(endpoint)
    .then(async (res) => await res.json())
    .then((data) => data);

const getWeather = (weather: WeatherResponse) => {
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
    getAPIData(generateOpenWeatherEndpoint(WEATHER_ENDPOINT))
      .then((res: WeatherResponse) => {
        setRawWeather(res);
      })
      .catch((e) => {
        console.log('ERROR FETCHING WEATHER');
        console.error(e);
      });
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
    forcast: forcast.slice(1),
    todaysHigh,
    todaysLow,
  };
};
