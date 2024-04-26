import { attributes } from "./consts"

export type Attributes = typeof attributes

export type UserAttribute = {
  attribute: (typeof attributes[number])['id']
  points: number
}

export type User = {
  name: string
  image: string
  attributes: UserAttribute[]
}