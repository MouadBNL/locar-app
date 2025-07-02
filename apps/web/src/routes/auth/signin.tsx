import { SigninForm } from "@/components/blocks/signin-form";
import { Card, CardContent } from "@/components/ui/card";
import { authClient, type SigninData } from "@/lib/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SigninData) => {
      const res = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      navigate({ to: "/app" });
    },
    onError: () => {
      toast.error("Signin failed");
    },
  });
  const onSignIn = (data: SigninData) => {
    mutate(data);
  };

  return (
    <main className="h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-6 w-full md:w-2/3 xl:w-5/12">
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your Acme Inc account
                  </p>
                </div>
                <SigninForm submit={onSignIn} loading={isPending} />
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/auth/signup"
                    className="underline underline-offset-4"
                  >
                    Sign up
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
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </main>
  );
}
