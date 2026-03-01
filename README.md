# TV Shows Application

A Vue 3 application built with Vite for browsing TV shows.

## Prerequisites

To run this project, you need to have the following installed:

- **Node.js**: `^20.19.0` or `>=22.12.0`
- **Yarn**: `^4.0.0` (Corepack is recommended)
- **Docker** and **Docker Compose** (optional, for containerized execution)

## Getting Started

You can build and run the application in two ways: using Node + Yarn or via Docker.

### 1. Using Node + Yarn

#### Installation

Install the project dependencies:

```bash
yarn install
```

#### Development

Start the development server with hot-reload:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`.

#### Production Build

Type-check, compile, and minify for production:

```bash
yarn build
```

The output will be in the `dist` directory.

#### Testing

Run unit tests with [Vitest](https://vitest.dev/):

```bash
yarn test:unit
```

---

### 2. Using Docker

#### Development

To run the application using Docker:

```bash
docker-compose build
docker-compose up
```

The application will be available at `http://localhost`

See [Vite Configuration Reference](https://vite.dev/config/).

## Best Practices

This project implements several performance and user experience best practices:

- **Dynamic Imports**: Used in the router (`src/router/index.ts`) to build separate chunks for each page. This ensures that the client only downloads the necessary code for the current view, reducing the initial bundle size.
- **Lazy-Loaded Images**: Implemented using `vue3-lazyload` to defer loading of images until they enter the viewport. This significantly improves initial page load time and saves bandwidth for users.
- **Shimmering States**: Provides a better UX by using skeleton screens (via `PrimeVue Skeleton`) while API data is being resolved. This reduces cumulative layout shift (CLS) and keeps users engaged during loading.
- **Accessibility (a11y)**: Focuses on making interactive elements focusable and providing descriptive `aria-label` attributes where necessary (e.g., in the search suggestions). A custom `ScreenReader` component (`src/components/screen-reader/ScreenReader.vue`) is used to provide content exclusively for screen readers without affecting the visual UI.
- **Optimized Assets**: Uses SVG icons and WebP images to minimize the output bundle size and improve rendering performance compared to traditional formats.
- **State Management (Pinia)**: Stores home page API results in a Pinia store (`src/stores/useShowStore.ts`). This prevents redundant API calls when a user navigates back to the home page, improving performance and reducing server load.

## Next Steps

While the application follows many best practices, the following can be improved:

- **Specific Error Handling**: Enhance the `HttpClient` and `ErrorComponent` to distinguish between different error types (e.g., 404, 500, network issues) and render more specific UI and recovery actions for each case.
- **Persistent API Data**: Implement persistence for the Pinia store (e.g., using `pinia-plugin-persistedstate`) to make API data resistant to page refreshes and increase loading speed for returning users.
- **Enhanced Test Coverage**: Expand the unit and integration test suite to cover all components, composables, and edge cases, ensuring better stability and preventing regressions.
- **Improved Search Experience**: Add a dedicated search results page and handle empty or no-result states more gracefully with custom illustrations or suggestions.
- **CI/CD Integration**: Set up automated workflows (e.g., GitHub Actions) for linting, type-checking, and running tests on every push and pull request.
- **Server-Side Rendering (SSR)**: Migrate the application to a framework like **Nuxt** to enable server-side rendering. This will improve SEO, social media previews, and the overall time-to-interactive for users.
