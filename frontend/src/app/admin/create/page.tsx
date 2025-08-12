'use client'
import AddBookForm from "@/components/AddBookForm"
import UnauthorizedPage from "@/app/unauthorized/page"
import useUserStore from "@/store/user-store"


export default function CreateProductPage() {

  const user = useUserStore((state) => state.user)
  const isInitialized = useUserStore((state) => state.isInitialized)

  if (!isInitialized) {
    return <div className="p-6 text-white">Cargando...</div>
  }

  if (!user ) {
    return <UnauthorizedPage />
  }
  return (
    <div>
      <h1 className="text-6xl text-center mt-12 font-bold text-white tracking-tighter">Add a New Book</h1>
      <AddBookForm />
    </div>
  );
}