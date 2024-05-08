jest.mock('./utils/env.js', () => ({
  PORT: 3000
}))
jest.mock('./utils/logger.js', () => ({
  log: jest.fn()
}))
jest.mock('./app.js', () => ({
  app: {
    listen: jest.fn().mockImplementation((_port: number, cb: () => void) => cb())
  }
}))

import { app } from './app.js'
import { log } from './utils/logger.js'
import './server.js'

describe('server', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('listen', () => {
    it('should call app listen', () => {
      expect(app.listen).toHaveBeenCalledTimes(1)
      expect(app.listen).toHaveBeenCalledWith(3000, expect.any(Function))
    })

    it('should call log', () => {
      expect(log).toHaveBeenCalledTimes(1)
      expect(log).toHaveBeenCalledWith('App listening on port 3000')
    })
  })

  describe('SIGINT', () => {
    it('should handle event SIGNINT', async () => {
      await jest.isolateModulesAsync(async () => {
        const processOnSpy = jest.spyOn(process, 'on').mockImplementation((_event, listener) => {
          listener()
          return process
        })
        const processExitSpy = jest.spyOn(process, 'exit').mockReturnValue(undefined as never)

        await import('./server.js')

        expect(processOnSpy).toHaveBeenCalledWith('SIGINT', expect.any(Function))
        expect(processExitSpy).toHaveBeenCalledWith(0)

        processOnSpy.mockRestore()
        processExitSpy.mockRestore()
      })
    })
  })
})
