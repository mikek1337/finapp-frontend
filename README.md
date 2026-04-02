# Finance App Frontend

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/) (recommended)

---

### 1. Install Dependencies

```bash
pnpm install
```

---

### 2. Environment Variables

Create a `.env` file in the `frontend` folder with the following content:

```
VITE_BACKEND_URL="http://localhost:3000"
```

- `VITE_BACKEND_URL`: The backend API base URL.

---

### 3. Running the App

```bash
pnpm dev
```

The frontend will be available at [http://localhost:5173](http://localhost:5173)

---

### 4. Additional Scripts

- **Build:** `pnpm build`
- **Lint:** `pnpm lint`

---

### 5. Notes

- Make sure the backend server is running and accessible at the URL specified in `VITE_BACKEND_URL`.
- Adjust ports and URLs as needed for your environment.
