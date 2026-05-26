import { API_URL } from '@/lib/config'

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

type RequestOptions = RequestInit & {
  signal?: AbortSignal
}

async function parseJson<T>(response: Response): Promise<T> {
  const payload = await response.json()
  return payload as T
}

export const apiClient = {
  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(`Request failed: ${response.statusText}`, response.status)
    }

    return parseJson<T>(response)
  },
}
