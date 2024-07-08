import Header from '@/components/ui/header';
import Search from '@/components/ui/search';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function Home() {
  return (
    <div>
      <Header />

      <div className="px-5 py-6">
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

        <div className="mt-6">
          <Search />
        </div>
      </div>
    </div>
  );
}
