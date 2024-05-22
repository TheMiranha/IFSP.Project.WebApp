import { createGithubProfile } from "@/modules/auth/domain/auth.actions"
import { NextResponse } from "next/server"

async function handler() {
  const response = await createGithubProfile()
  return NextResponse.json(response)
}

export {
  handler as POST
}