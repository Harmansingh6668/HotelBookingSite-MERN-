import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import OTPInput from "../components/auth/OTPInput";
import Button from "../components/ui/Button";
import { resendOtpRequest, verifyOtpRequest } from "../services/auth/authService";
import { getOtpErrors, hasErrors } from "../utils/auth/validateAuth";

function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(45);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setTimeout(() => setSecondsLeft((current) => current - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = getOtpErrors(otp);
    setErrors(nextErrors);
    setFormError("");

    if (hasErrors(nextErrors)) return;
    if (!email) {
      setFormError("We need your email to verify this code. Please return to sign in.");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyOtpRequest({ email, otp });
      navigate("/", { replace: true });
    } catch (error) {
      setFormError(error.message || "Unable to verify the code. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email || secondsLeft > 0) return;
    setFormError("");
    try {
      await resendOtpRequest({ email });
      setStatusMessage("A new code is on its way.");
      setSecondsLeft(45);
    } catch (error) {
      setFormError(error.message || "Unable to resend the code.");
    }
  };

  return (
    <AuthLayout>
      <h1 className="text-[28px] font-semibold text-[#1F2925]">One small step</h1>
      <p className="mt-2 text-sm leading-6 text-[#66736D]">
        Enter the verification code sent to {email || "your email"}.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
        <OTPInput value={otp} onChange={setOtp} error={errors.otp} disabled={isSubmitting} />

        {formError ? (
          <p className="text-sm text-[#B64A4A]" role="alert">
            {formError}
          </p>
        ) : null}

        {statusMessage ? (
          <p className="text-sm text-[#2F7D5A]" role="status">
            {statusMessage}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full justify-center rounded-[12px] text-[15px]"
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-[#66736D]">
        <p>Didn't receive the code?</p>
        <button
          type="button"
          onClick={handleResend}
          disabled={secondsLeft > 0}
          className="mt-1 font-medium text-[#0B4F3A] hover:text-[#083D2D] disabled:cursor-not-allowed disabled:text-[#8A958F]"
        >
          {secondsLeft > 0 ? `Resend code in ${secondsLeft}s` : "Resend code"}
        </button>
      </div>

      <p className="mt-5 text-center text-sm">
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

export default VerifyOTP;
