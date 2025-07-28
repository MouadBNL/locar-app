import type { SignUpRequest } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SignUpSchema } from '@/features/auth';
import { Button } from '../ui/button';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';

export interface SignupFormProps {
  submit?: (data: SignUpRequest) => void;
  loading?: boolean;
}

export function SignupForm({ submit, loading }: SignupFormProps) {
  const { t } = useTranslation(['auth', 'common']);
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignUpRequest) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-4">
          <AppFormField
            control={form.control}
            name="name"
            label={t('auth:sign_up.name')}
            render={({ field }) => (
              <Input type="text" placeholder={t('auth:sign_up.name')} {...field} />
            )}
          />
          <AppFormField
            control={form.control}
            name="email"
            label={t('auth:sign_up.email')}
            render={({ field }) => (
              <Input type="email" placeholder={t('auth:sign_up.email')} {...field} />
            )}
          />
          <AppFormField
            control={form.control}
            name="password"
            label={t('auth:sign_up.password')}
            render={({ field }) => (
              <Input type="password" placeholder={t('auth:sign_up.password')} {...field} />
            )}
          />
        </div>
        <div className="flex justify-end flex-col gap-4 mt-4">
          <Button type="submit" className="w-full" loading={loading}>
            {t('auth:sign_up.sign_up')}
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            {t('auth:sign_up.already_have_account')}
            {' '}
            <Link className="underline" to="/auth/signin">
              {t('auth:login.login')}
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
