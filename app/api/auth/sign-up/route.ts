import { createAccount } from "@/modules/auth/domain/auth.actions";
import { NextRequest, NextResponse } from "next/server";

type Body = {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}

async function handler(req: NextRequest) {
  const body = (await req.json()) as Body
  const createdAccount = await createAccount(body)
  return NextResponse.json(createdAccount)
}

export {
  handler as POST
}