import type { SignInRequest } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignInSchema } from '@/features/auth';
import { Button } from '../ui/button';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';

export interface SigninFormProps {
  submit?: (data: SignInRequest) => void;
  loading?: boolean;
}

export function SigninForm({ submit, loading }: SigninFormProps) {
  const { t } = useTranslation(['auth', 'common']);
  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInRequest) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-">
          <AppFormField
            control={form.control}
            name="email"
            label={t('auth:login.email')}
            render={({ field }) => (
              <Input type="email" placeholder={t('auth:login.email')} {...field} />
            )}
          />
          <AppFormField
            control={form.control}
            name="password"
            label={t('auth:login.password')}
            render={({ field }) => (
              <Input type="password" placeholder={t('auth:login.password')} {...field} />
            )}
          />
        </div>
        <div className="flex justify-end flex-col gap-4 mt-4">
          <Button type="submit" className="w-full" loading={loading}>
              {t('auth:login.login')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
