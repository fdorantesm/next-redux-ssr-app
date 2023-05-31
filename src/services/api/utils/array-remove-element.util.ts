export function removeArrayElementByIndex<T>(array: T[], index: number): T[] {
  if (index >= 0 && index < array.length) {
    // El índice está dentro del rango válido del arreglo
    array.splice(index, 1);
  }
  return array;
}
