
import { AuthUser } from "@/types";

export function logoutUser(
  setUserAndToken: (user: AuthUser | null, token: string | null) => void
) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUserAndToken(null, null);
}


export const decodeTokenRole = (token: string): string | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.role || null
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

