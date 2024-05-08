import { getUserRooms } from "@/modules/room/domain/room.actions"
import { NextResponse } from "next/server"

async function handler() {
  const response = await getUserRooms()
  return NextResponse.json(response)
}

export {
  handler as GET
}