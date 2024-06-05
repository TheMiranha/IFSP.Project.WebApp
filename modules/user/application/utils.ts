import { useUser } from "@/modules/auth/application/hooks/useAuth";
import { AuthUser } from "@/modules/auth/domain/auth.outputs";
import { SimplifiedAuthUser } from "@/modules/auth/utils";

type UseUserReturn = ReturnType<typeof useUser>['user']

export function getNameByAuthUser(user: AuthUser | SimplifiedAuthUser | UseUserReturn) {
  if (!user) return ''
  if (user.fullName) return user.fullName
  return `${user.firstName || ''} ${user.lastName || ''}`
}