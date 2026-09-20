import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/ui/Button";
import { forgotPasswordRequest } from "../services/auth/authService";
import { getForgotPasswordErrors, hasErrors } from "../utils/auth/validateAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getForgotPasswordErrors({ email });
    setErrors(nextErrors);
    setFormError("");
    setSuccessMessage("");

    if (hasErrors(nextErrors)) return;

    setIsSubmitting(true);
    try {
      await forgotPasswordRequest({ email });
      setSuccessMessage("If an account exists for this email, a reset link is on its way.");
    } catch (error) {
      setFormError(error.message || "Unable to send a reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-[28px] font-semibold text-[#1F2925]">Let's get you back in</h1>
      <p className="mt-2 text-sm leading-6 text-[#66736D]">
        Enter your email and we'll help you recover your account.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <AuthInput
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
          required
          error={errors.email}
        />

        {formError ? (
          <p className="text-sm text-[#B64A4A]" role="alert">
            {formError}
          </p>
        ) : null}

        {successMessage ? (
          <p className="text-sm text-[#2F7D5A]" role="status">
            {successMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full justify-center rounded-[12px] text-[15px]"
        >
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-[#66736D]">
        <Link
          to="/login"
          className="font-medium text-[#0B4F3A] hover:text-[#083D2D] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F3A]"
        >
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default ForgotPassword;
