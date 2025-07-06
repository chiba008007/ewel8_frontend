export const getDateSepalate = (date: string, num: number) => {
  const str = date.split("/");
  return Number(str[num]);
};
