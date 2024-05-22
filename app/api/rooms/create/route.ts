import { Icons } from "@/components/icon"
import { createRoom } from "@/modules/room/domain/room.actions"
import { auth, getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

type Body = {
  name: string
  description: string
  iconName: Icons
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body
  const response = await createRoom(body)
  return NextResponse.json(response)
}
