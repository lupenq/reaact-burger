import { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AppHeader from '../app-header/app-header'
import Main from '../main/main'
import Loader from 'react-loader-spinner'
import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getIngridients } from '../../services/slices/ingridients'
import { loadUserData } from '../../services/slices/user'
import { ProtectedRoute } from '../protected-route/protected-route'

import { LoginPage } from '../../pages/login/login'
import { RegisterPage } from '../../pages/register/register'
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password'
import { ResetPasswordPage } from '../../pages/reset-password/reset-password'
import { ProfilePage } from '../../pages/profile/profile'
import { IngridientPage } from '../../pages/ingridient/ingridient'
// import { getCookie, fetchWithRefresh } from '../../services/utils'

function App () {
  const dispatch = useDispatch()

  const {
    ingridientsRequest,
    requestError,
    requestSuccess,
    items
  } = useSelector(({ ingridients }) => ingridients)

  const { loadUserRequest } = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(getIngridients())
    dispatch(loadUserData())
  }, [dispatch])

  return (

    <BrowserRouter>
      <AppHeader />
      <div className={styles.mainContent}>
        {
          ingridientsRequest || loadUserRequest
            ? <Loader type={'Oval'} color={'#00BFFF'} />
            : requestError
              ? <h1>Error</h1>
              : requestSuccess && (
                  <Switch>
                    <Route path={'/login'} exact>
                      <LoginPage />
                    </Route>
                    <Route path={'/register'} exact>
                      <RegisterPage />
                    </Route>
                    <Route path={'/forgot-password'} exact>
                      <ForgotPasswordPage />
                    </Route>
                    <Route path={'/reset-password'} exact>
                      <ResetPasswordPage />
                    </Route>
                    <ProtectedRoute path={'/profile'} exact>
                      <ProfilePage />
                    </ProtectedRoute>
                    <ProtectedRoute path={'/ingridients/:id'} exact>
                      <IngridientPage />
                    </ProtectedRoute>
                    <Route path={'/'} exact>
                      <Main data={items} />
                    </Route>
                    <Route >
                      <h1>404</h1>
                    </Route>
                    </Switch>
              )
            }
      </div>
    </BrowserRouter>
  )
}

export default App
