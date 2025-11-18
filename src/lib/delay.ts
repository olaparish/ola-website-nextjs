// delay.ts

/** Pause for `ms` milliseconds. */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Abortable delay.
 * Resolves after `ms` milliseconds, or rejects with an Error if the signal is aborted.
 */
export function sleepAbortable(
  ms: number,
  signal?: AbortSignal
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted)
      return reject(new DOMException("Aborted", "AbortError"));

    const id = setTimeout(() => {
      cleanup();
      resolve();
    }, ms);

    function onAbort() {
      clearTimeout(id);
      cleanup();
      reject(new DOMException("Aborted", "AbortError"));
    }

    function cleanup() {
      if (signal) signal.removeEventListener("abort", onAbort);
    }

    if (signal) signal.addEventListener("abort", onAbort);
  });
}

/**
 * Convenience: run a function after delay and return its value (allows async fn).
 * Example: await runAfter(1000, () => fetch(...) )
 */
export async function runAfter<T>(
  ms: number,
  fn: () => T | Promise<T>,
  signal?: AbortSignal
): Promise<T> {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  await sleepAbortable(ms, signal);
  return fn();
}
