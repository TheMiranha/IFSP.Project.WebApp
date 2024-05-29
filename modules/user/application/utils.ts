import { AuthUser } from "@/modules/auth/domain/auth.outputs";
import { SimplifiedAuthUser } from "@/modules/auth/utils";

export function getNameByAuthUser(user: AuthUser | SimplifiedAuthUser) {
  if (!user) return ''
  if (user.fullName) return user.fullName
  return `${user.firstName || ''} ${user.lastName || ''}`
}