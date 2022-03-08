export const getColors = () => [
  { name: 'yellow', code: '#ffbf46' }, // Maximum Yellow Red
  { name: 'orage', code: '#ff6542' }, // Portland Orange
];

export const getRandomNumber = (min, max) => Math.floor((Math.random() * (max - min)) + min);

export const getRandomColor = () => {
  const colors = getColors();
  const random = getRandomNumber(0, colors?.length);
  return colors?.splice(random, 1)[0].code;
};
