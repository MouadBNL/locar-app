import { SignupForm } from "@/components/blocks/signup-form";
import { Card, CardContent } from "@/components/ui/card";
import { useSignUp, type SignUpRequest } from "@/repositories/auth";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/auth/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignUp({
    onSuccess: () => {
      toast.success("Signup successful");
      navigate({ to: "/app" });
    },
    onError: () => {
      toast.error("Signup failed");
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
