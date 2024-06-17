import { deleteRoom } from "@/modules/room/domain/room.actions"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

type Body = {
  roomId: string
}

const handle = async (req: NextRequest) => {
  const body = (await req.json()) as Body
  const response = await deleteRoom(body)
  return NextResponse.json(response)
}

export {
  handle as POST
}