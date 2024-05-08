class Koa {
  static mockedConstructor = jest.fn()
  static mockedUse = jest.fn()

  constructor(...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Koa.mockedConstructor(...args)
  }

  use = Koa.mockedUse
}

export default Koa
