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

export type EditRoom = {
  props: {
    name: string
    description: string
    iconName: Icons
    roomId: string
  }
  response: {
    success: boolean
    errorMessage?: string
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

export type DisableShareCodeRoom = {
  props: {
    disableShareCode: boolean
    roomId: string
  },
  response: {
    success: boolean,
    errorMessage?: string,
  }
}

export type DeleteRoom = {
  props: {
    roomId: string
  }
  response: {
    success: boolean
    errorMessage?: string
  }
}


export type QuitRoom = {
  props: {
    roomId: string
  }
  response: {
    success: boolean
    errorMessage?: string
  }
}

export interface IRoomOutputs {
  getUserRooms(): Promise<GetUserRooms['response']>
  getUserRoom(props: GetUserRoom['props']): Promise<GetUserRoom['response']>
  createRoom(props: CreateRoom['props']): Promise<CreateRoom['response']>
  editRoom(props: EditRoom['props']): Promise<EditRoom['response']>
  regenerateRoomShareCode(props: RegenerateRoomShareCode['props']): Promise<RegenerateRoomShareCode['response']>
  enterRoom(props: EnterRoom['props']): Promise<EnterRoom['response']>
  disableShareCodeRoom(props: DisableShareCodeRoom['props']): Promise<DisableShareCodeRoom['response']>
  deleteRoom(props: DeleteRoom['props']): Promise<DeleteRoom['response']>
  quitRoom(props: QuitRoom['props']): Promise<QuitRoom['response']>
}