"use client";

import { ErrorMessage } from "./ErrorMessage";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { User } from "@/types";
import { useRouter } from "next/navigation";
import api from "@/api/axios";
import useUserStore from "@/store/user-store";

export default function LoginForm() {
  const setUserAndToken = useUserStore((state) => state.setUserAndToken);
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: User) => {
    try {
      const { data } = await api.post("/auth/login", formData);

      setUserAndToken(data.user, data.token);
      toast.success("Logged in successfully" , {
        style: {
          backgroundColor: '#5bd955',
          fontSize: '16px',
          color: 'black'
        }
      });
      reset();

      router.push("/products");
    } catch (error) {
      console.log("Error details", error);
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error, {
          style: {
            backgroundColor: "#db4b4b",
            fontSize: "16px",
            color: "white",
          },
        });
      }
    }
  };

  return (
    <form
      className="bg-slate-700 px-8 py-16 rounded-md mt-10"
      onSubmit={handleSubmit(handleLogin)}
    >
      {/* Email */}
      <div className="grid grid-cols-1 mb-2">
        <label htmlFor="email" className="mb-2 text-slate-200">
          E-mail
        </label>
        <input
          type="email"
          className="bg-slate-100 p-2 rounded-md"
          placeholder="Your email"
          id="email"
          {...register("email", {
            required: "The email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <ErrorMessage message={`${errors.email.message}`} />}
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 mb-2">
        <label htmlFor="password" className="mb-2 text-slate-200">
          Password
        </label>
        <input
          type="password"
          className="bg-slate-100 p-2 rounded-md"
          placeholder="Your password"
          id="password"
          {...register("password", {
            required: "The password is required",
            minLength: {
              value: 8,
              message: "The password must contain at least 8 characters",
            },
          })}
        />
        {errors.password && <ErrorMessage message={`${errors.password.message}`} />}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white uppercase font-bold py-2 rounded-md mt-6"
      >
        Sign In
      </button>
    </form>
  );
}
