import { Icons } from "@/components/icon"
import { ProfileRoom, Room } from "@prisma/client"
import { ComplexRoom } from "./types"

export type GetUserRooms = {
  response: {
    rooms: ComplexRoom[]
  },
}

export type GetUserRoom = {
  props: {
    roomId: string
  },
  response: {
    room?: ComplexRoom
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
    room: ComplexRoom
  }
}

export type RegenerateRoomShareCode = {
  props: {
    roomId: string
  },
  response: {
    success: boolean
    errorMessage?: string
    shareCode?: string
  }
}

export type EnterRoom = {
  props: {
    shareCode: string
  },
  response: {
    success: boolean,
    errorMessage?: string,
    room?: ComplexRoom
  }
}

export interface IRoomOutputs {
  getUserRooms(): Promise<GetUserRooms['response']>
  getUserRoom(props: GetUserRoom['props']): Promise<GetUserRoom['response']>
  createRoom(props: CreateRoom['props']): Promise<CreateRoom['response']>
  regenerateRoomShareCode(props: RegenerateRoomShareCode['props']): Promise<RegenerateRoomShareCode['response']>
  enterRoom(props: EnterRoom['props']): Promise<EnterRoom['response']>
}