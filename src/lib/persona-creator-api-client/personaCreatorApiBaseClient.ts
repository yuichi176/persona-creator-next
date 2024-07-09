export const personaCreatorApiBaseClient = {
  async get<T>(
    pathName: string,
    options: RequestInit | undefined,
    responseTypeValidator: TypeValidator<object, T>,
  ): Promise<ApiResponse<T>> {
    return request(`api${pathName}`, responseTypeValidator, options)
  },

  async post<T>(
    pathName: string,
    body: object,
    options: RequestInit | undefined,
    responseTypeValidator: TypeValidator<object, T>,
  ): Promise<ApiResponse<T>> {
    return request(`api${pathName}`, responseTypeValidator, {
      method: 'POST',
      ...(body === null ? {} : { body: JSON.stringify(body) }),
      ...options,
    })
  },
}

type TypeValidator<T, D> = (
  responseData: T,
) => { isValid: true; data: D } | { isValid: false; error: unknown }

const request = async <T>(
  url: string,
  responseTypeValidator: TypeValidator<object, T>,
  options?: RequestInit,
): Promise<ApiResponse<T>> => {
  const mergedOptions = {
    ...options,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  }

  try {
    const res = await fetch(url, mergedOptions)
    if (!res.ok) {
      const errorResponse = (await res.json()) as ErrorResponse | undefined
      if (errorResponse === undefined) {
        return {
          error: {
            reason: 'RequestNotReachedServer',
            message: `Request did not reach the server. Status code: ${res.status} `,
            status: res.status,
            url: res.url,
          },
          data: undefined,
        }
      } else {
        return {
          error: {
            reason: errorResponse.error.reason,
            message: `Request failed with status: ${res.status} `,
            status: res.status,
            url: res.url,
          },
          data: undefined,
        }
      }
    }

    const isStreamResponse = res.headers.get('content-type') === 'text/event-stream'
    const rowResponseData = isStreamResponse ? (res.body as object) : ((await res.json()) as object)

    const validatorResult = responseTypeValidator(rowResponseData)
    if (!validatorResult.isValid) {
      return {
        error: {
          reason: 'ValidationError',
          message: 'Response data is invalid',
        },
        data: undefined,
      }
    }

    return {
      error: undefined,
      data: validatorResult.data,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: {
          reason: 'UnexpectedError',
          message: error.message,
        },
        data: undefined,
      }
    } else {
      throw error
    }
  }
}

export type ApiResponse<T> =
  | {
      error: ApiError
      data: undefined
    }
  | {
      error: undefined
      data: T
    }

type ErrorResponse = {
  error: {
    reason: string
  }
}

type ApiError = {
  reason: string
  message: string
  status?: number
  url?: string
}
