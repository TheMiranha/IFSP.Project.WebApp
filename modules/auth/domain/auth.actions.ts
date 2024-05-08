import { isClientSide } from "@/lib/utils";
import { authOutputs } from "../config";
import { CreateAccount, CurrentAccount } from "./auth.outputs";

export async function createAccount(props: CreateAccount['props']): Promise<CreateAccount['response']> {
  const localAuthOutputs = isClientSide() ? authOutputs.CSR : authOutputs.SSR
  try {
    return localAuthOutputs.createAccount(props)
  } catch (error: any) {
    throw Error(error)
  }
}

export async function currentAccount(): Promise<CurrentAccount['response']> {
  const localAuthOutputs = isClientSide() ? authOutputs.CSR : authOutputs.SSR
  try {
    return localAuthOutputs.currentAccount()
  } catch (error: any) {
    throw Error(error)
  }
}
