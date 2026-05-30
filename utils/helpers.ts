export function shortenText(text: string, textLength: number) {
  const shortenText =
    text.length > textLength ? text.slice(0, textLength) : text;
  return shortenText;
}
