jest.mock('./env.js', () => ({
  DB_SERVER: 'fake-server',
  DB_PORT: 1234,
  DB_USER: 'fake-user',
  DB_PASSWORD: 'fake-password',
  DB_DATABASE: 'fake-database'
}))

import sql from 'mssql'

import { query } from './db.js'

describe('database', () => {
  describe('connection', () => {
    it("should connect the first time it's called", async () => {
      await jest.isolateModulesAsync(async () => {
        const sql = await import('mssql')
        const { connect } = await import('./db.js')

        await connect()

        expect(sql.connect).toHaveBeenCalledTimes(1)
        expect(sql.connect).toHaveBeenCalledWith({
          user: 'fake-user',
          password: 'fake-password',
          database: 'fake-database',
          server: 'fake-server',
          port: 1234,
          options: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
          }
        })
      })
    })

    it("should not connect again if it's called already", async () => {
      await jest.isolateModulesAsync(async () => {
        const sql = await import('mssql')
        const { connect } = await import('./db.js')

        await connect()

        expect(sql.connect).toHaveBeenCalledTimes(1)
        expect(sql.connect).toHaveBeenCalledWith({
          user: 'fake-user',
          password: 'fake-password',
          database: 'fake-database',
          server: 'fake-server',
          port: 1234,
          options: {
            encrypt: true, // for azure
            trustServerCertificate: true // change to true for local dev / self-signed certs
          }
        })

        await connect()

        expect(sql.connect).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('query', () => {
    it('should be alias of sql.query', () => {
      expect(query).toEqual(sql.query)
    })
  })
})
