import axios, { AxiosError, type AxiosResponse } from "axios"
import { writeFileSync } from "fs"

import dotenv from "dotenv"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

export const scriptDirectory = dirname(fileURLToPath(import.meta.url))
export const projectRoot = resolve(scriptDirectory, "..")

export function getEnvVariables<const Keys extends readonly string[]>(
  keys: Keys,
): Record<Keys[number], string>
export function getEnvVariables<const Keys extends readonly string[]>(
  keys: Keys,
  allowEmpty: true,
): Record<Keys[number], string | undefined>
export function getEnvVariables<const Keys extends readonly string[]>(
  keys: Keys,
  allowEmpty: boolean = false,
) {
  const nodeEnv = process.env.NODE_ENV

  const envPaths = [
    resolve(projectRoot, ".env"),
    resolve(projectRoot, ".env.local"),
    ...(nodeEnv
      ? [
          resolve(projectRoot, `.env.${nodeEnv}`),
          resolve(projectRoot, `.env.${nodeEnv}.local`),
        ]
      : []),
  ]

  dotenv.config({
    path: envPaths,
    override: true,
  })

  const envVars = {} as Record<Keys[number], string | undefined>
  keys.forEach((key: Keys[number]) => {
    envVars[key] = process.env[key]
  })
  const missingKeys = keys.filter((key: Keys[number]) => {
    const value = envVars[key]
    return value === undefined || (!allowEmpty && value.trim() === "")
  })
  if (!allowEmpty && missingKeys.length > 0) {
    console.error(
      "Missing required environment variables:",
      missingKeys.join(", "),
    )
    process.exit(1)
  }

  return allowEmpty ? envVars : (envVars as Record<Keys[number], string>)
}

/**
 * Fetches a resource from a given URL using a Bearer token for authorization and writes the response data to a file.
 * Returns the fetched data as a Promise.
 *
 * @template T The expected type of the response data.
 * @param {string} url The URL of the resource to fetch.
 * @param {string} token The Bearer token for the Authorization header.
 * @param {string} filepath The path to the file where the response data  will be written
 * @returns {Promise<T>} A Promise that resolves with the fetched data of type T.
 * @throws {Error} Throws an error if url, token, or filepath is not provided, or if the request fails.
 */
export const getResourceWithBearerToken = async <T>(
  url: string,
  token: string,
  filepath: string,
): Promise<T> => {
  if (!token) {
    throw new Error("No token provided for getResourceWithBearerToken")
  }
  if (!filepath) {
    throw new Error("No filepath provided for getResourceWithBearerToken")
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
      console.log("   writing response data to file:", filepath, "\n")

      // Pass the original data (T) through the next .then()
      writeFileSync(filepath, JSON.stringify(responseData, null, 2))
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

/**
 * Recursively transforms all keys in an object to camelCase
 * @param obj The object to transform
 * @returns A new object with all keys in camelCase
 */
export function toCamelCase(obj: any): any {
  // Return directly if null or not an object
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    return obj
  }

  // Create a new object for the result
  const result: any = {}

  // Process each key in the object
  Object.keys(obj).forEach((key) => {
    // Transform the key to camelCase
    const camelKey = key
      .split(/[\s_-]+/)
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase()
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join("")

    // Process value recursively if it's an object
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (Array.isArray(obj[key])) {
        // Handle arrays by mapping each element
        result[camelKey] = obj[key].map((item: any) =>
          typeof item === "object" && item !== null ? toCamelCase(item) : item,
        )
      } else {
        // Handle nested objects
        result[camelKey] = toCamelCase(obj[key])
      }
    } else {
      // For non-objects, just use the value directly
      result[camelKey] = obj[key]
    }
  })

  return result
}
