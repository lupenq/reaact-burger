import { Route, Switch, useLocation, useHistory } from 'react-router-dom'
import Main from '../main/main'
import Loader from 'react-loader-spinner'
import styles from './index.module.css'
import { ProtectedRoute } from '../protected-route/protected-route'

import { LoginPage } from '../../pages/login/login'
import { RegisterPage } from '../../pages/register/register'
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password'
import { ResetPasswordPage } from '../../pages/reset-password/reset-password'
import { ProfilePage } from '../../pages/profile/profile'
import { IngridientPage } from '../../pages/ingridient/ingridient'
import { LogoutPage } from '../../pages/logout/logout'
import { FeedPage } from '../../pages/feed/feed'
import { FeedItemPage } from '../../pages/feed-item/feed-item'
import { ProfileOrdersPage } from '../../pages/profile-orders/profile-orders'
import Modal from '../modal/modal'
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details'
import { useAppSelector } from '../../services/store'
import { FC } from 'react'
import * as H from 'history'

export const Router: FC = () => {
  const {
    ingridientsRequest,
    requestError,
    requestSuccess,
    items
  } = useAppSelector(({ ingridients }) => ingridients)

  const location = useLocation<{ background?: H.Location }>()
  const history = useHistory()

  const background = history.action === 'PUSH' && location && location.state && location.state.background

  const { loadUserRequest } = useAppSelector(({ user }) => user)
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
                    <ProtectedRoute path={'/profile/orders'} exact>
                      <ProfileOrdersPage />
                    </ProtectedRoute>
                    <ProtectedRoute path={'/profile/orders/:id'} exact>
                      <FeedItemPage isOrderPage={true} />
                    </ProtectedRoute>
                    <Route path={'/feed'} exact>
                      <FeedPage />
                    </Route>
                    <Route path={'/feed/:id'} exact>
                      <FeedItemPage isOrderPage={false} />
                    </Route>
                    <Route path={'/ingridients/:id'} exact>
                      <IngridientPage />
                    </Route>
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
      {background && <Route path="/ingridients/:id" children={<Modal handleClose={() => history.push('/')} title={'Детали ингридиента'}>
        <IngredientDetails />
      </Modal>} />}
      {background && <Route path="/feed/:id" children={<Modal handleClose={() => history.push('/feed')}>
        <FeedItemPage isOrderPage={false} />
      </Modal>} />}
      {background && <Route path="/profile/orders/:id" children={<Modal handleClose={() => history.push('/profile/orders')}>
        <FeedItemPage isOrderPage={true} />
      </Modal>} />}
      </>
  )
}
