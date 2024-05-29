import { WithAuthData } from "../room/domain/types";
import { AuthUser } from "./domain/auth.outputs";

export type SimplifiedAuthUser = ReturnType<typeof simplifyAuthData>

export function simplifyAuthData(e: AuthUser) {
  return {
    firstName: e.firstName,
    lastName: e.lastName,
    userName: e.username,
    fullName: e.fullName,
    imageUrl: e.imageUrl,
    hasImage: e.hasImage,
    id: e.id,
  }
}