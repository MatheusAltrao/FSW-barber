import { db } from '@/app/lib/prisma';
import Divider from '@/components/ui/divider';
import SectionTitle from '@/components/ui/sectiont-title';
import { redirect } from 'next/navigation';
import BarbershopInfo from '../components/barbershop-info';

interface BarbersopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbersopDetailsPage = async ({ params }: BarbersopDetailsPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!params.id || !barbershop) {
    return redirect('/');
  }

  return (
    <div>
      <BarbershopInfo barbershop={barbershop} />

      <Divider />

      <div className="px-5">
        <SectionTitle text="SOBRE NÓS" />
        <p className="text-sm">
          Bem-vindo à {barbershop.name}, onde tradição encontra estilo. Nossa equipe de mestres
          barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor,
          promovemos confiança, estilo e uma comunidade unida.
        </p>
      </div>

      <Divider />
    </div>
  );
};

export default BarbersopDetailsPage;
