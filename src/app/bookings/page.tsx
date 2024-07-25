import BookingItem from '@/components/ui/booking-item';
import Divider from '@/components/ui/divider';
import Header from '@/components/ui/header';
import SectionTitle from '@/components/ui/sectiont-title';
import { isFuture, isPast } from 'date-fns';
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

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBookings = bookings.filter((booking) => isFuture(booking.date));
  const finishedBookings = bookings.filter((booking) => isPast(booking.date));

  return (
    <div>
      <Header />

      <div className="px-5 pt-6 pb-20 space-y-8">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="space-y-8">
          <div className="space-y-5">
            <SectionTitle text="Confimardos" />

            <div className="space-y-3">
              {confirmedBookings.map((booking) => (
                <BookingItem
                  booking={booking}
                  key={booking.id}
                />
              ))}
            </div>
          </div>

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
      </div>
    </div>
  );
};

export default Bookings;
