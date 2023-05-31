export function replaceElementAtIndex<T>(
  array: T[],
  index: number,
  newElement: T
): T[] {
  if (index < 0 || index >= array.length) {
    // El índice está fuera del rango del arreglo
    return array;
  }

  // Clonar el arreglo original para no modificarlo directamente
  const newArray = [...array];

  // Reemplazar el elemento en el índice especificado
  newArray[index] = newElement;

  return newArray;
}
