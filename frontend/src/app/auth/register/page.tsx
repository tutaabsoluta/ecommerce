
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">Create an account</h1>

      <RegisterForm />

      <nav className="mt-10">
        <Link href="/auth/login" className="text-center text-white text-lg block">
          Already have an account? <span className="text-sky-500">Login!</span>
        </Link>
      </nav>
    </>
  );
}
