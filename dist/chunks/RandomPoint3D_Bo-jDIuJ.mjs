import 'react/jsx-runtime';
import 'react';

const generateRandomPoint = (min = 0, max = 10) => {
  const rand = () => Math.floor(Math.random() * (max - min + 1)) + min;
  return { x: rand(), y: rand(), z: rand() };
};

export { generateRandomPoint as g };
