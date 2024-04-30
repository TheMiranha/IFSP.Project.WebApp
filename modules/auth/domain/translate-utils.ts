import { ptBR } from "./ptBR"

type PTBR = keyof (typeof ptBR)

export function convertErrorListToTranslatedErrorList({ errorList, translateSection }: { errorList?: any, translateSection: PTBR }): string[] {
  const messages: string[] = []
  if (errorList) {
    errorList.forEach((error: any) => {
      // @ts-ignore
      const message = ptBR[translateSection][error.code]
      messages.push(message)
    })
  } else {
    messages.push(ptBR[translateSection] as string)
  }
  return messages
}