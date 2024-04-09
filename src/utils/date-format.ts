export const convertIsoDateToDate = (isoString: string): string => {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const dia = date.getDate().toString().padStart(2, '0');
  const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Lembrando que os meses começam em 0, por isso somamos 1
  const ano = date.getFullYear();

  return `${dia}/${mes}/${ano}`;
};
