import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie, fetchWithRefresh } from '../utils'

export const userSlice = createSlice({
  name: 'order',
  initialState: {
    forgotRequest: false,
    forgotRequestError: false,
    forgotRequestSuccess: false,
    isForgotPassword: false,

    resetRequest: false,
    resetRequestError: false,
    resetRequestSuccess: false,

    registerRequest: false,
    registerRequestError: false,
    registerRequestSuccess: false,

    loginRequestSuccess: false,
    loginRequest: false,
    loginRequestError: false,

    loadUserRequest: false,

    isLoginned: false,
    user: {},
    accessToken: '',
    refreshToken: ''
  },
  reducers: {
    forgotRequest: state => ({ ...state, forgotRequest: true }),
    forgotError: state => ({ ...state, forgotRequest: false, forgotRequestError: true }),
    forgotSuccess: (state, action) => ({
      ...state,
      isForgotPassword: true,
      forgotRequestSuccess: action.payload.success,
      forgotRequest: false,
      forgotRequestError: false
    }),

    resetRequest: state => ({ ...state, resetRequest: true }),
    resetError: state => ({ ...state, resetRequest: false, resetRequestError: true }),
    resetSuccess: (state, action) => ({
      ...state,
      resetRequestSuccess: action.payload.success,
      resetRequest: false,
      resetRequestError: false
    }),

    registerRequest: state => ({ ...state, registerRequest: true }),
    registerError: state => ({ ...state, registerRequest: false, registerRequestError: true }),
    registerSuccess: (state, action) => ({
      ...state,
      isLoginned: true,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      registerRequestSuccess: action.payload.success,
      registerRequest: false,
      registerRequestError: false
    }),

    loginRequest: state => ({ ...state, loginRequest: true }),
    loginError: state => ({ ...state, loginRequest: false, loginRequestError: true }),
    loginSuccess: (state, action) => ({
      ...state,
      isLoginned: true,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
      refreshToken: action.payload.refreshToken,
      loginRequestSuccess: action.payload.success,
      loginRequest: false,
      loginRequestError: false
    }),

    userLoadSuccess: (state, action) => ({
      ...state,
      isLoginned: true,
      user: action.payload.user
    }),
    loadUserRequest: state => ({ ...state, loadUserRequest: true }),
    loadUserSuccess: state => ({ ...state, loadUserRequest: false })
  }
})

export const {
  forgotSuccess,
  forgotError,
  forgotRequest,
  resetRequest,
  resetError,
  resetSuccess,
  registerRequest,
  registerError,
  registerSuccess,
  loginRequest,
  loginError,
  loginSuccess,
  userLoadSuccess,
  loadUserRequest,
  loadUserSuccess
} = userSlice.actions

export const postForgotPassword = email => dispatch => {
  dispatch(forgotRequest())
  fetch('https://norma.nomoreparties.space/api/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      dispatch(forgotSuccess(data))
    })
    .catch(() => {
      dispatch(forgotError())
    })
}

export const postResetPassword = data => dispatch => {
  dispatch(resetRequest())
  fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      dispatch(resetSuccess(data))
    })
    .catch(() => {
      dispatch(resetError())
    })
}

export const loadUserData = () => dispatch => {
  dispatch(loadUserRequest())
  fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
    .then(data => {
      dispatch(userLoadSuccess(data))
    })
    .finally(() => {
      dispatch(loadUserSuccess())
    })
}

export const changeUserData = data => dispatch => {
  fetchWithRefresh('https://norma.nomoreparties.space/api/auth/user', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
    .then(data => {
      dispatch(userLoadSuccess(data))
    })
    .finally(() => {
      dispatch(loadUserSuccess())
    })
}

export const postRegister = data => dispatch => {
  dispatch(registerRequest())
  fetch('https://norma.nomoreparties.space/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      if (data.accessToken) {
        setCookie('accessToken', data.accessToken.split('Bearer ')[1])
      }

      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }

      dispatch(registerSuccess(data))
    })
    .catch(() => {
      dispatch(registerError())
    })
}

export const postLogin = data => dispatch => {
  dispatch(loginRequest())
  fetch('https://norma.nomoreparties.space/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      if (data.accessToken) {
        setCookie('accessToken', data.accessToken.split('Bearer ')[1])
      }

      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }

      dispatch(loginSuccess(data))
    })
    .catch(() => {
      dispatch(loginError())
    })
}

export default userSlice.reducer
