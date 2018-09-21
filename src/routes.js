// If lots of routes then split into files in a
// directory called 'routes'
import { top, about } from './controllers/allControllers';

export default [
  { controller: about, regex: /about/ },

  { controller: top, regex: /top\/(.*)/ },
  { controller: top, regex: /.*/, isDefault: true },
];
