import { isClientSide } from "@/lib/utils";
import { authOutputs } from "../config";
import { CreateAccount, CreateGithubProfile, CurrentAccount, GetAuthData } from "./auth.outputs";

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

export async function createGithubProfile(): Promise<CreateGithubProfile['response']> {
  const localAuthOutputs = isClientSide() ? authOutputs.CSR : authOutputs.SSR
  try {
    return localAuthOutputs.createGithubProfile()
  } catch (error: any) {
    throw Error(error)
  }
}

export async function getAuthData(props: GetAuthData['props']): Promise<GetAuthData['response']> {
  const localAuthOutputs = isClientSide() ? authOutputs.CSR : authOutputs.SSR
  try {
    return localAuthOutputs.getAuthData(props)
  } catch (error: any) {
    throw Error(error)
  }
}
