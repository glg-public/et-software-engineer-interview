import Koa from 'koa'
import json from 'koa-bodyparser'
import helmet from 'koa-helmet'

import { router as baseRouter } from './routes.js'

export const app = new Koa()

//* Security
app.use(helmet.hidePoweredBy())

//* Body parsers
app.use(json())

//* Routes
app.use(baseRouter.routes())
