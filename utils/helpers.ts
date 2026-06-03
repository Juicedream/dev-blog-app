export function shortenText(text: string, textLength: number) {
  const shortenText =
    text.length > textLength ? text.slice(0, textLength) : text;
  return shortenText;
}

export function extractSimilarItemsFromArrayObj(
  itemToBeExtacted: string,
  array: Record<string, unknown>[] = [],
) {
  return array.map((arrItem) => arrItem[itemToBeExtacted]);
}

export function showDataByLimit<T>(
  page: number,
  array: T[],
  dataLimit: number,
) {
  const startNumber = page <= 1 ? 0 : (page - 1) * dataLimit;
  const endNumber = startNumber + dataLimit;
  return array.reverse().slice(startNumber, endNumber);
}
