import { Icons } from "@/components/icon"
import { editRoom } from "@/modules/room/domain/room.actions"
import { NextApiRequest } from "next"
import { NextRequest, NextResponse } from "next/server"

type Body = {
  roomId: string
  name: string
  description: string
  iconName: Icons
}

const handle = async (req: NextRequest) => {
  const body = (await req.json()) as Body
  const response = await editRoom(body)
  return NextResponse.json(response)
}

export {
  handle as POST
}