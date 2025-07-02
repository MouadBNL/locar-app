import { SignupForm } from "@/components/blocks/signup-form";
import { Card, CardContent } from "@/components/ui/card";
import { authClient, type SignupData } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: SignupData) => {
      const res = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (res.error) {
        throw new Error(res.error.message);
      }

      return res.data;
    },
    onSuccess: () => {
      toast.success("Signup successful");
      navigate({ to: "/app" });
    },
    onError: () => {
      toast.error("Signup failed");
    },
  });

  const onSignUp = (data: SignupData) => {
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
