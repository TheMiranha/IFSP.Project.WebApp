import { AuthUser } from "@/modules/auth/domain/auth.outputs";

export function getNameByAuthUser(user: AuthUser) {
  if (!user) return ''
  if (user.fullName) return user.fullName
  return `${user.firstName || ''} ${user.lastName || ''}`
}