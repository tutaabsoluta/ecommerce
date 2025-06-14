"use client"

import { ErrorMessage } from "./ErrorMessage"
import { isAxiosError } from "axios"
import { Product } from "@/types"
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import api from "@/api/axios"

interface EditBookFormProps {
  productId: string
}

export default function EditBookForm({ productId }: EditBookFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const { 
    handleSubmit, 
    register, 
    reset, 
    formState: { errors, isSubmitting } 
  } = useForm<Product>()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get<Product>(`/products/${productId}`)
        reset(data) 
        setIsLoading(false)
      } catch (error) {
        toast.error("Error loading product data", {
          style: {
            backgroundColor: '#db4b4b',
            fontSize: '16px',
            color: 'white',
          }
        })
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId, reset])

  const handleEditBook = async (formData: Product) => {
    try {
      await api.put(`/products/${productId}`, formData)
      toast.success("Book updated successfully!", {
        style: {
          backgroundColor: '#5bd955',
          fontSize: '16px',
          color: 'black'
        }
      })

      router.push("/products")

    } catch (error) {
      console.log("Error details", error)
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error || "Error updating book", {
          style: {
            backgroundColor: '#db4b4b',
            fontSize: '16px',
            color: 'white'
          }
        })
      }
    }
  }

  if (isLoading) {
    return <div className="text-white text-center py-20">Loading product data...</div>
  }

  return (
    <form
      className="bg-slate-700 px-8 py-16 rounded-md mt-10 max-w-md mx-auto"
      onSubmit={handleSubmit(handleEditBook)}
    >
      {/* Name */}
      <div className="grid grid-cols-1 mb-2">
        <label htmlFor="name" className="mb-2 text-slate-00">Book Name</label>
        <input
          type="text"
          className="bg-slate-100 text-slate-950 p-2 rounded-md"
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
        <label htmlFor="description" className="mb-2 text-slate-00">Description</label>
        <textarea
          className="bg-slate-100 text-slate-950 p-2 rounded-md"
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
        <label htmlFor="price" className="mb-2 text-slate-00">Price</label>
        <input
          type="number"
          className="bg-slate-100 text-slate-950 p-2 rounded-md"
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
        <label htmlFor="imageUrl" className="mb-2 text-slate-00">Image URL</label>
        <input
          type="text"
          className="bg-slate-100 text-slate-950 p-2 rounded-md"
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
        disabled={isSubmitting}
        className="w-full bg-teal-500 hover:bg-teal-600 transition-all duration-300 text-white uppercase font-bold py-2 rounded-md mt-6 disabled:opacity-50"
      >
        Update Book
      </button>
    </form>
  )
}
