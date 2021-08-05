import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postLogout } from '../../services/slices/user'

export const LogoutPage = () => {
  const dispatch = useDispatch()
  const { logoutRequestSuccess } = useSelector(store => store.user)

  const history = useHistory()

  useEffect(() => {
    dispatch(postLogout())
  }, [])

  useEffect(() => {
    logoutRequestSuccess && history.push('/', {})
  }, [history,
    logoutRequestSuccess])

  return (
    <>
      <h1>Выходим...</h1>
      {
        logoutRequestSuccess && <Redirect to='/' />
      }
    </>
  )
}
