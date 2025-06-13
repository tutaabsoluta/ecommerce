"use client";

import { useRouter } from "next/navigation";
import useUserStore from "@/store/user-store";
import { logoutUser } from "@/utils/helpers";
import UnauthorizedPage from "../unauthorized/page";

export default function ProductsPage() {
  const user = useUserStore((state) => state.user);
  const setUserAndToken = useUserStore((state) => state.setUserAndToken);
  const router = useRouter();

  const handleLogout = () => {
    logoutUser(setUserAndToken);
    router.push("auth//login");
  };

  if (!user) {
    return (
      <UnauthorizedPage />
    );
  }

  return (
    <div>
      <nav className="bg-slate-950 text-white flex justify-between items-center p-4">
        <div className="font-semibold text-lg">Hello, {user.user}</div>
        <button
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition uppercase font-bold"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <main className="p-6">
        <h1 className="text-3xl font-bold">Products Page</h1>
      </main>
    </div>
  );
}
