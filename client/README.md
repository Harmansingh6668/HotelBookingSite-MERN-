# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Deployment API configuration

Set `VITE_API_BASE_URL` in the Vercel project to the deployed backend's origin
(for example, `https://your-backend.example.com`). Do not use `localhost`.
The client accepts either the backend origin or the same origin followed by
`/api`. Set `CORS_ORIGINS` on the backend to the exact frontend origin shown in
Vercel (for example, `https://your-frontend.vercel.app`). For multiple frontend
origins, separate them with commas. These values must be configured in the
hosting providers' environment settings and the frontend must be redeployed
after changing `VITE_API_BASE_URL`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
