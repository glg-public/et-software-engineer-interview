import { StatusCodes } from 'http-status-codes'
import { DefaultState, Context, Middleware } from 'koa'

import { HttpError } from '../utils/types.js'

export const errorHandler: Middleware<DefaultState, Context> = async (ctx, next) => {
  try {
    return await next()
  } catch (err) {
    let name = 'UnknownError',
      message = 'Unknown Error',
      httpStatusCode = StatusCodes.INTERNAL_SERVER_ERROR

    if (err instanceof Error) {
      name = err.name
      message = err.message
      httpStatusCode = (err as HttpError).httpStatusCode || httpStatusCode
    } else if (typeof err === 'string') {
      message = err
    }

    ctx.body = {
      error: {
        name,
        message
      }
    }
    ctx.status = httpStatusCode
  }
}
