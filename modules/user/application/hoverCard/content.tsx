'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCardContent } from "@/components/ui/hover-card"
import { Attributes, User } from "../../domain/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { getConstantAttribute } from "../../domain/consts"

type UserHoverCardContentProps = {
  user: User
}

export function UserHoverCardContent({ user: { attributes, image, name } }: UserHoverCardContentProps) {

  const RenderAttribute = ({ attributeIndex }: { attributeIndex: number }) => {

    const userAttribute = attributes[attributeIndex]
    const attributeObject = getConstantAttribute(userAttribute.attribute)
    const { Icon } = attributeObject

    return (
      <Label className='flex items-center gap-2'>
        <Icon className='size-4' />
        <span className='first-letter:uppercase'>{attributeObject.label}:</span>
        {userAttribute.points}
      </Label>
    )
  }

  return (
    <HoverCardContent>
      <CardHeader>
        <CardDescription>
          <Avatar>
            <AvatarImage src={image} />
            <AvatarFallback>LM</AvatarFallback>
          </Avatar>
          <span>{name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='relative flex flex-col items-center before:h-4 before:w-4 before:bg-pink-500 after:w-4 after:h-4 after:bg-sky-500' />
      </CardContent>
      <CardContent className='flex flex-col gap-2'>
        {attributes.map((attribute, attributeIndex) => (
          <RenderAttribute attributeIndex={attributeIndex} key={attribute.attribute} />
        ))}
      </CardContent>
    </HoverCardContent>
  )
}
