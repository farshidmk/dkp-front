import { DataGridQuery } from "@/hooks/useDataGridQuery";

/**
 * Converts a DataGrid query object into API pagination parameters.
 *
 * The API expects `skip` and `take` values:
 * - `skip` = number of records to skip (offset)
 * - `take` = number of records to fetch (page size)
 *
 * The DataGrid query uses a **1-based page number**, while most APIs
 * expect a **0-based offset**, so this function converts it.
 *
 * Example:
 *
```ts
 * convertGridQueryToApiFilterParam({ pageNumber: 2, pageSize: 10 })
 * // "skip=10&take=10"
 * @param query - DataGrid query containing pagination info
 * @returns Query string with skip and take parameters  
  */

const convertGridQueryToApiFilterParam = (query: DataGridQuery): string => {
  const pageNumber = (query.pageNumber ?? 1) - 1;
  const pageSize = query.pageSize ?? 10;
  const skip = pageNumber * pageSize;

  return toQueryString({
    skip,
    take: pageSize,
  });
};

export default convertGridQueryToApiFilterParam;

/**
 * Converts an object of primitive values into a URL query string.
 * Skips parameters whose values are `undefined`, `null`, or an empty string.
 *
 * Uses `URLSearchParams` to ensure proper URL encoding.
 *
 * Example:
 *
```ts
 * toQueryString({ page: 1, limit: 10, search: "phone" })
 * // "page=1&limit=10&search=phone"
 *
 * toQueryString({ page: 1, search: "" })
 * // "page=1"
 * @param params - Object containing query parameters
 * @returns Encoded query string without the leading ?
*/

export function toQueryString(
  params: Record<string, string | number | boolean | null | undefined>,
): string {
  return new URLSearchParams(
    Object.entries(params)
      .filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      )
      .map(([key, value]) => [key, String(value)]),
  ).toString();
}
