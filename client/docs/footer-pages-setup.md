# Footer pages setup

## What was added

The footer now uses React Router `Link` components instead of `href="#"`.
Each footer item has a real route:

| Footer link | Route | Page content |
| --- | --- | --- |
| Hotels | `/hotels` | Hotel listing |
| Destinations | `/destinations` | City destinations |
| Offers | `/offers` | Offers placeholder |
| Help Center | `/help` | Search and booking help |
| Contact | `/contact` | Support contact information |
| Cancellation | `/cancellation` | Cancellation guidance |
| Privacy | `/privacy` | Privacy information |
| Terms | `/terms` | Terms of service |

## How it was created

1. `Footer.jsx` defines each link with a label and route.
2. `AppRoutes.jsx` registers the routes inside `MainLayout`, so the navbar and footer remain visible.
3. `InformationPage.jsx` is a shared page component. The `type` prop selects the content for Help, Contact, Cancellation, Privacy, or Terms.
4. Each page uses the existing `Container` component and the project’s current color and spacing styles.

## Adding another footer page

1. Add a new link object to a footer section:

   ```js
   { label: "New page", to: "/new-page" }
   ```

2. Add its content to `pageContent` in `InformationPage.jsx`.
3. Register the route in `AppRoutes.jsx`:

   ```jsx
   <Route path="new-page" element={<InformationPage type="newPage" />} />
   ```

4. Run the client build:

   ```powershell
   cd R:\hotal\hotel-booking\client
   npm run build
   ```

The current pages are informational frontend pages. Contact form submission, policy acceptance records, and automated cancellation/refund processing can be connected to backend APIs later.
