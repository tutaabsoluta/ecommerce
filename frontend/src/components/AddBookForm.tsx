"use client"

import { ErrorMessage } from "./ErrorMessage"
import { isAxiosError } from "axios"
import { Product } from "@/types"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import api from "@/api/axios"

export default function AddBookForm() {
  const router = useRouter()

  const initialValues: Product = {
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  }

  const { handleSubmit, register, reset, formState: { errors } } = useForm<Product>({
    defaultValues: initialValues,
  })

  const handleAddBook = async (formData: Product) => {
    try {
      const { data } = await api.post("/products", formData)
      toast.success("Book created successfully!", {
        style: {
          backgroundColor: '#5bd955',
          fontSize: '16px',
          color: 'black'
        }
      })

      reset()


      router.push("/products")

    } catch (error) {
      console.log("Error details", error)
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Error creating book", {
          style: {
            backgroundColor: '#db4b4b',
            fontSize: '16px',
            color: 'white'
          }
        })
      }
    }
  }

  return (
    <form
      className="bg-slate-700 px-8 py-16 rounded-md mt-10 max-w-md mx-auto"
      onSubmit={handleSubmit(handleAddBook)}
    >
      {/* Name */}
      <div className="grid grid-cols-1 mb-2">
        <label htmlFor="name" className="mb-2 text-slate-200">Book Name</label>
        <input
          type="text"
          className="bg-slate-100 p-2 rounded-md"
          placeholder="Book title"
          id="name"
          {...register("name", {
            required: "The name is required"
          })}
        />
        {errors.name && <ErrorMessage message={errors.name.message!} />}
      </div>

      {/* Description */}
      <div className="grid grid-cols-1 mb-2">
        <label htmlFor="description" className="mb-2 text-slate-200">Description</label>
        <textarea
          className="bg-slate-100 p-2 rounded-md"
          placeholder="Short description"
          id="description"
          rows={4}
          {...register("description", {
            required: "The description is required"
          })}
        />
        {errors.description && <ErrorMessage message={errors.description.message!} />}
      </div>

      {/* Price */}
      <div className="grid grid-cols-1 mb-2">
        <label htmlFor="price" className="mb-2 text-slate-200">Price</label>
        <input
          type="number"
          className="bg-slate-100 p-2 rounded-md"
          placeholder="Book price"
          id="price"
          {...register("price", {
            required: "The price is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Price must be at least 1"
            }
          })}
        />
        {errors.price && <ErrorMessage message={errors.price.message!} />}
      </div>

      {/* Image URL */}
      <div className="grid grid-cols-1 mb-2">
        <label htmlFor="imageUrl" className="mb-2 text-slate-200">Image URL</label>
        <input
          type="text"
          className="bg-slate-100 p-2 rounded-md"
          placeholder="https://example.com/image.jpg"
          id="imageUrl"
          {...register("imageUrl", {
            required: "The image URL is required",
            pattern: {
              value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i,
              message: "Must be a valid image URL"
            }
          })}
        />
        {errors.imageUrl && <ErrorMessage message={errors.imageUrl.message!} />}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white uppercase font-bold py-2 rounded-md mt-6"
      >
        Add Book
      </button>

      <button
        type="button"
        onClick={() => router.push("/products")}
        className="w-full bg-sky-500 hover:bg-sky-600 transition-all duration-300 text-white uppercase font-semibold py-2 rounded-md mt-6 disabled:opacity-50"
      >
        Back to Book List
      </button>
    </form>
  )
}
