import type { HttpError } from '../utils/types.js'

import { StatusCodes } from 'http-status-codes'
import { DefaultState, Context, Next, ParameterizedContext } from 'koa'

import { errorHandler } from './errorHandler.js'

describe('errorHandler', () => {
  let ctx: ParameterizedContext<DefaultState, Context, any>, next: jest.MockedFn<Next>

  beforeEach(() => {
    jest.clearAllMocks()

    ctx = {} as any

    next = jest.fn().mockResolvedValue(undefined)
  })

  it('should call and return next promise', async () => {
    const result = await errorHandler(ctx, next)

    expect(result).toBeUndefined()

    expect(next).toHaveBeenCalledTimes(1)
  })

  it('should handle Error instance', async () => {
    const error = new Error('test')
    next.mockRejectedValueOnce(error)

    await errorHandler(ctx, next)

    expect(ctx.body).toEqual({
      error: {
        name: 'Error',
        message: error.message
      }
    })
    expect(ctx.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })

  it('should handle Error instance (HttpError)', async () => {
    const error: HttpError = Object.assign(new Error('test'), { httpStatusCode: StatusCodes.IM_A_TEAPOT })
    next.mockRejectedValueOnce(error)

    await errorHandler(ctx, next)

    expect(ctx.body).toEqual({
      error: {
        name: 'Error',
        message: error.message
      }
    })
    expect(ctx.status).toBe(StatusCodes.IM_A_TEAPOT)
  })

  it('should handle string', async () => {
    next.mockRejectedValueOnce('test')

    await errorHandler(ctx, next)

    expect(ctx.body).toEqual({
      error: {
        name: 'UnknownError',
        message: 'test'
      }
    })
    expect(ctx.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })

  it('should handle unknown errors', async () => {
    next.mockRejectedValueOnce(123)

    await errorHandler(ctx, next)

    expect(ctx.body).toEqual({
      error: {
        name: 'UnknownError',
        message: 'Unknown Error'
      }
    })
    expect(ctx.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
  })
})
