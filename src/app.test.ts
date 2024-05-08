import Koa from 'koa'
import json from 'koa-bodyparser'
import helmet from 'koa-helmet'

jest.mock('./routes.js')
import { router as baseRouter } from './routes.js'
// eslint-disable-next-line import/order
import { app } from './app.js'

describe('app', () => {
  it('should export app', () => {
    expect(app).toBeInstanceOf(Koa)
  })

  it('should make a new Koa instance', () => {
    expect((Koa as any).mockedConstructor).toHaveBeenCalledWith()
  })

  it('should hide powered by', () => {
    expect(helmet.hidePoweredBy).toHaveBeenCalledTimes(1)
    expect(helmet.hidePoweredBy).toHaveBeenCalledWith()

    expect(app.use).toHaveBeenCalledWith('fake-hide-powered-by-middleware')
  })

  it('should parse JSON body', () => {
    expect(json).toHaveBeenCalledTimes(1)
    expect(json).toHaveBeenCalledWith()

    expect(app.use).toHaveBeenCalledWith('fake-body-parser-middleware')
  })

  it('should add routes', () => {
    expect(baseRouter.routes).toHaveBeenCalledTimes(1)
    expect(baseRouter.routes).toHaveBeenCalledWith()

    expect(app.use).toHaveBeenCalledWith('fake-router-middleware')
  })
})
