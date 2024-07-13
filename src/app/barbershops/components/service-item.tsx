'use client';
import { GetDayBookingsAction } from '@/app/actions/booking/get-day-bookings-action';
import { SaveBookingAction } from '@/app/actions/booking/save-booking-action';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import Loading from '@/components/ui/loading';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { formattedPrice } from '@/helpers/formatPrice';
import { generateDayTimeList } from '@/helpers/hours';
import { Barbershop, Booking, Service } from '@prisma/client';
import { addDays, format, setHours, setMinutes } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

interface ServiceProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceProps) => {
  const { data } = useSession();
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [hour, setHour] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const [dayBookings, setDaysBookings] = useState<Booking[]>([]);

  console.log(dayBookings);

  useEffect(() => {
    if (!date) {
      return;
    }
    const refreshAvaliableHours = async () => {
      const result = await GetDayBookingsAction(date);
      setDaysBookings(result);
    };

    refreshAvaliableHours();
  }, [date]);

  const handleBookingClick = async () => {
    if (!isAuthenticated) {
      await signIn('google');
    }
  };

  const handleDateClick = (date: Date | undefined) => {
    setDate(date);
    setHour(undefined);
  };

  const timelist = useMemo(() => {
    if (!date) {
      return [];
    }
    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(':')[0]);
      const timeMinutes = Number(time.split(':')[1]);

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours();
        const bookingMinutes = booking.date.getMinutes();

        return bookingHour === timeHour && bookingMinutes === timeMinutes;
      });

      if (!booking) {
        return true;
      }

      return false;
    });
  }, [date, dayBookings]);

  const hadleSetHourClick = (hour: string) => {
    setHour(hour);
  };

  const handleBookingSubmit = async () => {
    startTransition(() => {
      try {
        if (!hour || !date || !data?.user) {
          return;
        }

        const dateHour = Number(hour.split(':')[0]);
        const dateMinutes = Number(hour.split(':')[1]);
        const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

        SaveBookingAction({
          serviceId: service.id,
          barbershopId: service.barbershopId,
          date: newDate,
          userId: (data.user as any).id,
        });

        setOpen(false);
        setHour(undefined);
        setDate(addDays(new Date(), 1));

        const formattedDate = format(date, 'dd/MM/yyyy');
        const notification = ` ${service.name} ${formattedDate} às ${hour}.`;
        router.refresh();
        toast({
          title: `${service.name} agendado!`,
          description: notification,
          action: (
            <ToastAction
              onClick={() => router.push('/bookings')}
              altText="Visualizar"
            >
              Visualizar
            </ToastAction>
          ),
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <Card>
      <CardContent className=" flex gap-4 p-3">
        <div className="relative  h-[120px] w-full max-w-[120px] ">
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
            <Sheet
              open={open}
              onOpenChange={setOpen}
            >
              <SheetTrigger asChild>
                <Button
                  onClick={handleBookingClick}
                  size={'sm'}
                >
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent className="p-0">
                <SheetHeader>
                  <SheetTitle className="px-5 py-6 border-b ">Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className="w-full py-6 border-b ">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateClick}
                    locale={ptBR}
                    className="w-full rounded-md"
                    fromDate={addDays(new Date(), 1)}
                  />
                </div>

                {date && (
                  <div className="px-5 border-b  py-6 ">
                    <div className=" flex items-center pb-2 gap-2 overflow-x-scroll">
                      {timelist.map((time, index) => (
                        <Button
                          variant={hour === time ? 'default' : 'outline'}
                          onClick={() => hadleSetHourClick(time)}
                          key={index}
                          className="rounded-full"
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className=" py-6 px-5">
                  <div className="p-3 rounded-md border bg-card space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">Corte de Cabelo</span>
                      <span className="font-bold">{formattedPrice(service.price)}</span>
                    </div>

                    {date && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-gray-400">Data</span>
                        <span className="text-sm">
                          {format(date, "dd 'de' MMMM", {
                            locale: ptBR,
                          })}{' '}
                        </span>
                      </div>
                    )}

                    {hour && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm text-gray-400">Horário</span>
                        <span className="text-sm">{hour}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm text-gray-400">Barbearia</span>
                      <span className="text-sm">{barbershop.name}</span>
                    </div>
                  </div>
                </div>

                <SheetFooter className="px-5">
                  <Button
                    onClick={handleBookingSubmit}
                    disabled={!date || !hour || isPending}
                    className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPending ? <Loading /> : ' Confirmar Reserva'}
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
