'use client'

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthSignInForm } from "./forms/signIn";
import { AuthSignUpForm } from "./forms/signUp";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function AuthPage() {

  const [toCreate, setToCreate] = useState<boolean>(false)
  const { signIn, isLoaded } = useSignIn()
  const [loading, setLoading] = useState(false)
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    if (isLoaded) {
      setLoading(false)
    }
    if (isLoaded && isSignedIn) {
      router.push('/dashboard')
    }
  }, [isSignedIn, isLoaded, router])

  const handleGithubLogin = async () => {
    await signIn?.authenticateWithRedirect({
      redirectUrl: '/auth',
      redirectUrlComplete: '/dashboard',
      strategy: 'oauth_github',
    }).then(res => {
      console.log('Sucesso na autenticação oauth')
    }).catch(error => {
      console.log('Ocorreu um erro')
    })
  }

  return (
    <>
      {
        loading && (
          <div className='absolute h-[100dvh] w-[100dvw] bg-gray-100 bg-opacity-50 top-0 left-0 z-20'>
          </div>
        )
      }
      <Card className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px]'>
        <CardHeader className='space-y-5'>
          <CardTitle>Autenticação</CardTitle>
          <CardDescription className='items-center justify-center'>
            {/* <Button variant='outline' onClick={handleGithubLogin}>
              <Github />
            </Button> */}
          </CardDescription>
        </CardHeader>
        {
          toCreate ? <AuthSignUpForm setLoading={setLoading} /> : <AuthSignInForm setLoading={setLoading} />
        }
        <CardFooter>
          <Button variant='link' onClick={() => setToCreate(prev => !prev)}>
            {toCreate ? 'Já tem uma conta?' : 'Não tem uma conta?'}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}