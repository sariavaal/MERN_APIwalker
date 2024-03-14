// tailwind.config.js
export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
  './public/index.html',
  'node_modules/flowbite-react/lib/esm/**/*.js'
  // Otras rutas de archivos
];
export const theme = {
  extend: {},
};
export const plugins = [
  require('flowbite/plugin')

];
