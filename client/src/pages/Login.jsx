import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthInput from "../components/auth/AuthInput";
import AuthLayout from "../components/auth/AuthLayout";
import PasswordInput from "../components/auth/PasswordInput";
// import SocialLogin from "../components/auth/SocialLogin";
import Button from "../components/ui/Button";
import { loginRequest } from "../services/auth/authService";
import { getLoginErrors, hasErrors } from "../utils/auth/validateAuth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const registeredMessage = location.state?.registered
    ? "Welcome to Aau Ji! Your account was created. Please sign in."
    : "";

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getLoginErrors(form);
    setErrors(nextErrors);
    setFormError("");

    if (hasErrors(nextErrors)) return;

    setIsSubmitting(true);
    try {
      const session = await loginRequest(form);
      const from = location.state?.from;
      const redirectTo = from
        ? `${from.pathname}${from.search || ""}${from.hash || ""}`
        : "/";
      const userName =
        session.user?.name ||
        session.user?.firstName ||
        form.email.trim();
      navigate(redirectTo, {
        replace: true,
        state: {
          welcomeMessage: `Welcome back, ${userName}!`,
        },
      });
    } catch (error) {
      setFormError(error.message || "Unable to sign in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-[28px] font-semibold text-[#1F2925]">Welcome back</h1>
      <p className="mt-2 text-sm leading-6 text-[#66736D]">Continue your journey.</p>

      <form className="mt-7 space-y-4" onSubmit={handleSubmit} noValidate>
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
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          error={errors.password}
        />

        <div className="flex justify-end">
          {/* <Link
            to="/forgot-password"
            className="text-sm font-medium text-[#0B4F3A] hover:text-[#083D2D] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F3A]"
          >
            Forgot password?
          </Link> */}
        </div>

        {formError ? (
          <p className="text-sm text-[#B64A4A]" role="alert">
            {formError}
          </p>
        ) : null}
        {registeredMessage ? (
          <p className="text-sm text-[#2F7D5A]" role="status">
            {registeredMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full justify-center rounded-[12px] text-[15px]"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      {/* <SocialLogin onGoogle={startGoogleAuth} disabled={isSubmitting} /> */}

      <p className="mt-6 text-center text-sm text-[#66736D]">
        New to Aau Ji?{" "}
        <Link
          to="/register"
          className="font-medium text-[#0B4F3A] hover:text-[#083D2D] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B4F3A]"
        >
          Create account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
