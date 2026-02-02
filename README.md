# OLA Parish Client

This is the frontend client for the **Our Lady of Africa (OLA) Parish** platform. It includes the public-facing website and the member platform for parishioners, layout groups, and priests.

## Overview

The OLA Client application is a modern, responsive web application built with [Next.js](https://nextjs.org/). It serves as the digital hub for the parish, providing:

-   **Public Website**: Information about the parish, mass schedules, news, and events.
-   **Member Platform**: A dedicated portal for parishioners to manage their profiles, view group activities, and interact with the parish administration.
-   **Group Management**: Tools for societies and parish groups to manage members and activities.
-   **Admin/Priest Portal**: Administrative dashboards for parish priests and leaders.

## Features

-   **Authentication**: Secure login implementation using [NextAuth.js](https://authjs.dev/).
-   **Responsive Design**: Mobile-first approach ensuring accessibility across all devices.
-   **Dynamic Content**: Up-to-date schedule, announcements, and parish news.
-   **Role-Based Access**: Specialized views and features for different user roles (Parishioner, Leader, Priest).

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Directory)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI + Tailwind)
-   **State Management & Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest) & [Zustand](https://zustand-demo.pmnd.rs/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) validation
-   **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
-   **HTTP Client**: Axios

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (Latest LTS recommended)
-   npm or yarn or pnpm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd ola-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Setup:**

    Copy the sample environment file to create your local environment configuration:

    ```bash
    cp .env.sample .env.local
    ```

    Open `.env.local` and update the values as needed (see [Environment Variables](#environment-variables)).

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Refer to `.env.sample` for all available configuration options. Key variables include:

-   `NEXT_PUBLIC_API_URL`: The base URL for the backend API (e.g., `http://localhost:8000/api/v1`).
-   `AUTH_SECRET`: Secret key used by NextAuth to sign session tokens.
-   `AUTH_URL`: The canonical URL of the site (optional in some deployments, required in others).

## Scripts

-   `npm run dev`: Starts the development server with Turbopack.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

-   `src/app`: App directory containing routes and pages.
-   `src/components`: Reusable UI components.
    -   `ui`: Basic UI primitives (buttons, inputs, etc.).
-   `src/lib`: Library code, including authentication configuration (`auth.ts`).
-   `src/services`: API service modules for interacting with the backend.
-   `src/utils`: Utility functions and axios configuration.
-   `src/hooks`: Custom React hooks.
-   `src/types`: TypeScript type definitions.
-   `public`: Static assets (images, icons).

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
