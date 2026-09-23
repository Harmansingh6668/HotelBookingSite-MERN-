import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await login(email, password);
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message || "Login failed. Please try again.");
    }finally {
    setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-8 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-[0_24px_70px_rgba(8,61,45,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[var(--color-primary)] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10" />
          <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full border-[36px] border-[var(--color-gold)]/20" />

          <div className="relative">
            <p className="text-2xl font-semibold">ਆਓ ਜੀ</p>
            <p className="mt-1 text-xs font-medium tracking-[0.18em] text-white/70">
              AAU JI · MANAGER
            </p>
          </div>

          <div className="relative max-w-sm">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-gold-light)]">
              Welcome back
            </p>
            <h1 className="text-4xl font-semibold leading-tight">
              Manage your hotel with confidence.
            </h1>
            <p className="mt-5 text-sm leading-6 text-white/70">
              Keep reservations, rooms, guests, and your property experience
              in one calm, organized workspace.
            </p>
          </div>

          <div className="relative flex items-center gap-2 text-sm text-white/75">
            <ShieldCheck size={18} className="text-[var(--color-gold-light)]" />
            Secure manager workspace
          </div>
        </section>

        <section className="p-6 sm:p-10 lg:p-14">
          <div className="mx-auto max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="text-2xl font-semibold text-[var(--color-primary)]">
                ਆਓ ਜੀ
              </p>
              <p className="mt-1 text-xs font-medium tracking-[0.18em] text-[var(--color-text-secondary)]">
                AAU JI · MANAGER
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-[var(--color-primary)]">
                MANAGER PORTAL
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                Enter your details to access your hotel dashboard.
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="manager@aauji.com"
                    className="w-full rounded-xl border border-[var(--color-border)] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[var(--color-text-primary)]"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
                    onClick={() =>
                      setMessage("Password recovery will be available soon.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[var(--color-border)] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2.5 text-sm text-[var(--color-text-secondary)]">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-[var(--color-border)] accent-[var(--color-primary)]"
                />
                Remember me on this device
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[var(--color-primary)] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/20"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              {message && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-3 py-2.5 text-center text-sm text-[var(--color-danger)]"
                >
                  {message}
                </p>
              )}
            </form>

            <p className="mt-8 text-center text-xs leading-5 text-[var(--color-text-muted)]">
              Need help accessing your account? Contact your Aau Ji
              administrator.
            </p>

            <Link
              to="/login"
              className="mt-5 block text-center text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"
            >
              Back to login page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;