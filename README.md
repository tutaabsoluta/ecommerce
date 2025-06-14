
# Fullstack Books Application

This is a **fullstack application** with the following key features:

- **Frontend:**
  - Built with **Next.js 15** using the **App Router**.
  - Styled with **Tailwind CSS**.
  - State management using **Zustand**.
  - API communication handled by **Axios**.
  - Form validation with **React Hook Form**.
  - Consumes the backend REST API.

- **Backend:**
  - Built with **Node.js**, **Express** and **MongoDB**.
  - Developed following **Clean Architecture** and **SOLID principles**.
  - Entire backend and frontend codebase written in **TypeScript**.
  - Routes protected using **JWT tokens** for authentication and role verification.

- **Authentication and Authorization:**
  - Routes are protected by a token that verifies the user's role.
  - Upon loading, users see a **login or registration panel**.
  - Once authenticated, users can access the products page.
  - Users with **USER_ROLE** can only **view** products.
  - Users with **ADMIN_ROLE** have full permissions to **view, add, edit, and delete** products.

> ⚠️ **Note:** By default, newly registered users have the `USER_ROLE`.  
  > To test admin functionality, you must manually update the role field in the MongoDB database.  
  > For example, update the `role` field to `ADMIN_ROLE` in your users collection:
  >
  > ```js
  > db.users.updateOne({ email: "your-email@example.com" }, { $set: { role: "ADMIN_ROLE" } });
  > ```

  ## Technologies Used

### Backend Dependencies
- **Node.js**
- **Express** - Web framework for Node.js
- **MongoDB** (via **Mongoose**) - NoSQL database
- **JWT (jsonwebtoken)** - Authentication and authorization
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables management
- **TypeScript types** for CORS and JSON Web Token

### Frontend Dependencies
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form validation and management
- **Zustand** - State management
- **Sonner** - Toast notifications

### Other tools and practices
- Entire codebase written in **TypeScript**
- Backend designed using **Clean Architecture** and **SOLID principles**
- Routes secured with **JWT tokens**
- Styling done with **Tailwind CSS**

## Backend setup

1. **Clone the repository and navigate into the project folder**.

   ```bash
   git clone https://github.com/tutaabsoluta/ecommerce.git
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Copy the `.env.template` file and rename it to `.env`.
   - Fill in the required environment variables.
   - Make sure your `.env` has the correct MongoDB URI. Example:

   ```env
   MONGODB_URI=mongodb://mongo-user:123456@localhost:27017/your_database_name?authSource=admin
   ```

4. **Start Docker (for MongoDB)**
   ```bash
   docker compose up -d
   ```

5. **Run the app in development mode:**

   ```bash
   npm run dev
   ```

## Frontend setup


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

# 🚀 Running the full application

Make sure you have both the backend and frontend running simultaneously in separate terminals:

- In one terminal, start the backend:

  ```bash
  cd backend
  npm run dev
  ```

- In another terminal, start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```