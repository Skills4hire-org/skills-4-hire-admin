import { Link, useNavigate } from "react-router-dom";
import AuthLogo from "@/components/global/AuthLogo";
import SignUpForm from "@/components/form/SignUpForm";
import { FaFacebookF } from "react-icons/fa";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUpSuccess = (email: string) => {
    //Persist email for verification recovery
    localStorage.setItem("pendingVerificationEmail", email);

    navigate("/verification", {
      state: { email },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 py-10">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-3">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Sign up</h1>

        <p className="text-sm text-gray-500 mb-6">
          Connect with skilled professional. Get hired on Skills4hire
        </p>

        <SignUpForm onSuccess={handleSignUpSuccess} />

        <p className="text-sm text-gray-600 mt-3">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>

        <div className="flex items-center my-6">
          <div className="grow border-t-2 border-gray-300"></div>
          <span className="px-3 text-sm text-gray-400">or</span>
          <div className="grow border-t-2 border-gray-300"></div>
        </div>

        <div className="flex justify-center gap-6">
          <button className="w-8 h-8 rounded-full bg-[#1877F2] grid place-items-center">
            <FaFacebookF className="w-4 h-4 text-white" />
          </button>

          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            className="w-8 h-8"
          />
          <img
            src="https://img.icons8.com/ios-filled/50/mac-os.png"
            className="w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
}
