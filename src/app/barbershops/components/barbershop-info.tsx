'use client';

import { Button } from '@/components/ui/button';
import { Barbershop } from '@prisma/client';
import { ChevronLeft, MapPinIcon, Menu, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
  const router = useRouter();

  const handleBackClick = () => {
    return router.back();
  };

  return (
    <div>
      <div className="h-[250px] w-full relative">
        <Image
          className="opacity-75"
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{ objectFit: 'cover' }}
        />

        <Button
          onClick={handleBackClick}
          size={'icon'}
          variant={'outline'}
          className=" absolute top-4 left-4 z-10"
        >
          <ChevronLeft size={20} />
        </Button>

        <Button
          size={'icon'}
          variant={'outline'}
          className=" absolute top-4 right-4 z-10"
        >
          <Menu size={20} />
        </Button>
      </div>

      <div className="py-3 px-5 space-y-3">
        <h1 className="font-bold text-2xl">{barbershop.name}</h1>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPinIcon
              className="text-primary "
              size={18}
            />
            <span className="text-sm">{barbershop.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <Star
              className="text-primary fill-primary"
              size={18}
            />
            <span className="text-sm">5,0 (889 avaliações)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarbershopInfo;
