'use server';

import { db } from '@/app/lib/prisma';

export const DeleteBokingAction = async (bookingId: string) => {
  try {
    await db.booking.delete({
      where: {
        id: bookingId,
      },
    });
    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
