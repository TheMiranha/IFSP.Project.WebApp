import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ComplexProfileRoom } from "@/modules/room/domain/types";
import { getNameByAuthUser } from "@/modules/user/application/utils";

export function RoomMemberCard({ profile }: { profile: ComplexProfileRoom }) {
  const authData = profile.profile.authData
  if (!authData) return false
  const { imageUrl } = authData
  const name = getNameByAuthUser(profile.profile.authData)

  return (
    <Card className='w-[350px] max-w-full'>
      <CardHeader>
        <CardTitle>
          <Avatar>
            <AvatarFallback>
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
            <AvatarImage src={imageUrl} />
          </Avatar>
          {name}
          <Badge>{profile.role}</Badge>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}