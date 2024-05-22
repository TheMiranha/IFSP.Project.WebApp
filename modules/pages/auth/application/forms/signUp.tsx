'use client'

import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createAccount } from "@/modules/auth/domain/auth.actions"
import { toast } from "@/components/ui/use-toast"
import { useSignIn } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email(),
  emailConfirmation: z.string().email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(8)
}).refine(data => data.email === data.emailConfirmation, { message: 'Os emails precisam ser iguais!' })

export function AuthSignUpForm({ setLoading }: { setLoading: (e: boolean) => void }) {

  const { signIn } = useSignIn()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      emailConfirmation: '',
      firstName: '',
      lastName: '',
      password: '',
    },
  })

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    const response = await createAccount(values)
    if (response.error) {
      setLoading(false)
      return toast({
        title: 'Ocorreu um erro!',
        description: response.error.message,
        variant: 'destructive'
      })
    }

    await signIn?.create({
      identifier: values.email,
      password: values.password,
      strategy: 'password'
    })

    // redirecionamento forçado ( sem utilização de hooks )
    window.location.href = '/dashboard'
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
              name='emailConfirmation'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmação de email</FormLabel>
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
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primeiro nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Último nome</FormLabel>
                  <FormControl>
                    <Input
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
