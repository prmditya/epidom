import { RegisterForm } from "@/features/auth/register/components/register-form";
import { RegisterImage } from "@/features/auth/register/components/register-image";

export default function RegisterPage() {
  return (
    <div className="grid min-h-dvh grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-8">
        <RegisterForm />
      </div>
      <RegisterImage />
    </div>
  );
}
