import { WithProfile } from "@/modules/room/domain/types";
import { Profile, ProfileRoom, Team, TeamProfile } from "@prisma/client";

type WithProfileRoom<T> = T & {
  profileRoom: WithProfile<ProfileRoom>
}

export type ComplexTeam = Team & {
  members: WithProfileRoom<TeamProfile>[]
}