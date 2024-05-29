import { User as ClerkUser } from "@clerk/nextjs/server"
import { SimplifiedAuthUser } from "../utils"

export type AuthUser = ClerkUser

export type CreateAccount = {
  props: {
    email: string,
    password: string,
    firstName: string,
    lastName: string
  },
  response: {
    success: boolean
    error?: { message }
  }
}

export type CreateGithubProfile = {
  response: {
    success: boolean
    error?: { message }
  }
}

export type CurrentAccount = {
  response: {
    profileId: string,
    clerkId: string
  },
}

export type GetAuthData = {
  props: {
    clerkId: string
  },
  response: {
    success: boolean
    authData?: SimplifiedAuthUser
  }
}

export type WithAuthModuleOutputs<T> = { authOutputs: AuthModuleOutputs } & T

export interface AuthModuleOutputs {
  createAccount(props: CreateAccount['props']): Promise<CreateAccount['response']>
  currentAccount(): Promise<CurrentAccount['response']>
  getAuthData(props: GetAuthData['props']): Promise<GetAuthData['response']>
  createGithubProfile(): Promise<CreateGithubProfile['response']>
}