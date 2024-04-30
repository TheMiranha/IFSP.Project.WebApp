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

export type WithAuthModuleOutputs<T> = { authOutputs: AuthModuleOutputs } & T

export interface AuthModuleOutputs {
  createAccount(props: CreateAccount['props']): Promise<CreateAccount['response']>
}