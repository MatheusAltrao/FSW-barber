import BookingItem from '@/components/ui/booking-item';
import Divider from '@/components/ui/divider';
import Header from '@/components/ui/header';
import SectionTitle from '@/components/ui/sectiont-title';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { db } from '../lib/prisma';

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  //adicionar o login
  if (!session?.user) {
    return redirect('/');
  }

  const [confirmedBookings, finishedBookings] = await Promise.all([
    db.booking.findMany({
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
    }),
    db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          lt: new Date(),
        },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ]);

  return (
    <div>
      <Header />

      <div className="px-5 pt-6 pb-20 space-y-8">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="space-y-8">
          <div className="space-y-5">
            {confirmedBookings.length > 0 && <SectionTitle text="Confimardos" />}

            <div className="space-y-3 transition-all duration-200">
              {/* adicionar framermotion */}
              {confirmedBookings.length == 0 ? (
                <p className="text-muted-foreground">Você não tem nenhum serviço agendado.</p>
              ) : (
                confirmedBookings.map((booking) => (
                  <BookingItem
                    booking={booking}
                    key={booking.id}
                  />
                ))
              )}
            </div>
          </div>

          {finishedBookings.length > 0 && (
            <div>
              <Divider />

              <div className="space-y-5">
                <SectionTitle text="Finalizados" />

                <div className="space-y-3 opacity-80">
                  {finishedBookings.map((booking) => (
                    <BookingItem
                      booking={booking}
                      key={booking.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
