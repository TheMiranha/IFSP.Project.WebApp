import { AuthModuleOutputs, CreateAccount } from "../domain/auth.outputs";

export class CSRAuthentication implements AuthModuleOutputs {

  async createAccount(props: CreateAccount['props']): Promise<CreateAccount['response']> {
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(props)
    }).then(res => res.json())
    return response
  }

}