import { AuthModuleOutputs, CreateAccount, CreateGithubProfile, CurrentAccount, GetAuthData } from "../domain/auth.outputs";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { ptBR } from "../domain/ptBR";
import { db } from "@/lib/db";

export class SSRAuthentication implements AuthModuleOutputs {
  async createAccount({
    email,
    firstName,
    lastName,
    password,
  }: CreateAccount["props"]): Promise<CreateAccount["response"]> {
    try {
      const createdUser = await clerkClient.users.createUser({
        emailAddress: [email],
        firstName,
        lastName,
        password,
      });
      if (createdUser) {
        await db.profile.create({
          data: {
            clerkId: createdUser.id,
          }
        })
        return { success: true };
      }
      return { success: false, error: { message: 'Ocorreu um erro.' } }
    } catch (error: any) {
      const errorCode = error.errors[0]
        .code as keyof (typeof ptBR)["unstable__errors"];
      const errorMessage =
        ptBR["unstable__errors"][errorCode] ||
        "Email já utilizado anteriormente.";
      return { success: false, error: { message: errorMessage } };
    }
  }

  async createGithubProfile(): Promise<CreateGithubProfile['response']> {
    const clerkUser = auth()
    if (!clerkUser || !clerkUser.userId) {
      return {
        success: false,
        error: {
          message: 'Usuário não autenticado!'
        }
      }
    }

    const clerkId = clerkUser.userId

    var profile = await db.profile.findUnique({
      where: {
        clerkId
      }
    })

    if (!profile) {
      profile = await db.profile.create({
        data: {
          clerkId: clerkId,
        }
      })
    }

    return {
      success: true
    }
  }

  async currentAccount(): Promise<CurrentAccount['response']> {

    const clerkUser = auth()
    if (!clerkUser || !clerkUser.userId) {
      throw new Error('User is not signed')
    }
    const clerkId = clerkUser.userId as string

    var profile = await db.profile.findUnique({
      where: {
        clerkId
      }
    })

    if (!profile) {
      profile = await db.profile.create({
        data: {
          clerkId: clerkId,
        }
      })
      console.log('Profile was not created ( clerkID: ' + clerkId + ' )')
    }

    return {
      profileId: profile.id,
      clerkId
    }
  }

  async getAuthData({ clerkId }: GetAuthData['props']): Promise<GetAuthData['response']> {

    const clerkUser = await clerkClient.users.getUser(clerkId)

    if (clerkUser) {
      return {
        success: true,
        authData: clerkUser
      }
    }
    return {
      success: false
    }
  }

}
