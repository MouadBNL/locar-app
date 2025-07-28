import type { SignUpRequest } from '@/features/auth';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { SignupForm } from '@/components/blocks/signup-form';
import { Card, CardContent } from '@/components/ui/card';
import { useSignUp } from '@/features/auth';

export const Route = createFileRoute('/auth/signup')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { t } = useTranslation(['auth', 'common']);
  const { mutate, isPending } = useSignUp({
    onSuccess: () => {
      toast.success(t('auth:sign_up.success'));
      navigate({ to: '/app' });
    },
    onError: () => {
      toast.error(t('auth:sign_up.error'));
    },
  });

  const onSignUp = (data: SignUpRequest) => {
    mutate(data);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <Card className="w-full md:w-1/2 lg:w-1/3">
        <CardContent>
          <SignupForm submit={onSignUp} loading={isPending} />
        </CardContent>
      </Card>
    </div>
  );
}
