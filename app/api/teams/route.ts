import { getUserTeams } from "@/modules/team/domain/team.actions"
import { NextRequest, NextResponse } from "next/server"

const handler = async (req: NextRequest) => {

  const { searchParams } = new URL(req.url)
  const roomId = searchParams.get('roomId')

  if (!roomId) {
    return NextResponse.json({ success: false, teams: [] })
  }

  const teams = await getUserTeams({ roomId })

  return NextResponse.json(teams)

}

export {
  handler as GET
}