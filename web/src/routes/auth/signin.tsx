import type { SignInRequest } from '@/features/auth';
import { useQueryClient } from '@tanstack/react-query';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { SigninForm } from '@/components/blocks/signin-form';
import { Card, CardContent } from '@/components/ui/card';
import { useSingIn } from '@/features/auth';

export const Route = createFileRoute('/auth/signin')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation(['auth', 'common']);
  const { mutate: signin, isPending } = useSingIn({
    onSuccess() {
      toast.success(t('auth:login.success'));
      queryClient.invalidateQueries({ queryKey: ['session'] });
      navigate({ to: '/app' });
    },
    onError(err) {
      console.error(err);
      toast.error(t('auth:login.error'));
    },
  });

  const onSignIn = (data: SignInRequest) => {
    signin(data);
  };

  return (
    <main className="h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 w-full md:w-2/3 xl:w-5/12">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">
                    {t('auth:login.title')}
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    {t('auth:login.description')}
                  </p>
                </div>
                <SigninForm submit={onSignIn} loading={isPending} />
                <div className="text-center text-sm">
                  {t('auth:login.no_account')}
                  {' '}
                  <Link
                    to="/auth/signup"
                    className="underline underline-offset-4"
                  >
                    {t('auth:sign_up.title')}
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-muted relative hidden md:block">
              <img
                src="https://ui.shadcn.com/placeholder.svg"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          {t('auth:login.terms_of_service')}
          {' '}
          <a href="#">{t('auth:login.terms_of_service_link')}</a>
          {' '}
          {t('auth:login.and')}
          {' '}
          <a href="#">{t('auth:login.privacy_policy_link')}</a>
          .
        </div>
      </div>
    </main>
  );
}
