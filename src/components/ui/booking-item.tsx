import { Prisma } from '@prisma/client';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { Card, CardContent } from './card';
import Loading from './loading';

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <Card>
      <CardContent className="grid p-0 grid-cols-4">
        <div className="col-span-3 p-3 border-r ">
          <div>
            {isPast(booking.date) ? (
              <Badge variant={'destructive'}>Finalizado</Badge>
            ) : (
              <Badge>Confirmado</Badge>
            )}
          </div>

          <div className="space-y-4">
            <h2 className="font-bold ">{booking.service.name}</h2>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  className={'rounded-full'}
                  src={booking.barbershop.imageUrl}
                />
                <AvatarFallback>
                  <Loading />
                </AvatarFallback>
              </Avatar>

              <p className="text-sm">{booking.barbershop.name}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1 p-5 flex flex-col items-center justify-center gap-1 ">
          <p className="capitalize text-sm ">{format(booking.date, 'MMMM', { locale: ptBR })}</p>
          <p className="capitalize text-2xl">{format(booking.date, 'dd', { locale: ptBR })}</p>
          <p className="capitalize text-sm">{format(booking.date, 'HH:mm', { locale: ptBR })}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingItem;
