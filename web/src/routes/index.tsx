import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();
  return (
    <div className="p-2">
      <h3>{t('welcome_message')}</h3>

      <Button
        variant="destructive"
        type="button"
        onClick={() => { throw new Error('This is your first error!'); }}
      >
        {t('break')}
      </Button>
    </div>
  );
}
