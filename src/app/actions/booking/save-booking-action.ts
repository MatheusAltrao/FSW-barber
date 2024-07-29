'use server';

import { db } from '@/app/lib/prisma';

interface SaveBookingActionProps {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const SaveBookingAction = async (params: SaveBookingActionProps) => {
  try {
    await db.booking.create({
      data: {
        serviceId: params.serviceId,
        barbershopId: params.barbershopId,
        userId: params.userId,
        date: params.date,
      },
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
