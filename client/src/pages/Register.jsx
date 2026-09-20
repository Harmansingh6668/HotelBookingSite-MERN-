import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLogin from "../components/auth/SocialLogin";
import Button from "../components/ui/Button";
import { registerRequest, startGoogleAuth } from "../services/auth/authService";
import { getRegisterErrors, hasErrors } from "../utils/auth/validateAuth";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getRegisterErrors(form);
    setErrors(nextErrors);
    setFormError("");

    if (hasErrors(nextErrors)) return;

    setIsSubmitting(true);
    try {
      await registerRequest(form);
      navigate("/verify-otp", { state: { email: form.email.trim() } });
    } catch (error) {
      setFormError(error.message || "Unable to create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-[26px] font-semibold text-[#1F2925] sm:text-[28px]">Begin your journey</h1>
      <p className="mt-2 text-sm leading-6 text-[#66736D]">
        Create an account to save stays and manage your bookings.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <AuthInput
            name="firstName"
            label="First name"
            value={form.firstName}
            onChange={updateField}
            placeholder="Enter first name"
            autoComplete="given-name"
            required
            error={errors.firstName}
          />
          <AuthInput
            name="lastName"
            label="Last name"
            value={form.lastName}
            onChange={updateField}
            placeholder="Enter last name"
            autoComplete="family-name"
            required
            error={errors.lastName}
          />
        </div>

        <AuthInput
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={updateField}
          placeholder="Enter your email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <PasswordInput
          name="password"
          label="Password"
          value={form.password}
          onChange={updateField}
          placeholder="Create a password"
          autoComplete="new-password"
          required
          error={errors.password}
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm password"
          value={form.confirmPassword}
          onChange={updateField}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          required
          error={errors.confirmPassword}
        />

        <div>
          <label className="flex items-start gap-3 text-sm leading-5 text-[#66736D]">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={form.acceptedTerms}
              onChange={updateField}
              className="mt-0.5 h-4 w-4 rounded border-[#DDE5DF] text-[#0B4F3A] focus:ring-[#0B4F3A]"
            />
            <span>
              I agree to the Terms and Privacy Policy
            </span>
          </label>
          {errors.acceptedTerms ? (
            <p className="mt-1 text-xs text-[#B64A4A]" role="alert">
              {errors.acceptedTerms}
            </p>
          ) : null}
        </div>

        {formError ? (
          <p className="text-sm text-[#B64A4A]" role="alert">
            {formError}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full justify-center rounded-[12px] text-[15px]"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <SocialLogin onGoogle={startGoogleAuth} disabled={isSubmitting} />

      <p className="mt-6 text-center text-sm text-[#66736D]">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-[#0B4F3A] hover:text-[#083D2D] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F3A]"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
