import { AuthModuleOutputs, CreateAccount, CurrentAccount } from "../domain/auth.outputs";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
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

  async currentAccount(): Promise<CurrentAccount['response']> {

    const clerkUser = await currentUser()
    if (!clerkUser) {
      throw new Error('User is not signed')
    }

    const profile = await db.profile.findUnique({
      where: {
        clerkId: clerkUser.id
      }
    })

    if (!profile) {
      throw new Error('Profile was not created ( clerkID: ' + clerkUser.id + ' )')
    }

    return {
      profileId: profile.id,
      clerkId: clerkUser.id
    }

  }

}
