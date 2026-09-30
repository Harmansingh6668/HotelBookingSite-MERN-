import { RefreshCw, TriangleAlert } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const message =
    location.state?.message ||
    "We couldn't load the admin workspace. Please try again.";

  const returnToSignIn = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--color-background)] px-4 py-10">
      <section
        className="w-full max-w-xl rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[0_24px_70px_rgba(8,61,45,0.1)] sm:p-12"
        role="alert"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-[var(--color-danger)]">
          <TriangleAlert size={30} aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-danger)]">
          Admin workspace error
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          We couldn&apos;t load this page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">
          {message}
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
          Check your connection or sign in again if your session has expired.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--color-primary-dark)]"
          >
            <RefreshCw size={16} aria-hidden="true" />
            Try again
          </button>
          <button
            type="button"
            onClick={returnToSignIn}
            className="rounded-xl border border-[var(--color-border)] px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:bg-[var(--color-surface-muted)]"
          >
            Return to sign in
          </button>
        </div>
      </section>
    </main>
  );
}

export default ErrorPage;
