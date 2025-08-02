import type i18n from './i18n';

type Params = Parameters<typeof i18n.t>;
export function breadcrumb(...args: Params) {
  return {
    title: args[0],
  };
}
