'use client'

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth, useSignIn } from "@clerk/nextjs"
import { useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import { ptBR } from "@/modules/auth/domain/ptBR"
import { convertErrorListToTranslatedErrorList } from "@/modules/auth/domain/translate-utils"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export function AuthSignInForm({ setLoading }: { setLoading: (e: boolean) => void }) {

  const { signIn } = useSignIn()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const signInResponse = await signIn?.create({
      identifier: values.email,
      password: values.password,
      strategy: 'password'
    })
      .catch((error: any) => {
        setLoading(false)
        const errorMessage = convertErrorListToTranslatedErrorList({ errorList: error.errors, translateSection: 'unstable__errors' })[0]

        if (errorMessage) {
          toast({
            title: 'Ops...',
            description: errorMessage,
            variant: 'destructive'
          });
        }
      })

    if (signInResponse?.status === 'complete') {
      window.location.href = '/dashboard'
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='email@email.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='********'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Continuar</Button>
          </CardFooter>
        </form>
      </Form>
    </>
  )
}