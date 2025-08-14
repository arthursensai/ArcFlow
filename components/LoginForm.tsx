import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import GithubLoginButton from "@/components/GithubLogin";
import GoogleLoginButton from "@/components/GoogleLogin";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-glass-dark text-amber-50">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription className="text-white">
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            <GithubLoginButton />
            <GoogleLoginButton />
          </div>
        </CardContent>
      </Card>
      <div className="bg-glass-dark text-white p-2 text-center text-xs text-balance rounded-3xl *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="/privacy">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
};

export default LoginForm;
