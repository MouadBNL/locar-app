import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <p>{t('welcome_message')}</p>
    </div>
  );
}
