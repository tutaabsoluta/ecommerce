"use client";
import { ErrorMessage } from "./ErrorMessage";
import { isAxiosError } from "axios";
import { RegisterUser } from "@/types";
import { toast } from "sonner";
import { useForm } from "react-hook-form"
import api from "@/api/axios";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();

    const initialValues = {
        name: 'Alonso',
        email: 'sergiodu03@hotmail.com',
        password: '12345678',
        password_confirmation: '12345678',
    }


    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleRegister = async (formData: RegisterUser) => {

        try {
            const { data } = await api.post('/auth/register', formData);
            localStorage.setItem('AUTH_TOKEN', data.token)

            console.log("response data", data);

            toast.success(data.message, {
                style: {
                    backgroundColor: '#5bd955',
                    fontSize: '16px',
                    color: 'black'
                }
            })

        } catch (error) {
            console.log('Error details', error)
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error, {
                    style: {
                        backgroundColor: '#db4b4b',
                        fontSize: '16px',
                        color: 'white'
                    }
                })
            }
        }

        reset();
        router.push("/products");
    }

    const password = watch('password');

    return (
        <form
            className="bg-slate-700 px-8 py-16 rounded-md mt-10"
            onSubmit={handleSubmit(handleRegister)}
        >

            {/* Name */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="name" className="mb-2 text-slate-200">Name</label>
                <input
                    type="text"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Your name"
                    id="name"
                    {
                    ...register('name', {
                        required: 'The name is required'
                    })
                    }
                />
                {errors.name && <ErrorMessage message={`${errors.name.message}`} />}
            </div>
            {/* Email */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="email" className="mb-2 text-slate-200">E-mail</label>
                <input
                    type="email"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Your email"
                    id="email"
                    {
                    ...register('email', {
                        required: 'The email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address"
                        }
                    })
                    }
                />
                {errors.email && <ErrorMessage message={`${errors.email.message}`} />}
            </div>
            {/* Password */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="password" className="mb-2 text-slate-200">Password</label>
                <input
                    type="password"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Your password"
                    id="password"
                    {
                    ...register('password', {
                        required: 'The password is required',
                        // pattern: {
                        //     value: /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                        //     message: 'The password must have at least a number, symbol and uppercase letter'
                        // },
                        minLength: {
                            value: 8,
                            message: 'The password must contain at least 8 characters'
                        }
                    })
                    }
                />
                {errors.password && <ErrorMessage message={`${errors.password.message}`} />}
            </div>
            {/* Confirm password */}
            <div className="grid grid-cols-1 mb-2">
                <label htmlFor="confirm" className="mb-2 text-slate-200">Confirm Pasword</label>
                <input
                    type="password"
                    className="bg-slate-100 p-2 rounded-md"
                    placeholder="Confirm your password"
                    id="confirm"
                    {
                    ...register('password_confirmation', {
                        required: 'Please confirm your password',
                        min: {
                            value: 8,
                            message: 'The password must contain at least 8 characters'
                        },
                        validate: (value) => value === password || 'The passwords doesnt match'
                    })
                    }
                />
                {errors.password_confirmation && <ErrorMessage message={`${errors.password_confirmation.message}`} />}
            </div>
            {/* Submit Buttom */}
            <button
                type="submit"
                className="w-full bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white uppercase font-bold py-2 rounded-md mt-6"
            >
                Create Account
            </button>
        </form>
    );
}