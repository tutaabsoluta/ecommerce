
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Login</h1>

      <LoginForm />

      <nav className="mt-10">
        <Link href="/auth/register" className="text-center text-white text-lg block">
          Don't have an account? <span className="text-sky-500">Create one!</span> 
        </Link>
      </nav>
    </>
  );
}
