import BarbershopItem from '@/components/ui/barbershop-item';
import Header from '@/components/ui/header';
import Search from '@/components/ui/search';
import SectionTitle from '@/components/ui/sectiont-title';
import { redirect } from 'next/navigation';
import { db } from '../lib/prisma';

interface BarbershopPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: 'insensitive',
      },
    },
  });

  if (!searchParams.search) {
    return redirect('/');
  }

  //http://localhost:3000/barbershops?search=vintage

  return (
    <div>
      <Header />
      <div className="px-5 pt-6 pb-20 space-y-8">
        <Search defaultValues={searchParams.search} />

        <SectionTitle text={`Resultados para  '${searchParams.search}'`} />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
