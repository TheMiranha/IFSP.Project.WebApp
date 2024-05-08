import { Icons } from "@/components/icon"
import { Room } from "@prisma/client"

export type GetUserRooms = {
  response: {
    rooms: Room[]
  }
}

export type CreateRoom = {
  props: {
    name: string
    description: string
    iconName: Icons
  }
  response: {
    success: boolean
    roomId: string
    profileRoomId: string
  }
}

export interface IRoomOutputs {
  getUserRooms(): Promise<GetUserRooms['response']>
  createRoom(props: CreateRoom['props']): Promise<CreateRoom['response']>
}