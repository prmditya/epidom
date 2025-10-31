import { LoginForm } from "@/features/auth/login/components/login-form";
import { LoginImage } from "@/features/auth/login/components/login-image";

export default function LoginPage() {
  return (
    <div className="grid h-svh grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-8">
        <LoginForm />
      </div>
      <LoginImage />
    </div>
  );
}
