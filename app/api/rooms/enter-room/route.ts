import { enterRoom } from "@/modules/room/domain/room.actions";
import { NextRequest, NextResponse } from "next/server";

async function handler(req: NextRequest) {
  const body = await req.json()
  if (!body.shareCode) {
    return { success: false, errorMessage: 'É necessário ter um código de compartilhamento.' }
  }

  const response = await enterRoom({ shareCode: body.shareCode })
  return NextResponse.json(response)
}

export {
  handler as POST
}