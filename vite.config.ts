import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      open: true,
    },
    plugins: [react(), tsconfigPaths()],
    define: {
      __APP_ENV__: env.APP_ENV,
      APP_VERSION: JSON.stringify(process.env.npm_package_version),
      IS_DEVELOPMENT: JSON.stringify(env.IS_DEVELOPMENT),
      OPEN_WEATHER_MAP_API_KEY: JSON.stringify(env.OPEN_WEATHER_MAP_API_KEY),
      WEATHER_BIT_API_KEY: JSON.stringify(env.WEATHER_BIT_API_KEY),
      TODOIST_ACCESS_TOKEN: JSON.stringify(env.TODOIST_ACCESS_TOKEN),
      CRYPTO_API_KEY: JSON.stringify(env.CRYPTO_API_KEY),
      NEWS_API_KEY: JSON.stringify(env.NEWS_API_KEY),
    },
  };
});
