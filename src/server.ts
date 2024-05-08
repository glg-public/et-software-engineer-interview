import { app } from './app.js'
import { PORT } from './utils/env.js'
import { log } from './utils/logger.js'

app.listen(PORT, () => {
  log(`App listening on port ${PORT}`)
})

process.on('SIGINT', () => {
  log('\nGracefully shutting down from SIGINT')
  process.exit(0)
})
