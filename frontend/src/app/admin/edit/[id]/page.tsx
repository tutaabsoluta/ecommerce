"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import EditBookForm from "@/components/EditBookForm"
import useUserStore from "@/store/user-store"

export default function EditProductPage() {
  const user = useUserStore(state => state.user)
  const params = useParams()
  const router = useRouter()

  const idParam = params.id
  const id = Array.isArray(idParam) ? idParam[0] : idParam

  useEffect(() => {
    if (!user) {
      router.push("/unauthorized")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  if (!id) {
    return <div>ID not found</div>
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-6xl text-center mt-12 font-bold tracking-tighter">Edit Book Details</h1>
      <EditBookForm productId={id} />
    </div>
  )
}
