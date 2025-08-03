/* eslint-disable ts/consistent-type-imports */
import auth from './locales/en/auth.json';
import calendar from './locales/en/calendar.json';
import common from './locales/en/common.json';
import customer from './locales/en/customer.json';
import document from './locales/en/document.json';
import exceptions from './locales/en/exceptions.json';
import expenses from './locales/en/expenses.json';
import payment from './locales/en/payment.json';
import rental from './locales/en/rental.json';
import repair from './locales/en/repair.json';
import reservation from './locales/en/reservation.json';
import vehicle from './locales/en/vehicle.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    ns: ['common', 'vehicle', 'customer', 'exceptions', 'rental', 'payment', 'document', 'auth', 'repair', 'expenses', 'calendar'];
    resources: {
      common: typeof common;
      vehicle: typeof vehicle;
      customer: typeof customer;
      reservation: typeof reservation;
      exceptions: typeof exceptions;
      rental: typeof rental;
      payment: typeof payment;
      document: typeof document;
      auth: typeof auth;
      repair: typeof repair;
      expenses: typeof expenses;
      calendar: typeof calendar;
    };
  }
}
