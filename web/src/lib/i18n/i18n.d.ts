/* eslint-disable ts/consistent-type-imports */
import common from './locales/en/common.json';
import vehicle from './locales/en/vehicle.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    ns: ['common', 'vehicle'];
    resources: {
      common: typeof common;
      vehicle: typeof vehicle;
    };
  }
}
