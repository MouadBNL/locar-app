import type { SignInRequest } from '@/features/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignInSchema } from '@/features/auth';
import { Button } from '../ui/button';
import { AppFormField, Form } from '../ui/form';
import { Input } from '../ui/input';

export interface SigninFormProps {
  submit?: (data: SignInRequest) => void;
  loading?: boolean;
}

export function SigninForm({ submit, loading }: SigninFormProps) {
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
            label="Email"
            render={({ field }) => (
              <Input type="email" placeholder="Email" {...field} />
            )}
          />
          <AppFormField
            control={form.control}
            name="password"
            label="Password"
            render={({ field }) => (
              <Input type="password" placeholder="Password" {...field} />
            )}
          />
        </div>
        <div className="flex justify-end flex-col gap-4 mt-4">
          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>
        </div>
      </form>
    </Form>
  );
}
