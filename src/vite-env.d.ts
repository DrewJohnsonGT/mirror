/// <reference types="vite/client" />

declare const APP_VERSION: string;

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
