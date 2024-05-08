const connect = jest.fn().mockResolvedValue(undefined)

const query = jest.fn().mockResolvedValue([] as any)

module.exports = {
  connect,
  query
}
