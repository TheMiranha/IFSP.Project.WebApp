import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <Card className='w-fit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <CardHeader>
        <CardDescription>Projeto de IC</CardDescription>
      </CardHeader>
      <CardContent>
        <Link href='/dashboard'>
          <Button>Acessar demo</Button>
        </Link>
      </CardContent>
    </Card>
  )
}