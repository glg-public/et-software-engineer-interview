import { StatusCodes } from 'http-status-codes'

export type HttpError = Error & { httpStatusCode: StatusCodes }
