import BarbershopItem from '@/components/ui/barbershop-item';
import BookingItem from '@/components/ui/booking-item';
import Header from '@/components/ui/header';
import Search from '@/components/ui/search';
import SectionTitle from '@/components/ui/sectiont-title';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getServerSession } from 'next-auth';

import { authOptions } from './lib/auth';
import { db } from './lib/prisma';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [confirmedBookings, barbershops] = await Promise.all([
    session?.user
      ? await db.booking.findMany({
          where: {
            userId: (session.user as any).id,
            date: {
              gte: new Date(),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : [],
    db.barbershop.findMany(),
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-6 pb-20 space-y-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl">
              Olá,{' '}
              <span className="font-bold">
                {' '}
                {session?.user ? session.user.name : ' vamo agendar um corte'}{' '}
              </span>
              !
            </h2>
            <p className="capitalize text-sm">
              {format(new Date(), "EEEE, dd 'de'  MMMM  ", {
                locale: ptBR,
              })}
            </p>
          </div>

          <Search />
        </div>

        {confirmedBookings.length > 0 && (
          <div>
            <SectionTitle text="Agendamentos" />
            <div className="space-y-5">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  booking={booking}
                  key={booking.id}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <SectionTitle text="Recomendados" />

          <div className="flex items-center gap-2 overflow-x-scroll pb-2 ">
            {barbershops.map((barbershop, index) => (
              <BarbershopItem
                key={index}
                barbershop={barbershop}
              />
            ))}
          </div>
        </div>

        <div>
          <SectionTitle text="POPULARES" />

          <div className="flex items-center gap-2 overflow-x-scroll pb-2 ">
            {barbershops.map((barbershop, index) => (
              <BarbershopItem
                key={index}
                barbershop={barbershop}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
