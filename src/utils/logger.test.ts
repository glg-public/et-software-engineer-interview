import { log } from './logger.js'

describe('logger', () => {
  let consoleLogSpy: jest.SpiedFunction<typeof console.log>

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockReturnValue(undefined)

    jest.clearAllMocks()
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  describe('log', () => {
    it('should call console.log', () => {
      log('a', 'b', 'c')

      expect(consoleLogSpy).toHaveBeenCalledWith('a', 'b', 'c')
    })
  })
})
