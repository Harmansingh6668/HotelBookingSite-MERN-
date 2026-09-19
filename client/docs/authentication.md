# Aau Ji Authentication

This document covers the **authentication UI and frontend API layer only**. It does not change homepage, booking, hotel, payment, or backend business logic.

## Architecture

```
FRONTEND (Login / Register / Forgot Password / OTP)
        ↓
AUTH API CLIENT (`src/services/auth/authService.js`)
        ↓
AUTH API (`/api/auth/*`)
        ↓
BACKEND AUTH SERVICE
        ↓
DATABASE (user records)
```

## 1. Login UI architecture

`src/pages/Login.jsx` renders inside `AuthLayout`. It owns email/password state, client-side validation, loading, and error messages. On success, `loginRequest` persists the returned token/user and redirects to the previous route, including its query string and hash, or `/`.

## 2. Registration UI architecture

`src/pages/Register.jsx` uses the same layout with a longer form: first name, last name, email, password, confirm password, and terms. It does not duplicate layout markup. After a successful register call it navigates to `/verify-otp` with `{ email }` in location state.

## 3. AuthLayout architecture

`src/components/auth/AuthLayout.jsx` owns:

- Full-viewport destination photography
- Destination storytelling copy
- Top brand row and Back to Home
- Floating ivory auth card slot (`children`)
- Destination selector
- Desktop vs mobile structure

Login, Register, Forgot Password, and OTP only supply card content.

## 4. Destination background system

`src/data/authDestinations.js` is the source of truth for id, name, subtitle, message, image, and focal position.

`DestinationBackground.jsx` stacks all destination images and crossfades opacity (~700ms). Gradients are used only for text readability. There is no green color filter.

## 5. Destination selector

`DestinationSelector.jsx` is a button group at the bottom of the viewport. The active destination uses a gold dot and high-contrast label. Changing destination updates background, title, subtitle, and message. The auth card stays in place.

## 6. Form validation

Client validation lives in `src/utils/auth/validateAuth.js`.

| Screen | Rules |
| --- | --- |
| Login | Email required + format, password required |
| Register | Names required, email format, password min 8, confirm match, terms checked |
| Forgot password | Email required + format |
| OTP | Exactly 6 digits |

Labels are always visible. Placeholders are not the only accessible name.

## 7. Login request flow

1. User submits `/login`.
2. `getLoginErrors` runs.
3. `loginRequest` POSTs `{ email, password }` to `/auth/login`.
4. Token/user are stored in `localStorage`.
5. User is redirected.

## 8. Registration request flow

1. User submits `/register`.
2. `getRegisterErrors` runs.
3. `registerRequest` POSTs `{ firstName, lastName, email, password }` to `/auth/register`.
4. Registration does not create a local session before verification.
5. User is sent to `/verify-otp` with the email in route state.
6. `verifyOtpRequest` POSTs the email and six-digit OTP, then persists the returned session.

## 9. Expected backend API contract

The current backend directory has **no application auth routes, controllers, or user models**; it currently contains only dependency metadata and installed packages. The frontend therefore cannot complete a real login/register request until the backend implements this contract. No backend files were changed.

The frontend is written against this contract, mounted under `VITE_API_BASE_URL` (default `http://localhost:5000/api`):

### `POST /auth/register`

Request:

```json
{
  "firstName": "Aman",
  "lastName": "Singh",
  "email": "aman@example.com",
  "password": "password123"
}
```

Success `201`:

```json
{
  "message": "Account created",
  "user": { "id": "user_id", "firstName": "Aman", "lastName": "Singh", "email": "aman@example.com" },
  "token": "jwt-or-session-token",
  "requiresVerification": true
}
```

### `POST /auth/login`

Request:

```json
{ "email": "aman@example.com", "password": "password123" }
```

Success `200`:

```json
{
  "message": "Signed in",
  "user": { "id": "user_id", "firstName": "Aman", "lastName": "Singh", "email": "aman@example.com" },
  "token": "jwt-or-session-token"
}
```

Invalid credentials: `401` with `{ "message": "Invalid email or password" }`.

### `POST /auth/forgot-password`

Request: `{ "email": "aman@example.com" }`  
Success `200`: `{ "message": "If an account exists, a reset email was sent." }`

### `POST /auth/verify-otp`

Request: `{ "email": "aman@example.com", "otp": "123456" }`  
Success `200`: `{ "message": "Verified", "token": "...", "user": { } }`

### `POST /auth/resend-otp`

Request: `{ "email": "aman@example.com" }`  
Success `200`: `{ "message": "Code sent" }`

### `GET /auth/google`

Browser redirect into Google OAuth. After success, redirect back to the client with a session already established (cookie or token query param — backend decision).

Error bodies should include `{ "message": "Human readable error" }` so `apiClient` can surface them.

## 10. Authentication response handling

`authService` accepts `token`, `accessToken`, or `data.token`, and `user` or `data.user`. Unknown extra fields are ignored. Registration intentionally does not persist a token; OTP verification is the session boundary.

`apiClient` throws `Error(data.message)` when `response.ok` is false. It also supports successful empty/non-JSON responses and adds the stored Bearer token to authenticated requests. Auth pages catch request errors and show `formError`.

## 11. Token / session handling

| Key | Purpose |
| --- | --- |
| `aauji_auth_token` | Session token |
| `aauji_auth_user` | JSON user profile |

Helpers: `getAuthToken()`, `getAuthUser()`, `isAuthenticated()`, `logout()`.

No JWT secret, database password, or OAuth client secret belongs in the frontend.

## 12. Protected route integration

`src/components/auth/ProtectedRoute.jsx` redirects unauthenticated users to `/login` and preserves `location` in `state.from`.

It currently protects:

- `/booking`
- `/payment`
- `/booking-confirmation`
- `/my-bookings/:bookingId`

`AuthContext.jsx` reads the persisted session at startup and listens for the auth-change event. `useAuth.js` exposes the current session to authentication UI. `Navbar.jsx` uses that state to show the signed-in user and Sign out action.

## 13. Error handling

- Field errors render under inputs (`role="alert"`).
- Request failures render as a form-level message.
- Network failures bubble from `fetch` / `apiClient`.

## 14. Loading states

Primary buttons disable and change label while a request is in flight (`Signing in...`, `Creating account...`, `Sending...`, `Verifying...`). Google login is also disabled during submit.

## 15. Password security

- Passwords are never logged.
- Show/hide is a keyboard-accessible button (`aria-label`, `aria-pressed`).
- `autoComplete` is `current-password` or `new-password`.
- Confirm password is UI-only and is not sent to the API.
- Minimum length is enforced on the client; the backend should still hash with bcrypt/argon2 and enforce its own policy.

## 16. Backend connection process

1. Implement the endpoints above in the existing backend application (`http://localhost:5000/api`); no backend application entry point currently exists in this repository.
2. Add the user model and password hashing on the backend.
3. Add OTP creation, expiry, attempt limits, and delivery.
4. Keep CORS enabled for the Vite origin.
5. Confirm `client/.env` has `VITE_API_BASE_URL=http://localhost:5000/api`.
6. Restart the Vite dev server after changing env vars.
7. Test register → OTP verification → login → protected route → logout.

## 17. Environment variables required

Frontend:

- `VITE_API_BASE_URL` — already used by `src/services/api/client.js`.

Do **not** put these in frontend env files:

- JWT secrets
- MongoDB connection strings
- Google client secrets

## 18. Future backend connection checklist

The backend team should implement these authentication responsibilities without
trusting client-side validation:

- Store normalized email addresses uniquely.
- Hash passwords with bcrypt or Argon2; never store plaintext passwords.
- Return generic login failures so account existence is not disclosed.
- Expire OTPs and limit verification/resend attempts.
- Sign tokens with a server-only secret.
- Validate token claims on protected endpoints.
- Configure CORS for the deployed client origin.
- Return JSON errors using the documented `{ "message": "..." }` shape.
- Verify Google OAuth callbacks server-side.

The client sends identifiers, credentials, and OTP input to the AUTH API. The
backend validates and persists authentication state; the database is never
accessed directly by the client.

## 19. Authentication files

| Responsibility | File |
| --- | --- |
| Login screen | `src/pages/Login.jsx` |
| Registration screen | `src/pages/Register.jsx` |
| Forgot password screen | `src/pages/ForgotPassword.jsx` |
| OTP screen | `src/pages/VerifyOTP.jsx` |
| Shared auth shell | `src/components/auth/AuthLayout.jsx` |
| Auth card/background/selector | `src/components/auth/AuthCard.jsx`, `DestinationBackground.jsx`, `DestinationSelector.jsx` |
| Input controls | `src/components/auth/AuthInput.jsx`, `PasswordInput.jsx`, `OTPInput.jsx` |
| Client validation | `src/utils/auth/validateAuth.js` |
| API requests and session persistence | `src/services/auth/authService.js` |
| HTTP transport | `src/services/api/client.js` |
| Session provider/hook | `src/context/AuthContext.jsx`, `src/context/authContext.js`, `src/context/useAuth.js` |
| Protected route guard | `src/components/auth/ProtectedRoute.jsx` |

## 20. Testing Login and Register

With the backend running:

1. Open `/register`.
2. Submit empty and invalid values and confirm inline validation.
3. Register a valid account and confirm navigation to `/verify-otp`.
4. Verify an invalid and expired OTP are rejected.
5. Verify a valid OTP stores a token and redirects to `/`.
6. Open a protected route while signed out and confirm redirect to `/login`.
7. Log in with invalid credentials and confirm the form-level error.
8. Log in with valid credentials and confirm return to the originally requested route.
9. Refresh the page and confirm the session remains available.
10. Sign out and confirm the token is removed and protected routes redirect again.

Without the backend, expected failures are connection or 404 errors; the
frontend must display those errors rather than silently using dummy auth data.
- SMTP passwords

Those belong only on the server.

## 18. How future developers connect frontend to backend

1. Add User model + auth controllers on the backend.
2. Do not create a second frontend API client. Extend `authService.js` if a new auth endpoint appears.
3. Reuse `apiClient` so auth and hotels share the same base URL and JSON handling.
4. When attaching the token to hotel/booking calls, add an `Authorization` header in a later, explicit change to the shared client — not as a silent side effect of this UI work.
5. After Google OAuth exists, keep using `startGoogleAuth()`; it already redirects to `${VITE_API_BASE_URL}/auth/google`.

## 19. Files responsible for authentication

| File | Role |
| --- | --- |
| `src/pages/Login.jsx` | Login form |
| `src/pages/Register.jsx` | Register form |
| `src/pages/ForgotPassword.jsx` | Reset request |
| `src/pages/VerifyOTP.jsx` | OTP / verification |
| `src/components/auth/AuthLayout.jsx` | Page shell |
| `src/components/auth/AuthCard.jsx` | Ivory card + Punjabi signature |
| `src/components/auth/DestinationBackground.jsx` | Crossfade photography |
| `src/components/auth/DestinationSelector.jsx` | Scene picker |
| `src/components/auth/AuthInput.jsx` | Text/email fields |
| `src/components/auth/PasswordInput.jsx` | Password + visibility |
| `src/components/auth/SocialLogin.jsx` | Google CTA |
| `src/components/auth/OTPInput.jsx` | 6-digit code |
| `src/components/auth/ProtectedRoute.jsx` | Auth gate (ready, unused on existing routes) |
| `src/data/authDestinations.js` | Destination config |
| `src/utils/auth/validateAuth.js` | Validation |
| `src/services/auth/authService.js` | API + session |
| `src/routes/AppRoutes.jsx` | `/login`, `/register`, `/forgot-password`, `/verify-otp` |
| `docs/authentication.md` | This file |

## 20. How to test Login and Register

1. From `client`, run `npm run dev`.
2. Open `/login`, `/register`, `/forgot-password`, `/verify-otp`.
3. Check 1440, 1280, 1024, 768, 430, 390, and 360 widths.
4. Change destinations: background and copy should crossfade; the card should not jump.
5. Submit empty forms: field errors, no API call.
6. Submit valid login/register: expect a network request to `/api/auth/login` or `/api/auth/register`. Until those backend routes exist, the UI should show the API error instead of a fake success.
7. Keyboard: tab through fields, password Show/Hide, OTP boxes, destination buttons, and primary CTA.
8. Confirm homepage, navbar, search, hotels, and booking still behave as before.

## Backend endpoints still required

Because they do not exist yet, the server needs:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/verify-otp`
- `POST /api/auth/resend-otp`
- `GET /api/auth/google` (optional until Google login is implemented)

No backend files were modified for this work.
