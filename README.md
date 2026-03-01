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

#### Linting

Lint files with [ESLint](https://eslint.org/):

```bash
yarn lint
```

---

### 2. Using Docker

#### Development

To run the application in development mode using Docker:

```bash
docker-compose up
```

By default, the `frontend` service is configured to map port `80` to the container's port `80`. However, the `dev` stage in the `Dockerfile` runs `yarn dev` (usually port `5173`).

To build and run the production-ready container:

```bash
docker build -t tv-shows-app .
docker run -p 8080:80 tv-shows-app
```

The application will be available at `http://localhost:8080`.

#### Using Docker Compose

If you use `docker-compose.yaml`, it will build the image and start the service:

```bash
docker-compose up --build
```

The application will be available at `http://localhost`.

## Project Configuration

See [Vite Configuration Reference](https://vite.dev/config/).
