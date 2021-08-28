import reducer, {
  forgotSuccess,
  forgotError,
  forgotRequest,
  resetForgotRequest,
  resetRequest,
  resetError,
  resetSuccess,
  registerRequest,
  registerError,
  registerSuccess,
  loginRequest,
  loginError,
  loginSuccess,
  logoutRequest,
  logoutError,
  logoutSuccess,
  userLoadSuccess,
  loadUserRequest,
  loadUserSuccess,
  loadUserError
} from '../user'

const initialState = {
  forgotRequest: false,
  forgotRequestError: false,
  forgotRequestSuccess: false,

  resetRequest: false,
  resetRequestError: false,
  resetRequestSuccess: false,

  registerRequest: false,
  registerRequestError: false,
  registerRequestSuccess: false,

  loginRequestSuccess: false,
  loginRequest: false,
  loginRequestError: false,

  logoutRequestSuccess: false,
  logoutRequest: false,
  logoutRequestError: false,

  loadUserRequest: false,

  isLoginned: false,
  user: null,
  accessToken: '',
  refreshToken: ''
}

const USER = {
  email: 'test@test.test',
  name: 'test test'
}

describe('user', () => {
  it('initialState', () =>
    expect(reducer(undefined, { type: '__TEST__' })).toEqual(initialState))

  it('forgotSuccess', () => {
    const reduce = reducer(initialState, forgotSuccess({ success: true }))

    const result = {
      ...initialState,
      forgotRequestSuccess: true,
      forgotRequest: false,
      forgotRequestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('forgotError', () => {
    const reduce = reducer(initialState, forgotError())

    const result = {
      ...initialState,
      forgotRequest: false,
      forgotRequestError: true
    }

    expect(reduce).toEqual(result)
  })

  it('forgotRequest', () => {
    const reduce = reducer(initialState, forgotRequest())

    const result = {
      ...initialState,
      forgotRequest: true
    }

    expect(reduce).toEqual(result)
  })

  it('resetForgotRequest', () => {
    const reduce = reducer(initialState, resetForgotRequest())

    const result = {
      ...initialState,
      forgotRequestSuccess: false,
      forgotRequest: false,
      forgotRequestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('resetRequest', () => {
    const reduce = reducer(initialState, resetRequest())

    const result = {
      ...initialState,
      resetRequest: true
    }

    expect(reduce).toEqual(result)
  })

  it('resetError', () => {
    const reduce = reducer(initialState, resetError())

    const result = {
      ...initialState,
      resetRequest: false,
      resetRequestError: true
    }

    expect(reduce).toEqual(result)
  })

  it('resetSuccess', () => {
    const reduce = reducer(initialState, resetSuccess({ success: true }))

    const result = {
      ...initialState,
      resetRequestSuccess: true,
      resetRequest: false,
      resetRequestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('registerRequest', () => {
    const reduce = reducer(initialState, registerRequest())

    const result = {
      ...initialState,
      registerRequest: true
    }

    expect(reduce).toEqual(result)
  })

  it('registerError', () => {
    const reduce = reducer(initialState, registerError())

    const result = {
      ...initialState,
      registerRequest: false,
      registerRequestError: true
    }

    expect(reduce).toEqual(result)
  })

  it('registerSuccess', () => {
    const reduce = reducer(initialState, registerSuccess({
      user: USER,
      accessToken: '123',
      refreshToken: '456',
      success: true
    }))

    const result = {
      ...initialState,
      isLoginned: true,
      user: USER,
      accessToken: '123',
      refreshToken: '456',
      registerRequestSuccess: true,
      registerRequest: false,
      registerRequestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('loginRequest', () => {
    const reduce = reducer(initialState, loginRequest())

    const result = {
      ...initialState,
      loginRequest: true
    }

    expect(reduce).toEqual(result)
  })

  it('loginError', () => {
    const reduce = reducer(initialState, loginError())

    const result = {
      ...initialState,
      loginRequest: false,
      loginRequestError: true
    }

    expect(reduce).toEqual(result)
  })

  it('loginSuccess', () => {
    const reduce = reducer(initialState, loginSuccess(
      {
        user: USER,
        accessToken: '123',
        refreshToken: '456',
        success: true
      }
    ))

    const result = {
      ...initialState,
      isLoginned: true,
      user: USER,
      accessToken: '123',
      refreshToken: '456',
      loginRequestSuccess: true,
      loginRequest: false,
      loginRequestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('logoutRequest', () => {
    const reduce = reducer(initialState, logoutRequest())

    const result = {
      ...initialState,
      logoutRequest: true
    }

    expect(reduce).toEqual(result)
  })

  it('logoutError', () => {
    const reduce = reducer(initialState, logoutError())

    const result = {
      ...initialState,
      logoutRequest: false,
      logoutRequestError: true
    }

    expect(reduce).toEqual(result)
  })

  it('logoutSuccess', () => {
    const reduce = reducer(initialState, logoutSuccess())

    const result = {
      ...initialState,
      isLoginned: false,
      user: null,
      accessToken: '',
      refreshToken: '',
      logoutRequestSuccess: true,
      logoutRequest: false,
      logoutRequestError: false
    }

    expect(reduce).toEqual(result)
  })

  it('userLoadSuccess', () => {
    const reduce = reducer(initialState, userLoadSuccess({ user: USER }))

    const result = {
      ...initialState,
      isLoginned: true,
      loadUserRequest: false,
      user: USER
    }

    expect(reduce).toEqual(result)
  })

  it('loadUserRequest', () => {
    const reduce = reducer(initialState, loadUserRequest())

    const result = {
      ...initialState,
      loadUserRequest: true
    }

    expect(reduce).toEqual(result)
  })
  it('loadUserSuccess', () => {
    const reduce = reducer(initialState, loadUserSuccess())

    const result = {
      ...initialState,
      loadUserRequest: false
    }

    expect(reduce).toEqual(result)
  })
  it('loadUserError', () => {
    const reduce = reducer(initialState, loadUserError())

    const result = {
      ...initialState,
      loadUserError: true
    }

    expect(reduce).toEqual(result)
  })
})
