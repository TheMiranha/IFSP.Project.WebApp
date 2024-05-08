import { Icons } from "@/components/icon"
import { ProfileRoom, Room } from "@prisma/client"
import { ComplexRoom } from "./types"

export type GetUserRooms = {
  response: {
    rooms: ComplexRoom[]
  },
}

export type CreateRoom = {
  props: {
    name: string
    description: string
    iconName: Icons
  }
  response: {
    success: boolean
    room: Room
    profileRoom: ProfileRoom
  }
}

export interface IRoomOutputs {
  getUserRooms(): Promise<GetUserRooms['response']>
  createRoom(props: CreateRoom['props']): Promise<CreateRoom['response']>
}