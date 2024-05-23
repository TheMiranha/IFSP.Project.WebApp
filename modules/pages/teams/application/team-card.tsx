import Icon from "@/components/icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { ComplexTeam } from "@/modules/team/domain/types"
import { getNameByAuthUser } from "@/modules/user/application/utils"
import { ArrowRight } from "lucide-react"

type TeamCardProps = {
  team: ComplexTeam
}

export const TeamCard = ({ team }: TeamCardProps) => {

  const { members } = team

  return (
    <Card className='w-[350px] h-[400px]'>
      <CardHeader>
        <CardTitle>
          <Icon name={team.iconName} />
          {team.name}
        </CardTitle>
        <CardDescription>
          <HoverCard>
            <HoverCardTrigger className='cursor-default'>
              {members.length} Membro{members.length > 1 && 's'}
            </HoverCardTrigger>
            <HoverCardContent>
              {
                members.map(member => (
                  <div key={member.id} className='flex items-center gap-2 cursor-default'>
                    <Avatar className='h-6 w-6'>
                      <AvatarFallback>LM</AvatarFallback>
                      <AvatarImage src={member.profileRoom.profile.authData.imageUrl} />
                    </Avatar>
                    <Label>
                      {getNameByAuthUser(member.profileRoom.profile.authData)}
                    </Label>
                  </div>
                ))
              }
            </HoverCardContent>
          </HoverCard>
        </CardDescription>
      </CardHeader>
    </Card>
  )
}