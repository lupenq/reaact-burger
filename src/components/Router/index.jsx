import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import Main from '../main/main'
import Loader from 'react-loader-spinner'
import styles from './index.module.css'
import { useSelector } from 'react-redux'
import { ProtectedRoute } from '../protected-route/protected-route'

import { LoginPage } from '../../pages/login/login'
import { RegisterPage } from '../../pages/register/register'
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password'
import { ResetPasswordPage } from '../../pages/reset-password/reset-password'
import { ProfilePage } from '../../pages/profile/profile'
import { IngridientPage } from '../../pages/ingridient/ingridient'
import { LogoutPage } from '../../pages/logout/logout'
import Modal from '../modal/modal'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'

export function Router () {
  const {
    ingridientsRequest,
    requestError,
    requestSuccess,
    items
  } = useSelector(({ ingridients }) => ingridients)

  const location = useLocation()
  const history = useHistory()

  const background = location.state && location.state.background

  const { loadUserRequest } = useSelector(({ user }) => user)
  return (
    <>
          <div className={styles.mainContent}>
        {
          ingridientsRequest || loadUserRequest
            ? <Loader type={'Oval'} color={'#00BFFF'} />
            : requestError
              ? <h1>Error</h1>
              : requestSuccess && (
                  <Switch location={background || location}>
                    <Route path={'/login'} exact>
                      <LoginPage />
                    </Route>
                    <Route path={'/logout'} exact>
                      <LogoutPage />
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
      {background && <ProtectedRoute path="/ingridients/:id" children={<Modal handleClose={() => history.push('/')} title={'Детали ингридиента'}>
        <IngredientDetails />
      </Modal>} />}
      </>
  )
}
