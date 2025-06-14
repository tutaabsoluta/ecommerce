import { Toaster } from "sonner";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <section className="w-full max-w-md bg-slate-700 p-8 rounded-xl shadow-lg">
        {children}
      </section>
      <Toaster position="top-right" />
    </main>
  );
}
