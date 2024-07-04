export const randIdGenerator = () => {
  let result = '';
  const characters = '0123456789abcdef';
  for (let i = 0; i < 24; i++) {
    result += characters.charAt(Math.floor(Math.random() * 16));
  }
  return result;
};