import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function ProtectedRoute ({ children, ...rest }) {
  const { accessToken, user } = useSelector(store => store.user)

  if (!accessToken && !user.name) {
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
      render={({ location }) => children}
    />
  )
}
