'use server';

import { db } from '@/app/lib/prisma';
import { endOfDay, startOfDay } from 'date-fns';

export const GetDayBookingsAction = async (date: Date) => {
  try {
    const bookings = await db.booking.findMany({
      where: {
        date: {
          lte: endOfDay(date),
          gte: startOfDay(date),
        },
      },
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
