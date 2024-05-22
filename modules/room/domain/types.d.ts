import { AuthUser } from "@/modules/auth/domain/auth.outputs"
import { User } from "@/modules/user/domain/types"
import { Profile, ProfileRoom, Room } from "@prisma/client"

type WithAuthData<T> = T & { authData: AuthUser }

type WithProfile<T> = T & { profile: WithAuthData<Profile> }

type WithProfilesRoom<T> = T & { profilesRoom: (WithProfile<ProfileRoom>)[] }

export type ComplexRoom = {
  room: WithProfilesRoom<Room>,
  profileRoom: ProfileRoom
}