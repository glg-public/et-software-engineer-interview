describe('env', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  describe('PORT', () => {
    it('should be defaulted to 3000 when not provided', async () => {
      await jest.isolateModulesAsync(async () => {
        delete process.env.PORT

        const { PORT } = await import('./env.js')

        expect(PORT).toBe(3000)
      })
    })

    it('should be a number when provided', async () => {
      await jest.isolateModulesAsync(async () => {
        process.env.PORT = '1234'

        const { PORT } = await import('./env.js')

        expect(PORT).toBe(1234)
      })
    })
  })

  describe.each(['DB_SERVER', 'DB_USER', 'DB_PASSWORD', 'DB_DATABASE'])('%s', (envVar) => {
    it('should be a string when provided', async () => {
      await jest.isolateModulesAsync(async () => {
        process.env[envVar] = 'foo-bar'

        const envVars = await import('./env.js')

        expect(envVars[envVar as keyof typeof envVars]).toBe('foo-bar')
      })
    })
  })

  describe('DB_PORT', () => {
    it('should be defaulted to 1433 when not provided', async () => {
      await jest.isolateModulesAsync(async () => {
        delete process.env.DB_PORT

        const { DB_PORT } = await import('./env.js')

        expect(DB_PORT).toBe(1433)
      })
    })

    it('should be a number when provided', async () => {
      await jest.isolateModulesAsync(async () => {
        process.env.DB_PORT = '1234'

        const { DB_PORT } = await import('./env.js')

        expect(DB_PORT).toBe(1234)
      })
    })
  })
})
