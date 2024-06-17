import { quitRoom } from "@/modules/room/domain/room.actions"
import { NextRequest, NextResponse } from "next/server"

type Body = {
  roomId: string
}

const handle = async (req: NextRequest) => {
  const body = (await req.json()) as Body
  const response = await quitRoom(body)
  return NextResponse.json(response)
}

export {
  handle as POST
}