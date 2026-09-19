import { Link, useLocation } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import AuthLogo from "@/components/global/AuthLogo";
import SignInForm from "@/components/form/SignInForm";

export default function SignIn() {
  const location = useLocation();
  const email = (location.state as { email?: string })?.email;

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm text-center pt-6 md:pt-10">
        <div className="w-max mx-auto mb-2">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Sign in</h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email and password you created during registration
        </p>

        <SignInForm initialEmail={email} />

        <p className="text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>

        <p className="text-xs text-gray-600 mt-3 leading-snug">
          By clicking the{" "}
          <span className="font-medium text-black">Sign in</span> button you
          accept the{" "}
          <Link
            to="/privacy-policy"
            className="text-primary font-medium hover:underline"
          >
            Terms of the Privacy Policy
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="grow border-t-2 border-gray-300" />
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="grow border-t-2 border-gray-300" />
        </div>

        <div className="flex justify-center gap-6">
          <button
            aria-label="Continue with Facebook"
            className="w-8 h-8 rounded-full bg-[#1877F2] grid place-items-center"
          >
            <FaFacebookF className="w-4 h-4" color="#FFFFFF" />
          </button>

          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="Google"
            className="w-8 h-8"
          />
          <img
            src="https://img.icons8.com/ios-filled/50/mac-os.png"
            alt="Apple"
            className="w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
}
