import { isClientSide } from "@/lib/utils";
import { CreateRoom, EnterRoom, GetUserRoom, GetUserRooms, RegenerateRoomShareCode } from "./room.outputs";
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
