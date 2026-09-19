const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authRepository = require("./auth.repository");

const registerUser = async ({ name, email, password, phone }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Check if user already exists
  const existingUser = await authRepository.findUserByEmail(
    normalizedEmail
  );

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create user
  const user = await authRepository.createUser({
    name,
    email: normalizedEmail,
    passwordHash,
    phone,
    role: "CUSTOMER",
    status: "ACTIVE",
    emailVerified: false,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    status: user.status,
    emailVerified: user.emailVerified,
  };
};

const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  // Find user including passwordHash
  const user = await authRepository.findUserForLogin(
    normalizedEmail
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  // Check account status
  if (user.status !== "ACTIVE") {
    throw new Error("Your account is not active");
  }

  // Create JWT token
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};