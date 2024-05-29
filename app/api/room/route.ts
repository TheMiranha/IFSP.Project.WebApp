import { getUserRoom } from "@/modules/room/domain/room.actions"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')

  if (!roomId) {
    return NextResponse.json({ success: false, errorMessage: 'É necessário ter um código de turma!' })
  }

  const response = await getUserRoom({ roomId })

  return NextResponse.json(response)

}

export {
  handler as GET
}