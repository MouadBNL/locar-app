import { AppFormField, Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { SignUpSchema, type SignUpRequest } from "@/features/auth";

export type SignupFormProps = {
  submit?: (data: SignUpRequest) => void;
  loading?: boolean;
};

export function SignupForm({ submit, loading }: SignupFormProps) {
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpRequest) => {
    submit?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-">
          <AppFormField
            control={form.control}
            name="name"
            label="Name"
            render={({ field }) => (
              <Input type="text" placeholder="Name" {...field} />
            )}
          />
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
            Sign up
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link className="underline" to="/auth/signin">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
