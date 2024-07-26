'use server';

import { db } from '@/app/lib/prisma';

export const DeleteBokingAction = async (bookingId: string) => {
  await db.booking.delete({
    where: {
      id: bookingId,
    },
  });
};
