# Frontend – Books & Users Management

This is a frontend application built with Next.js (App Router) and Tailwind CSS for managing books. Users with the role **USER_ROLE** can only view the listed products, while users with the role **ADMIN_ROLE** have full permissions to view, edit, delete, and add new products.

The routes are protected by a token that verifies the user's role. Upon loading, users will see a login or registration panel, and once authenticated, they can access the products page.

---

## 📦 Installation & Setup

1. **Clone the repository and navigate into the project folder**:

   ```bash
   git clone https://github.com/tutaabsoluta/ecommerce.git
   cd frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Copy the `.env.template` file and rename it to `.env.local`.
   - Configure the backend API origin URL in the .env file. For example:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
   ```

   - Make sure the frontend and backend are running on different ports (Next.js defaults to port 3000).

4. **Run the app in development mode:**

```bash
npm run dev
```

## 📁 Project Scripts

| Command        | Description                              |
|----------------|------------------------------------------|
| `npm run dev`  | Starts the app in development mode      |
| `npm run build`| Builds the production version            |
| `npm start`    | Starts the production server             |
| `npm run lint` | Runs linter checks                       |