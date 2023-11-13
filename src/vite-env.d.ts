/// <reference types="vite/client" />

declare const APP_VERSION: string;
declare const IS_DEVELOPMENT: string;
declare const OPEN_WEATHER_MAP_API_KEY: string;
declare const WEATHER_BIT_API_KEY: string;
declare const TODOIST_ACCESS_TOKEN: string;
declare const CRYPTO_API_KEY: string;
declare const NEWS_API_KEY: string;

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
