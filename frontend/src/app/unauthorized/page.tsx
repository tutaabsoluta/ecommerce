"use client";

import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-6xl font-bold mb-4 text-red-500">Unauthorized</h1>
      <p className="mb-6 text-center text-white">
        You must login to access this page
      </p>
      <button
        className="bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white uppercase font-bold px-6 py-2 rounded-md mt-6"
        onClick={handleLoginRedirect}
      >
        Go to Login
      </button>
    </div>
  );
}
