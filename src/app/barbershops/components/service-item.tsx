'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formattedPrice } from '@/helpers/formatPrice';
import { Service } from '@prisma/client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface ServiceProps {
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated }: ServiceProps) => {
  const handleBookingClick = async () => {
    if (!isAuthenticated) {
      await signIn('google');
    }
  };
  return (
    <Card>
      <CardContent className=" flex gap-4 p-3">
        <div className="relative   h-[120px] w-full max-w-[120px] ">
          <Image
            className="rounded-md"
            src={service.imageUrl}
            alt={service.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex flex-col justify-between w-full">
          <div>
            <h3 className="font-bold">{service.name}</h3>
            <p className="text-gray-400 text-sm">{service.description}</p>
          </div>

          <div className="flex items-center justify-between w-full">
            <span className="text-primary font-bold  ">{formattedPrice(service.price)}</span>
            <Button
              onClick={handleBookingClick}
              size={'sm'}
            >
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
