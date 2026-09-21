const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getLoginErrors({ email, password }) {
  const errors = {};

  if (!email?.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

export function getRegisterErrors({
  firstName,
  lastName,
  email,
  password,
  phone,
  confirmPassword,
  acceptedTerms,
}) {
  const errors = {};

  if (!firstName?.trim()) {
    errors.firstName = "Enter your first name.";
  }

  if (!lastName?.trim()) {
    errors.lastName = "Enter your last name.";
  }

  if (!email?.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!phone?.trim()) {
    errors.phone = "Enter your phone number.";
  }
  
  if (!password) {
    errors.password = "Create a password.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!acceptedTerms) {
    errors.acceptedTerms = "Please agree to the Terms and Privacy Policy.";
  }

  return errors;
}

export function getForgotPasswordErrors({ email }) {
  const errors = {};

  if (!email?.trim()) {
    errors.email = "Enter your email.";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

export function getOtpErrors(code) {
  const errors = {};
  const otp = (code || "").replace(/\D/g, "");

  if (otp.length !== 6) {
    errors.otp = "Enter the 6-digit verification code.";
  }

  return errors;
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
