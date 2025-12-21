# Next.js 16 Enterprise Boilerplate

A scalable, opinionated starting point for modern web applications. Built for performance, maintainability, and developer experience.

## 🚀 Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Library:** [Shadcn/UI](https://ui.shadcn.com/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Server State:** [TanStack React Query](https://tanstack.com/query/latest)
- **Client State:** [Zustand](https://github.com/pmndrs/zustand)
- **Networking:** [Axios](https://axios-http.com/) (Pre-configured with Interceptors)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📚 Documentation & Standards

> **IMPORTANT:** This repository follows strict architectural guidelines and conventions.

👉 **[READ THE DOCUMENTATION (DOCUMENTATION.md)](./DOCUMENTATION.md)**

Please review the documentation file before contributing. It covers:

- Project Architecture & Directory Structure
- **The "Sync Pattern"** (React Query -> Zustand)
- Component Placement Rules
- Naming & Export Conventions

---

## 🛠️ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-repo/next-16-boilerplate.git
    cd next-16-boilerplate
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Setup Environment:**
    Copy `.example.env` to `.env` (if applicable) and configure your variables.

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Key Directories

- `app/`: Application Views and Pages (Routing).
- `components/ui/`: Atomic Shadcn components (Do not edit manually).
- `components/custom/`: Reusable global components.
- `data/`: Business logic, Stores, Services, and Hooks.
- `types/`: TypeScript definitions.

## 🤝 Contribution

Please ensure your code passes linting and formatting standards before pushing.

```bash
npm run lint
```
