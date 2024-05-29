import { regenerateRoomShareCode } from "@/modules/room/domain/room.actions"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
  const data = await req.json()
  if (!data.roomId) {
    return NextResponse.json({
      success: false,
      errorMessage: 'É necessário ter um código de turma!'
    })
  }
  const response = await regenerateRoomShareCode(data)
  return NextResponse.json(response)
}

export {
  handler as POST
}