import { useLocation } from "react-router-dom";
import AuthLogo from "@/components/global/AuthLogo";
import SignInForm from "@/components/form/SignInForm";

export default function SignIn() {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <div className="w-full max-w-sm text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="w-max mx-auto mb-3">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Admin Portal</h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your administrative credentials to continue
        </p>

        <SignInForm initialEmail={email} />
      </div>
    </div>
  );
}
