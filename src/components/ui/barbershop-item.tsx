import { Barbershop } from '@prisma/client';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent } from './card';

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[200px] select-none">
      <CardContent className=" p-0 space-y-2 relative ">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-[159px] m-0 w-full object-cover rounded-t-md  "
        />

        <Badge className="flex  absolute bg-[#221C3D]  hover:bg-[#221C3D]  top-0 left-2 items-center justify-center gap-2 px-2 py-1">
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

          <Button className="w-full">Reservar</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
