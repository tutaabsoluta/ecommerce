'use client'
import useUserStore from "@/store/user-store"
import UnauthorizedPage from "@/app/unauthorized/page"
import AddBookForm from "@/components/AddBookForm"


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
      <h1 className="text-white text-4xl text-center font-bold">Here you can manage your books</h1>
      <AddBookForm />
    </div>
  );
}