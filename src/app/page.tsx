import BarbershopItem from '@/components/ui/barbershop-item';
import BookingItem from '@/components/ui/booking-item';
import Header from '@/components/ui/header';
import Search from '@/components/ui/search';
import SectionTitle from '@/components/ui/sectiont-title';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { db } from './lib/prisma';

export default async function Home() {
  const barbershops = await db.barbershop.findMany();

  return (
    <div>
      <Header />

      <div className="px-5 pt-6 pb-20 space-y-8">
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-xl">
              Olá, <span className="font-bold">Miguel</span>!
            </h2>
            <p className="capitalize text-sm">
              {format(new Date(), "EEEE, dd 'de'  MMMM  ", {
                locale: ptBR,
              })}
            </p>
          </div>

          <Search />
        </div>
        <div>
          <SectionTitle text="Agendamento" />
          <BookingItem />
        </div>

        <div>
          <SectionTitle text="RECOMENDADOS" />

          <div className="flex items-center gap-2 overflow-x-scroll pb-2 ">
            {barbershops.map((barbershop) => (
              <BarbershopItem barbershop={barbershop} />
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
