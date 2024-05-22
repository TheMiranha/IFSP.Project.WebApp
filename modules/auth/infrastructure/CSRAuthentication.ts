import { AuthModuleOutputs, CreateAccount, CreateGithubProfile, CurrentAccount, GetAuthData } from "../domain/auth.outputs";

export class CSRAuthentication implements AuthModuleOutputs {

  async createAccount(props: CreateAccount['props']): Promise<CreateAccount['response']> {
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(props)
    }).then(res => res.json())
    return response
  }

  async createGithubProfile(): Promise<CreateGithubProfile['response']> {
    const response = await fetch('/api/auth/create-github-profile', {
      method: 'POST'
    }).then(res => res.json())
    return response
  }

  async currentAccount(): Promise<CurrentAccount['response']> {
    const response = await fetch('/api/auth/current-account', {
      method: 'GET'
    }).then(res => res.json())

    return response
  }

  async getAuthData(): Promise<GetAuthData['response']> {
    throw new Error('[CSRAuthentication][GetAuthData]: this action cannot be executed in client side')
  }

}