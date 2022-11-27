export const UserGen = () => {
  const id = Math.floor(Math.random() * 10000);
  return `Anonymous#${id}`;
};
