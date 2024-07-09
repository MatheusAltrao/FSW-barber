import { Decimal } from '@prisma/client/runtime/library';

export const formattedPrice = (price: Decimal) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formattedDecimalToNumber = Number(price);

  return formatter.format(formattedDecimalToNumber);
};
