import { FC, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { postLogout } from '../../services/slices/user'
import { useAppDispatch, useAppSelector } from '../../services/store'

export const LogoutPage: FC = () => {
  const dispatch = useAppDispatch()
  const { logoutRequestSuccess } = useAppSelector(store => store.user)

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
