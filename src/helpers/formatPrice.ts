export const formattedPrice = (price: any) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formattedDecimalToNumber = Number(price);

  return formatter.format(formattedDecimalToNumber);
};
