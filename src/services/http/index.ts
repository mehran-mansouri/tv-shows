interface Response<T> {
  data?: T | null
  error?: unknown
}

class HttpClient {
  /**
   * Sends a GET request to the specified path and returns the response data.
   *
   * @param path - The endpoint path to which the GET request is sent.
   * @returns A promise that resolves to a Response object containing either the data or an error.
   *
   * @template T - The type of the expected response data.
   */
  public static async get<T>(path: string): Promise<Response<T>> {
    const baseUrl = import.meta.env.VITE_API_URL

    try {
      const response = await fetch(`${baseUrl}${path}`)
      if(!response.ok) return { error: response.status, data: null }
      const data = (await response.json()) as T
      return {
        data: data,
      }
    } catch (e) {
      return {
        error: e,
      }
    }
  }
}

export default HttpClient
