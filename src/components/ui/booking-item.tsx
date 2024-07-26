'use client';
import { DeleteBokingAction } from '@/app/actions/booking/delete-booking-action';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { formattedPrice } from '@/helpers/formatPrice';
import { Prisma } from '@prisma/client';
import { format, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Copy, Smartphone } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import Street from '../../assets/images/strets.svg';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent } from './card';
import Loading from './loading';
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, setStartTransition] = useTransition();
  const router = useRouter();
  const handleDeleteBooking = async () => {
    setStartTransition(async () => {
      try {
        await DeleteBokingAction(booking.id);
        toast({
          title: ' Reserva Cancelada',
        });
        router.refresh();
        setOpen(false);
      } catch (error) {
        console.log(error);
      }
    });
  };
  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
      <SheetTrigger asChild>
        <div>
          <Card className="hover:border-primary transition-colors ">
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
                <p className="capitalize text-sm ">
                  {format(booking.date, 'MMMM', { locale: ptBR })}
                </p>
                <p className="capitalize text-2xl">
                  {format(booking.date, 'dd', { locale: ptBR })}
                </p>
                <p className="capitalize text-sm">
                  {format(booking.date, 'HH:mm', { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SheetTrigger>

      <SheetContent className="p-0 ">
        <SheetHeader>
          <SheetTitle className="px-5 py-6 border-b ">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6 px-5">
          <div className="relative">
            <div className="relative  h-[200px] ">
              <Image
                className="opacity-75 rounded-md"
                src={Street}
                fill
                alt={booking.barbershop.name}
                style={{ objectFit: 'cover' }}
              />
            </div>

            <div className="py-3 rounded-md px-5 z-50 flex items-center gap-2 absolute bottom-5 left-5 right-5 bg-background">
              <div className="relative h-12 min-w-12 ">
                <Image
                  className="opacity-75 rounded-full"
                  src={booking.barbershop.imageUrl}
                  fill
                  alt={booking.barbershop.name}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold">{booking.barbershop.name}</h3>
                <p className="text-xs text-muted-foreground truncate ">
                  {booking.barbershop.address}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {isPast(booking.date) ? (
              <Badge variant={'destructive'}>Finalizado</Badge>
            ) : (
              <Badge>Confirmado</Badge>
            )}
            <div className="p-3 rounded-md border bg-card space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold">{booking.service.name}</span>
                <span className="font-bold">{formattedPrice(booking.service.price)}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-400">Data</span>
                <span className="text-sm">
                  {format(booking.date, "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-400">Horário</span>
                <span className="text-sm">
                  {' '}
                  {format(booking.date, 'HH:mm', {
                    locale: ptBR,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-gray-400">Barbearia</span>
                <span className="text-sm">{booking.barbershop.name}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone size={20} />
                <span>(11) 98204-5108</span>
              </div>
              <Button
                className="gap-2"
                variant={'outline'}
              >
                Copiar <Copy size={16} />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone size={20} />
                <span>(11) 98204-5108</span>
              </div>
              <Button
                className="gap-2"
                variant={'outline'}
              >
                Copiar <Copy size={16} />
              </Button>
            </div>
          </div>

          <div className=" flex   items-center gap-4 w-full ">
            <SheetClose asChild>
              <Button
                className="w-full"
                variant={'secondary'}
              >
                Voltar
              </Button>
            </SheetClose>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  /*   disabled={isPast(booking.date) || isPending} */
                  className="w-full disabled:cursor-not-allowed"
                  variant={'destructive'}
                >
                  Cancelar Reserva
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deseja cancelar a sua reserva?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Essa ação não pode ser desfeita. Isso excluirá permanentemente sua conta e
                    remover seus dados de nossos servidores.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button
                      className="w-full"
                      variant={'secondary'}
                    >
                      Voltar
                    </Button>
                  </AlertDialogCancel>
                  <Button
                    onClick={handleDeleteBooking}
                    className="w-full disabled:cursor-not-allowed"
                    variant={'destructive'}
                  >
                    {isPending ? <Loading /> : 'Cancelar Reserva'}
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
