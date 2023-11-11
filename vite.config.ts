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
    },
  };
});
