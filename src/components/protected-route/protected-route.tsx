import { FC } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAppSelector } from '../../services/store'

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { accessToken, user } = useAppSelector(store => store.user)

  if (!accessToken && !user?.name) {
    return (
      <Route
        {...rest}
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )}
      />
    )
  }

  return (
    <Route
      {...rest}
      render={() => children}
    />
  )
}
