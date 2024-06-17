import { isClientSide } from "@/lib/utils";
import { CreateRoom, DeleteRoom, DisableShareCodeRoom, EditRoom, EnterRoom, GetUserRoom, GetUserRooms, QuitRoom, RegenerateRoomShareCode } from "./room.outputs";
import { roomOutputs } from "../config";

function getOutput() {
  return isClientSide() ? roomOutputs.CSR : roomOutputs.SSR
}

export async function getUserRooms(): Promise<GetUserRooms['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.getUserRooms()
  } catch (error: any) {
    throw Error(error)
  }
}

export async function getUserRoom(props: GetUserRoom['props']): Promise<GetUserRoom['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.getUserRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function createRoom(props: CreateRoom['props']): Promise<CreateRoom['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.createRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function editRoom(props: EditRoom['props']): Promise<EditRoom['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.editRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}


export async function regenerateRoomShareCode(props: RegenerateRoomShareCode['props']): Promise<RegenerateRoomShareCode['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.regenerateRoomShareCode(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function enterRoom(props: EnterRoom['props']): Promise<EnterRoom['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.enterRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function disableShareCodeRoom(props: DisableShareCodeRoom['props']): Promise<DisableShareCodeRoom['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.disableShareCodeRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function deleteRoom(props: DeleteRoom['props']): Promise<DeleteRoom['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.deleteRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function quitRoom(props: QuitRoom['props']): Promise<QuitRoom['response']> {
  const localRoomOutputs = getOutput()
  try {
    return localRoomOutputs.quitRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}