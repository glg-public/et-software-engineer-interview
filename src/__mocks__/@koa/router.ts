class Router {
  static mockedConstructor = jest.fn()
  static mockedUse = jest.fn()
  static mockedPost = jest.fn()
  static mockedGet = jest.fn()
  static mockedPrefix = jest.fn()
  static mockedAll = jest.fn()

  constructor(...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Router.mockedConstructor(...args)
  }

  use = Router.mockedUse
  post = Router.mockedPost
  get = Router.mockedGet
  prefix = Router.mockedPrefix
  all = Router.mockedAll
}

export default Router
