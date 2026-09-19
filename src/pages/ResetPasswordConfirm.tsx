import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { passwordResetConfirm } from "@/api/auth";
import InputField from "@/components/InputField";
import AuthLogo from "@/components/global/AuthLogo";

export default function ResetPasswordConfirm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    if (name === "code") {
      value = value.replace(/\D/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.code || !formData.password || !formData.confirm_password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.code.length < 4) {
      toast.error("Enter the full numeric reset code.");
      return;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await passwordResetConfirm(formData);
      toast.success(response?.message || "Password reset successfully.");
      navigate("/sign-in");
    } catch (error: any) {
      console.error(
        "Password reset confirm error:",
        error?.response?.data || error?.message || error,
      );
      toast.error(
        error?.response?.data?.detail || error?.message || "Reset failed.",
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

        <h1 className="text-2xl font-bold">Reset Password</h1>

        <p className="text-sm text-gray-500 mb-6">
          Enter the reset code sent to your email and choose a new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-6 text-left">
          <InputField
            name="code"
            type="tel"
            placeholder="Reset Code"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            inputMode="numeric"
            maxLength={6}
          />
          <InputField
            name="password"
            type="password"
            placeholder="New Password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <InputField
            name="confirm_password"
            type="password"
            placeholder="Confirm New Password"
            value={formData.confirm_password}
            onChange={(e) => handleChange("confirm_password", e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
