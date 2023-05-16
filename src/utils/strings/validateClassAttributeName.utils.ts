export function validateClassAttributeName<T>(obj: T, key: keyof T): string {
  return key.toString();
}
