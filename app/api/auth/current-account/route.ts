import { currentAccount } from "@/modules/auth/domain/auth.actions"
import { NextResponse } from "next/server"

async function handler() {
  const response = await currentAccount()

  return NextResponse.json(response)
}

export {
  handler as GET
}