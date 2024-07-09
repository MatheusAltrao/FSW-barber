import { db } from '@/app/lib/prisma';
import { Button } from '@/components/ui/button';
import Divider from '@/components/ui/divider';
import SectionTitle from '@/components/ui/sectiont-title';
import { ChevronLeft, MapPinIcon, Menu, Star } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

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
      <div className="h-[250px] w-full relative">
        <Image
          className="opacity-75"
          src={barbershop.imageUrl}
          fill
          alt={barbershop.name}
          style={{ objectFit: 'cover' }}
        />

        <Button
          size={'icon'}
          variant={'outline'}
          className=" absolute top-4 left-4 z-10"
        >
          <ChevronLeft size={20} />
        </Button>

        <Button
          size={'icon'}
          variant={'outline'}
          className=" absolute top-4 right-4 z-10"
        >
          <Menu size={20} />
        </Button>
      </div>

      <div className="py-3 px-5 space-y-3">
        <h1 className="font-bold text-2xl">{barbershop.name}</h1>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPinIcon
              className="text-primary "
              size={18}
            />
            <span className="text-sm">{barbershop.address}</span>
          </div>

          <div className="flex items-center gap-2">
            <Star
              className="text-primary fill-primary"
              size={18}
            />
            <span className="text-sm">5,0 (889 avaliações)</span>
          </div>
        </div>
      </div>

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
