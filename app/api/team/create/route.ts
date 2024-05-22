import { createTeam } from "@/modules/team/domain/team.actions";
import { CreateTeam } from "@/modules/team/domain/team.outputs";
import { NextRequest, NextResponse } from "next/server";

type Body = CreateTeam['props']

const handler = async (req: NextRequest) => {
  const body = (await req.json()) as Body

  const response = await createTeam(body)

  return NextResponse.json(response)
}

export {
  handler as POST
}