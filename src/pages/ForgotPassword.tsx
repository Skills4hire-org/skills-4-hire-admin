import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import InputField from "../components/InputField";
import AuthLogo from "@/components/global/AuthLogo";
import { passwordResetRequest } from "@/api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await passwordResetRequest({ email });
      toast.success(response?.message || "Password reset instructions sent.");
      setEmailSent(true);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ||
          error?.message ||
          "Failed to send reset link.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-max mx-auto mb-1">
          <AuthLogo />
        </div>

        <h1 className="text-2xl font-bold">Forgot Password?</h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter your email and we’ll send you instructions to reset your
          password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6 text-left">
          <InputField
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {emailSent ? (
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-left text-sm text-green-800">
            <p className="font-semibold mb-2">Reset code sent!</p>
            <p className="mb-3">
              Check your email for the reset code. If the message does not
              contain a direct link, use the Reset Password screen below.
            </p>
            <Link
              to="/password/reset-confirm"
              className="inline-block rounded-md bg-primary px-4 py-2 text-white hover:opacity-90"
            >
              Go to Reset Password
            </Link>
          </div>
        ) : null}

        <p className="text-sm text-gray-600 mt-3">
          Remember your password?{" "}
          <Link
            to="/sign-in"
            className="text-primary font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
