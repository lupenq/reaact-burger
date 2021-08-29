import { createSlice } from '@reduxjs/toolkit'
import { BASE_API_URL } from '../../utils/constants'
import { AppDispatch, AppThunk } from '../store'
import { getCookie, setCookie, fetchWithRefresh } from '../utils'

interface IUserSliceState {
    forgotRequest: boolean
    forgotRequestError: boolean
    forgotRequestSuccess: boolean

    resetRequest: boolean
    resetRequestError: boolean
    resetRequestSuccess: boolean

    registerRequest: boolean
    registerRequestError: boolean
    registerRequestSuccess: boolean

    loginRequestSuccess: boolean
    loginRequest: boolean
    loginRequestError: boolean

    logoutRequestSuccess: boolean
    logoutRequest: boolean
    logoutRequestError: boolean

    loadUserRequest: boolean

    isLoginned: boolean,
    user: {
      name: string,
      email: string
    } | null,
    accessToken: string,
    refreshToken: string
}

const initialState: IUserSliceState = {
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

export const userSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    forgotRequest: state => ({ ...state, forgotRequest: true }),
    resetForgotRequest: state => ({
      ...state,
      forgotRequestSuccess: false,
      forgotRequest: false,
      forgotRequestError: false
    }),
    forgotError: state => ({ ...state, forgotRequest: false, forgotRequestError: true }),
    forgotSuccess: (state, action) => ({
      ...state,
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

    logoutRequest: state => ({ ...state, logoutRequest: true }),
    logoutError: state => ({ ...state, logoutRequest: false, logoutRequestError: true }),
    logoutSuccess: (state) => ({
      ...state,
      isLoginned: false,
      user: null,
      accessToken: '',
      refreshToken: '',
      logoutRequestSuccess: true,
      logoutRequest: false,
      logoutRequestError: false
    }),

    userLoadSuccess: (state, action) => ({
      ...state,
      isLoginned: true,
      loadUserRequest: false,
      user: action.payload.user
    }),
    loadUserRequest: state => ({ ...state, loadUserRequest: true }),
    loadUserSuccess: state => ({ ...state, loadUserRequest: false }),
    loadUserError: state => ({ ...state, loadUserError: true })
  }
})

export const {
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
} = userSlice.actions

export const postForgotPassword = (email: string): AppThunk => (dispatch: AppDispatch) => {
  dispatch(forgotRequest())
  fetch(`${BASE_API_URL}/password-reset`, {
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

export const postResetPassword = (data: { token: string; password: string }): AppThunk => (dispatch: AppDispatch) => {
  dispatch(resetRequest())
  fetch(`${BASE_API_URL}/password-reset/reset`, {
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

export const loadUserData = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loadUserRequest())
  fetchWithRefresh(`${BASE_API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
    .then(data => {
      dispatch(userLoadSuccess(data))
    })
    .catch(e => loadUserError())
    .finally(() => {
      dispatch(loadUserSuccess())
    })
}

export const changeUserData = (data: { name: string; email: string }): AppThunk => (dispatch: AppDispatch) => {
  fetchWithRefresh(`${BASE_API_URL}/auth/user`, {
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

export const postRegister = (data: { name: string; email: string; password: string }): AppThunk => (dispatch: AppDispatch) => {
  dispatch(registerRequest())
  fetch(`${BASE_API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      if (data.accessToken) {
        setCookie('accessToken', data.accessToken.split('Bearer ')[1], { path: '/' })
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

export const postLogin = (data: { email: string; password: string }): AppThunk => (dispatch: AppDispatch) => {
  dispatch(loginRequest())
  fetch(`${BASE_API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...data })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
      if (data.accessToken) {
        setCookie('accessToken', data.accessToken.split('Bearer ')[1], { path: '/' })
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

export const postLogout = (): AppThunk => (dispatch: AppDispatch) => {
  dispatch(logoutRequest())
  fetch(`${BASE_API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
  })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(() => {
      dispatch(logoutSuccess())
      localStorage.removeItem('refreshToken')
      setCookie('accessToken', '', { 'max-age': -1 })
    })
    .catch(() => {
      dispatch(logoutError())
    })
}

export default userSlice.reducer
