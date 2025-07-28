import type Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    returnNull: false;
    returnObjects: false;
    nsSeparator: ':';
    keySeparator: '.';
    compatibilityJSON: 'v4';
    allowObjectInHTMLChildren: false;
    resources: Resources;
  }
}
