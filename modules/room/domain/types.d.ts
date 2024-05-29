import { AuthUser } from "@/modules/auth/domain/auth.outputs"
import { SimplifiedAuthUser } from "@/modules/auth/utils"
import { User } from "@/modules/user/domain/types"
import { Profile, ProfileRoom, Room } from "@prisma/client"

type WithAuthData<T> = T & { authData: AuthUser }

type WithSimplifiedAuthData<T> = T & { authData: SimplifiedAuthUser }

type WithProfile<T> = T & { profile: WithSimplifiedAuthData<Profile> }

export type ComplexProfileRoom = WithProfile<ProfileRoom>

type WithProfilesRoom<T> = T & { profilesRoom: ComplexProfileRoom[] }

export type ComplexRoom = {
  room: WithProfilesRoom<Room>,
  profileRoom: ProfileRoom
}