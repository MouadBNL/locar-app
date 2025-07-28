import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/about')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation(['common']);
  return <div className="p-2">{t('common:about')}</div>;
}
