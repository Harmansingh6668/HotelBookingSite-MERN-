import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="text-6xl font-bold text-slate-200">
          403
        </p>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Access denied
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Your account does not have permission to access the
          Super Admin panel.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-flex rounded-lg bg-emerald-900 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          Return to login
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;