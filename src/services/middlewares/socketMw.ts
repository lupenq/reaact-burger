import {
  wsOpenConnection,
  wsError,
  wsClose,
  wsRes,
  wsSuccess
} from '../slices/feed'
import { getCookie } from '../utils'
import { MiddlewareAPI, AnyAction } from 'redux'

const wsMiddleware = () => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null
    return (next: (a: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store
      const { type, payload } = action

      if (type === wsOpenConnection.type) {
        if (payload.personal) {
          const accessToken = getCookie('accessToken')
          socket = new WebSocket(payload.url + `?token=${accessToken}`)
        } else {
          socket = new WebSocket(payload.url)
        }
      }

      if (type === wsClose.type) {
        socket && socket.close()
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsSuccess())
        }

        socket.onmessage = event => {
          const { data } = event
          const parsedData = JSON.parse(data)
          dispatch(wsRes(parsedData))
        }

        socket.onerror = () => {
          dispatch(wsError())
        }

        socket.onclose = () => {
          dispatch(wsClose())
        }
      }
      next(action)
    }
  }
}

export default wsMiddleware
