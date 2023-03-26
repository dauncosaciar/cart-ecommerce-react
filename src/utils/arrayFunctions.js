// Contar duplicados en un array: Saber cuántos productos iguales tenemos en el carrito
export const countDuplicatesItemArray = (value, array) => {
  let count = 0;

  array.forEach((arrayValue) => {
    if (arrayValue == value) {
      count++;
    }
  });

  return count;
};

// Saber cuántos productos únicos tenemos en el carrito
export const removeArrayDuplicates = (array) => {
  return Array.from(new Set(array));
};

// Disminuir cantidades de un producto en el carrito
export const removeItemArray = (array, item) => {
  const index = array.indexOf(item);

  if (index > -1) {
    array.splice(index, 1);
  }

  return array;
};
