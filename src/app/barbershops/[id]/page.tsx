import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { db } from '@/app/lib/prisma';
import Divider from '@/components/ui/divider';
import SectionTitle from '@/components/ui/sectiont-title';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import BarbershopInfo from '../components/barbershop-info';
import ServiceItem from '../components/service-item';

interface BarbersopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbersopDetailsPage = async ({ params }: BarbersopDetailsPageProps) => {
  const session = await getServerSession(authOptions);

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!params.id || !barbershop) {
    return redirect('/');
  }

  return (
    <div className="pb-20">
      <BarbershopInfo barbershop={barbershop} />

      <Divider />

      <div className="px-5">
        <SectionTitle text="SOBRE NÓS" />
        <p className="text-sm">Bem-vindo à {barbershop.name},</p>
      </div>

      <Divider />

      <div className="px-5">
        <SectionTitle text="SERVIÇOS" />

        <div className="space-y-4">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={barbershop}
              service={service}
              isAuthenticated={!!session?.user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbersopDetailsPage;
