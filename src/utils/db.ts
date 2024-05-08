import sql from 'mssql'

import { DB_SERVER, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from './env.js'

let connection: Promise<sql.ConnectionPool> | undefined

export const connect = () =>
  (connection = connection
    ? connection
    : sql.connect({
        user: DB_USER!,
        password: DB_PASSWORD!,
        database: DB_DATABASE!,
        server: DB_SERVER!,
        port: DB_PORT,
        options: {
          encrypt: true, // for azure
          trustServerCertificate: true // change to true for local dev / self-signed certs
        }
      }))

/**
 * @see https://www.npmjs.com/package/mssql#es6-tagged-template-literals
 */
export const query = sql.query
