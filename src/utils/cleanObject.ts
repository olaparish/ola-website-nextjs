// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function cleanObject<T extends Record<string, any>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== undefined && value !== null && value !== "",
    ),
  ) as Partial<T>;
}
