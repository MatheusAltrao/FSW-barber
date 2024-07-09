import { Barbershop } from '@prisma/client';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent } from './card';

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  /* 
  const handleRedirectBarbershop = (id: string) => {
    router.push(`/barbershops/${id}`);
  }; */

  return (
    <Card className="min-w-[200px] select-none overflow-hidden">
      <CardContent className=" p-0 space-y-2 relative group  ">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-[159px] m-0 w-full object-cover rounded-t-md group-hover:scale-110 transition-transform "
        />

        <Badge className="flex  absolute   top-0 left-2 items-center justify-center gap-2 px-2 py-1">
          <Star
            className="text-primary fill-primary"
            size={16}
          />
          <span className="font-bold">5.0</span>
        </Badge>
        <div className="p-2 space-y-4 ">
          <div className="">
            <h3 className="font-bold">{barbershop.name}</h3>
            <p className="text-xs text-gray-400">{barbershop.address}</p>
          </div>

          <div>
            <Link href={`/barbershops/${barbershop.id}`}>
              <Button className="w-full">Reservar</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
