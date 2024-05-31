import { disableShareCodeRoom } from "@/modules/room/domain/room.actions"
import { NextRequest, NextResponse } from "next/server"

async function handler(req: NextRequest) {
  const data = await req.json()
  let errorMessage = ''
  if (!!data.disableShareCode) {
    errorMessage = 'É necessário um status para o código de compartilhamento'
  }

  if (!data.roomId) {
    errorMessage = 'É necessário um código de turma para fazer essa ação!'
  }

  if (errorMessage.length > 0) {
    return NextResponse.json({
      success: false,
      errorMessage
    })
  }

  const response = await disableShareCodeRoom(data)
  return NextResponse.json(response)
}

export {
  handler as POST
}