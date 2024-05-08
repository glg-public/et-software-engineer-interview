import Router from '@koa/router'
import { StatusCodes } from 'http-status-codes'
import { Context, DefaultState } from 'koa'

import { errorHandler } from './middleware/errorHandler.js'

// ! Prefix routes with /rest as standard
const router = new Router<DefaultState, Context>({ prefix: '/rest' })

// * Middleware

router.use(errorHandler)

// * REST routes

// TODO add some routes

// ! Remove the prefix from now on
router.prefix('')

// * Top level routes

// Healthcheck
router.get<DefaultState, Context>('/healthcheck', (ctx) => {
  ctx.body = { status: 'Ok' }
  ctx.status = StatusCodes.OK
})

// Catch all
router.all<DefaultState, Context>(/.*/, (ctx) => {
  ctx.body = {
    status: StatusCodes.NOT_FOUND,
    errors: [{ message: 'Request Not Found' }]
  }
  ctx.status = StatusCodes.NOT_FOUND
})

export { router }
