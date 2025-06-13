"use client"

import { useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import useUserStore from "@/store/user-store"
import useProductStore from "@/store/product-store"
import { logoutUser, decodeTokenRole } from "@/utils/helpers"
import UnauthorizedPage from "../unauthorized/page"
import { Product } from "@/types"
import api from "@/api/axios"
import { toast } from "sonner"
import { isAxiosError } from "axios"

export default function ProductsPage() {
  const user = useUserStore((state) => state.user)
  const token = useUserStore((state) => state.token)
  const isInitialized = useUserStore((state) => state.isInitialized)
  const setUserAndToken = useUserStore((state) => state.setUserAndToken)
  const router = useRouter()

  const products = useProductStore((state) => state.products)
  const setProducts = useProductStore((state) => state.setProducts)

  const handleLogout = () => {
    logoutUser(setUserAndToken)
    router.push("/auth/login")
  }

  const role = useMemo(() => {
    return token ? decodeTokenRole(token) : null
  }, [token])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get<Product[]>("/products")
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    if (user) {
      fetchProducts()
    }
  }, [setProducts, user])

  if (!isInitialized) {
    return <div className="p-6 text-white">Loading...</div>
  }

  if (!user) {
    return <UnauthorizedPage />
  }

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
        <p className="text-white text-center mb-8">
          Discover worlds beyond pages.{" "}
          <span className="text-red-400 font-bold">
            Exceptional books for one-of-a-kind readers
          </span>
        </p>

        {role === "ADMIN_ROLE" && (
          <div className="flex justify-center mb-10">
            <button 
              onClick={() => router.push("/admin/create")}
              className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition"
            >
              Add book
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="max-w-sm bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-contain bg-white"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 font-medium text-base mb-1">
                  ${product.price}
                </p>
                {product.description && (
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                )}
                {role === "ADMIN_ROLE" && (
                  <div className="mt-4 flex gap-2">
                    <button
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition text-sm"
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
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
