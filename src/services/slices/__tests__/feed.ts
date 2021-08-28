import reducer, {
  wsOpenConnection,
  wsSuccess,
  wsError,
  wsClose,
  wsRes
} from '../feed'

const initialState = {
  total: '',
  totalToday: '',
  orders: [],
  wsConnected: false,
  wsLoading: false,
  wsError: false
}

const testFeed = {
  orders: [
    {
      _id: '612a004615024d001b9d0e11',
      ingredients: [
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733c7',
        '60d3b41abdacab0026a733c7'
      ],
      status: 'done',
      name: 'Бессмертный люминесцентный флюоресцентный бургер',
      createdAt: '2021-08-28T09:22:14.416Z',
      updatedAt: '2021-08-28T09:22:14.470Z',
      number: 2326
    },
    {
      _id: '6129ffca15024d001b9d0e10',
      ingredients: [
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c9',
        '60d3b41abdacab0026a733c7',
        '60d3b41abdacab0026a733c7'
      ],
      status: 'done',
      name: 'Бессмертный люминесцентный флюоресцентный бургер',
      createdAt: '2021-08-28T09:20:10.725Z',
      updatedAt: '2021-08-28T09:20:10.816Z',
      number: 2325
    }
  ],
  total: 1000,
  totalToday: 11
}
describe('feed', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('wsOpenConnection', () => {
    const reduce = reducer(initialState, wsOpenConnection(null))

    const result = {
      ...initialState,
      wsConnected: false,
      wsLoading: true,
      wsError: false
    }

    expect(reduce).toEqual(result)
  })

  it('wsSuccess', () => {
    const reduce = reducer(initialState, wsSuccess())

    const result = {
      ...initialState,
      wsConnected: true,
      wsLoading: false,
      wsError: false
    }

    expect(reduce).toEqual(result)
  })

  it('wsError', () => {
    const reduce = reducer(initialState, wsError())

    const result = {
      ...initialState,
      wsConnected: false,
      wsLoading: false,
      wsError: true
    }

    expect(reduce).toEqual(result)
  })

  it('wsClose', () => {
    const reduce = reducer(initialState, wsClose())

    expect(reduce).toEqual(initialState)
  })

  it('wsRes success true', () => {
    const reduce = reducer(initialState, wsRes({ ...testFeed, success: true }))

    const result = {
      ...testFeed,
      wsConnected: false,
      wsLoading: false,
      wsError: false
    }

    expect(reduce).toEqual(result)
  })

  it('wsRes success false', () => {
    const reduce = reducer(initialState, wsRes({ ...testFeed, success: false }))

    const result = {
      ...initialState,
      wsConnected: false,
      wsLoading: false,
      wsError: true
    }

    expect(reduce).toEqual(result)
  })
})
