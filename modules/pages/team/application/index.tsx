import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { UserHoverCardContent } from "@/modules/user/application/hoverCard/content";

export function TeamPage() {
  return (
    <div>
      <Label className='text-lg'>Sua equipe</Label>
      <div className='flex flex-wrap gap-2'>
        <Card className='w-[350px]'>
          <CardHeader>
            <HoverCard>
              <HoverCardTrigger>
                <CardDescription className='cursor-default'>
                  <Avatar>
                    <AvatarImage src='https://github.com/themiranha.png' />
                    <AvatarFallback>LM</AvatarFallback>
                  </Avatar>
                  <span>Lucas Miranda dos Santos Strapasson</span>
                </CardDescription>
              </HoverCardTrigger>
              <UserHoverCardContent
                user={
                  {
                    name: 'Lucas Miranda dos Santos Strapasson',
                    image: 'https://github.com/themiranha.png',
                    attributes: [
                      { attribute: 'strength', points: 20 },
                      { attribute: 'resistence', points: 17 },
                      { attribute: 'speed', points: 26 },
                      { attribute: 'mana', points: 14 },
                    ]
                  }
                }
              />
            </HoverCard>
          </CardHeader>
          <CardContent className='flex flex-col gap-2'>
            <Label>Concluídas: 20</Label>
            <Label>Em andamento: 1</Label>
            <Label>Aguardando corrreção: 2</Label>
            <Label>Pronta para teste: 5</Label>
          </CardContent>
          <CardFooter>
            <Button variant='outline'>Inventário</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}