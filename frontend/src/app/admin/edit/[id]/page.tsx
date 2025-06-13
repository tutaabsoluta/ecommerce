"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect } from "react"
import UnauthorizedPage from "@/app/unauthorized/page"
import EditBookForm from "@/components/EditBookForm"
import useUserStore from "@/store/user-store"

export default function EditProductPage() {
  const user = useUserStore(state => state.user)
  const params = useParams()
  const router = useRouter()

  // Aseguramos que id sea string, no array
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
    return <div>ID no encontrado</div>
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl">Edit your book here</h1>
      <EditBookForm productId={id} />
    </div>
  )
}
