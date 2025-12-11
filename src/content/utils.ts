import axios, { AxiosError, type AxiosResponse } from "axios"
import { writeFileSync } from "fs"

/**
 * Writes the provided data to a log file if the environment is set to "development".
 *
 * - The log file path is determined by the `DATASETS_URL` environment variable,
 *   or defaults to "datasets" if not set. The path is transformed to a filename
 *   using a regular expression, extracting the last two segments and joining them
 *   with a hyphen.
 * - The data is serialized as pretty-printed JSON and written to the file.
 * - In non-development environments, the function does not write to disk and simply returns the data.
 *
 * @param data - The data to be logged and written to the file.
 * @param filename - Optional filename to use for the log file. Defaults to 'log.json'.
 * @returns The original data, regardless of environment.
 *
 * @remarks
 * This function is intended for debugging and development purposes only.
 * It uses Node.js `writeFileSync` to write logs synchronously.
 *
 * @example
 * ```typescript
 * writeDataToLogFile({ foo: "bar" });
 * ```
 */
export const writeDataToLogFile = (
  data: any,
  filename: string = "log.json",
) => {
  console.log(
    "[config.ts -> writeDataToLogFile] process.env.NODE_ENV = ",
    process.env.NODE_ENV,
  )
  if (process.env.NODE_ENV !== "development") {
    return data
  }
  const filepath: string = `./logs/${filename}`
  console.log("[writeDataToLogFile] - writing log to:", filepath)

  // write results to a temporary file on disk.
  writeFileSync(filepath, JSON.stringify(data, null, 2))
  return data
}

/**
 * Fetches a resource from a given URL using a Bearer token for authorization.
 * Logs the request and response details, and writes the response data to a file.
 *
 * @template T The expected type of the response data.
 * @param {string} url The URL of the resource to fetch.
 * @param {string} token The Bearer token for the Authorization header.
 * @param {string} logFilepath The path to the file where the response data should be logged.
 * @returns {Promise<T>} A Promise that resolves with the fetched data of type T.
 * @throws {Error} Throws an error if url, token, or logFilepath is not provided, or if the request fails.
 */
export const getResourceWithBearerToken = async <T>(
  url: string,
  token: string,
  logFilepath: string,
): Promise<T> => {
  if (!token) {
    throw new Error("No token provided for getResourceWithBearerToken")
  }
  if (!logFilepath) {
    throw new Error("No logFilepath provided for getResourceWithBearerToken")
  }
  if (!url) {
    throw new Error("No url provided for getResourceWithBearerToken")
  }
  return axios<T>({
    url,
    headers: {
      Authorization: `token ${token.trim()}`,
    },
  })
    .then((res: AxiosResponse<T>) => {
      const responseData: T = res.data
      const dataLength = Array.isArray(responseData)
        ? responseData.length
        : "N/A"

      console.log(
        "\n[getResourceWithBearerToken] \n - requesting url: \n  ",
        url,
      )
      console.log("   using token:", token ? "YES" : "NO")
      console.log("   received (length/items):", dataLength, "\n")

      // Pass the original data (T) through the next .then()
      writeDataToLogFile(responseData, logFilepath)
      return responseData
    })
    .catch((err: AxiosError | Error | any) => {
      const errorMessage = err.message || "Unknown error occurred"
      const tokenBeginAndEnd = token
        ? `${token.substring(0, 4)}...${token.substring(token.length - 4)}`
        : "NO TOKEN"
      console.error(
        "\x1b[31m%s\x1b[0m",
        `Error fetching datasets:\n${errorMessage}\n  - url: ${url}\n`,
        ` - ${token ? "using token: YES" : "without token"}\n`,
        ` - token: ${tokenBeginAndEnd}\n`,
      )
      throw err
    })
}
