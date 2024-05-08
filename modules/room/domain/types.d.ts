import { ProfileRoom, Room } from "@prisma/client"

export type ComplexRoom = {
  room: Room,
  profileRoom: ProfileRoom
}