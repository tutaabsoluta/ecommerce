
import { AuthUser } from "@/types";

export function logoutUser(
  setUserAndToken: (user: AuthUser | null, token: string | null) => void
) {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUserAndToken(null, null);
}