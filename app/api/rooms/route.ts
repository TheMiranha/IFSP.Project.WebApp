import { getUserRooms } from "@/modules/room/domain/room.actions"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET() {
  const response = await getUserRooms()
  return NextResponse.json(response)
}
