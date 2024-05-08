import Router from '@koa/router'

jest.mock('./middleware/errorHandler.js')
import { errorHandler } from './middleware/errorHandler.js'
// eslint-disable-next-line import/order
import { router } from './routes.js'

describe('routes', () => {
  it('should export router', () => {
    expect(router).toBeInstanceOf(Router)
  })

  it('should create a new instance of Router', () => {
    expect((Router as any).mockedConstructor).toHaveBeenCalledWith({ prefix: '/rest' })
  })

  it('should add error handler', () => {
    expect(router.use).toHaveBeenNthCalledWith(1, errorHandler)
  })

  it('should reset the prefix', () => {
    expect(router.prefix).toHaveBeenCalledWith('')
  })

  it('should have /healthcheck route', () => {
    expect(router.get).toHaveBeenCalledWith('/healthcheck', expect.any(Function))

    const middleware = (router.get as any).mock.calls.find(([path]: any[]) => path === '/healthcheck')[1]

    const ctx = {}
    middleware(ctx)

    expect(ctx).toHaveProperty('body', { status: 'Ok' })
    expect(ctx).toHaveProperty('status', 200)
  })

  it('should have fallback route', () => {
    expect(router.all).toHaveBeenCalledWith(/.*/, expect.any(Function))

    const middleware = (router.all as any).mock.calls[0][1]

    const ctx = {}
    middleware(ctx)

    expect(ctx).toHaveProperty('body', { status: 404, errors: [{ message: 'Request Not Found' }] })
    expect(ctx).toHaveProperty('status', 404)
  })
})
