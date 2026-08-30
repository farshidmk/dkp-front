/**
 * Determines whether a given value is an object that contains
 * a `message` property of type `string`.
 *
 * This type guard is useful for safely narrowing the type of a caught
 * error when working with `unknown` values inside a `try...catch` block.
 *
 * @example
 * ```ts
 * try {
 *   throw new Error("Something went wrong");
 * } catch (e) {
 *   if (errorHasMessage(e)) {
 *     console.error(e.message); // Safe access
 *   } else {
 *     console.error("Unknown error:", e);
 *   }
 * }
 * ```
 *
 * @param {unknown} e - The value to check, typically an error caught in a `catch` block.
 * @returns {e is { message: string }} `true` if `e` is an object with a string `message` property, otherwise `false`.
 */

export function errorHasMessage(e: unknown): e is { message: string } {
  return (
    typeof e === "object" &&
    e !== null &&
    "message" in e &&
    typeof (e as any).message === "string"
  );
}

/**
 * Determines whether a given error is a rate-limit (HTTP 429) error
 * returned by the backend, e.g. the login lockout response.
 *
 * @param {unknown} e - The value to check, typically a React Query mutation error.
 * @returns {e is { statusCode: number; message: string }} `true` if `e` has `statusCode === 429`.
 */
export function isRateLimitError(
  e: unknown
): e is { statusCode: number; message: string } {
  return (
    typeof e === "object" &&
    e !== null &&
    "statusCode" in e &&
    (e as any).statusCode === 429
  );
}