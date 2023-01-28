declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_IS_DEVELOPMENT: string;
      REACT_APP_OPEN_WEATHER_MAP_API_KEY: string;
      REACT_APP_WEATHER_BIT_API_KEY: string;
      REACT_APP_TODOIST_ACCESS_TOKEN: string;
      REACT_APP_CRYPTO_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
