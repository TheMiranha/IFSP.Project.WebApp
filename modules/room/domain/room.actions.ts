import { isClientSide } from "@/lib/utils";
import { CreateRoom, GetUserRooms } from "./room.outputs";
import { roomOutputs } from "../config";

export async function getUserRooms(): Promise<GetUserRooms['response']> {
  const localRoomOutputs = isClientSide() ? roomOutputs.CSR : roomOutputs.SSR
  try {
    return localRoomOutputs.getUserRooms()
  } catch (error: any) {
    throw Error(error)
  }
}

export async function createRoom(props: CreateRoom['props']): Promise<CreateRoom['response']> {
  const localRoomOutputs = isClientSide() ? roomOutputs.CSR : roomOutputs.SSR
  try {
    return localRoomOutputs.createRoom(props)
  } catch (error: any) {
    throw Error(error)
  }
}

