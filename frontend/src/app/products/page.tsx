"use client"

import { isAxiosError } from "axios"
import { logoutUser, decodeTokenRole } from "@/utils/helpers"
import { Product } from "@/types"
import { toast } from "sonner"
import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import api from "@/api/axios"
import UnauthorizedPage from "../unauthorized/page"
import useProductStore from "@/store/product-store"
import LoadingSpinner from "@/components/LoadingSpinner"

export default function ProductsPage() {

  const router = useRouter()

  const products = useProductStore((state) => state.products)
  const setProducts = useProductStore((state) => state.setProducts)

  // const handleLogout = () => {
  //   logoutUser(setUserAndToken)
  //   router.push("/auth/login")
  // }

  // const role = useMemo(() => {
  //   return token ? decodeTokenRole(token) : null
  // }, [token])

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const { data } = await api.get<Product[]>("/products")
  //       setProducts(data)
  //     } catch (error) {
  //       console.error("Error fetching products:", error)
  //     }
  //   }

  //   if (user) {
  //     fetchProducts()
  //   }
  // }, [setProducts, user])

  // if (!isInitialized) {
  //   return <LoadingSpinner />
  // }

  // if (!user) {
  //   return <UnauthorizedPage />
  // }

// Delete book
const handleDelete = async (id: number) => {
  try {
    const response = await api.delete(`/products/${id}`)
    console.log(response)
    toast.success(response.data.message, {
      style: {
        backgroundColor: '#0cf50c',
        fontSize: '16px',
        color: 'black'
      }
    })
    setProducts(products.filter(product => product.id !== id && product._id !== id))
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      toast.error(error.response.data.error || "Error deleting product", {
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
    <div>

      <main className="p-6">
        <h1 className="text-6xl font-bold text-white text-center mb-8 mt-16 tracking-tighter">Explore our books</h1>
        <p className="text-slate-300 text-center mb-8 text-xl">
          Discover worlds beyond pages.{" "}
          <span className="text-red-400 font-bold">
            Exceptional books for one-of-a-kind readers
          </span>
        </p>

        {/* {role === "ADMIN_ROLE" && (
          <div className="flex justify-center mb-10">
            <button 
              onClick={() => router.push("/admin/create")}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded transition font-bold"
            >
              Add book
            </button>
          </div>
        )} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="max-w-sm bg-slate-600 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 text-teal-400">{product.name}</h2>
                <p className="text-slate-200  text-base mb-1 font-bold">
                  ${product.price}
                </p>
                {product.description && (
                  <p className="text-sm text-slate-300 line-clamp-2">
                    {product.description}
                  </p>
                )}
                {/* {role === "ADMIN_ROLE" && (
                  <div className="mt-4 flex justify-between gap-2">
                    <button
                      className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 transition text-sm"
                      onClick={() => router.push(`/admin/edit/${product._id}`)}
                    >
                      Edit book
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                      onClick={() => product._id && handleDelete(product._id)}
                    >
                      Delete book
                    </button>
                  </div>
                )} */}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
