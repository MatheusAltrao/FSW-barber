'use client';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { formattedPrice } from '@/helpers/formatPrice';
import { generateDayTimeList } from '@/helpers/hours';
import { Barbershop, Service } from '@prisma/client';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useMemo, useState } from 'react';

interface ServiceProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

const ServiceItem = ({ service, isAuthenticated, barbershop }: ServiceProps) => {
  const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 1));
  const [hour, setHour] = useState<string | undefined>();

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
    return date ? generateDayTimeList(date) : [];
  }, [date]);

  const hadleSetHourClick = (hour: string) => {
    setHour(hour);
  };

  /*  const handleBookingSubmit = async () => {
    try {
      await saveBooking();
    } catch (error) {
      console.log(error);
    }
  }; */
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
            <Sheet>
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
                    disabled={!date || !hour}
                    className="w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    Confirmar Reserva
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
