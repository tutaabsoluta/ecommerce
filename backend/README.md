# REST API – Auth & Products

This is a simple REST API built with TypeScript and Node.js that provides authentication and product management functionality. The API is organized into two main sections: **/auth** and **/products**, with admin-protected routes for managing products.

---

## 📦 Installation

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


## 📁 Project Scripts

| Command        | Description                                   |
|----------------|-----------------------------------------------|
| `npm run dev`  | Starts the app in development mode using `tsnd` with auto-restart. |
| `npm run build`| Removes the `/dist` folder and compiles TypeScript files. |
| `npm start`    | Builds the project and runs the compiled code in `dist/app.js`. |

---

## 🔐 Auth Endpoints

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| POST   | `/auth/login`  | Login with email and password. |
| POST   | `/auth/register` | Register a new user account. |

---

## 📦 Product Endpoints

### Public

| Method | Endpoint       | Description             |
|--------|----------------|-------------------------|
| GET    | `/products`    | Retrieve all products.  |
| GET    | `/products/:id`| Get product by ID.      |

### Admin Protected

| Method | Endpoint         | Description             |
|--------|------------------|-------------------------|
| POST   | `/products`      | Create a new product (requires authentication and admin role). |
| PUT    | `/products/:id`  | Update a product by ID (requires authentication and admin role). |
| DELETE | `/products/:id`  | Delete a product by ID (requires authentication and admin role). |

---

