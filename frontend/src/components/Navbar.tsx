"use client"

import { useRouter } from "next/navigation"
import useUserStore from "@/store/user-store"
import { logoutUser } from "@/utils/helpers"

export default function Navbar() {
  const user = useUserStore(state => state.user)
  const setUserAndToken = useUserStore(state => state.setUserAndToken)
  const router = useRouter()

  const handleLogout = () => {
    logoutUser(setUserAndToken)
    router.push("/auth/login")
  }

  if (!user) return null

  return (
    <nav className="bg-slate-950 text-white flex justify-between items-center p-4">
      <div className="font-semibold text-lg">Hello, {user.user}</div>
      <button
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition uppercase font-bold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  )
}
