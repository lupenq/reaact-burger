import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router'
import { postForgotPassword, resetForgotRequest } from '../../services/slices/user'

import styles from './index.module.css'
import { useAppSelector, useAppDispatch } from '../../services/store'

export const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState('')
  const { forgotRequestSuccess } = useAppSelector(store => store.user)

  const dispatch = useAppDispatch()
  const { isLoginned } = useAppSelector(store => store.user)

  const history = useHistory()

  const onClick = () => {
    dispatch(postForgotPassword(email))
  }

  useEffect(() => {
    if (forgotRequestSuccess) {
      history.push('/reset-password', { isForgot: true })
    }
  }, [email, forgotRequestSuccess, history])

  useEffect(() => {
    return () => {
      dispatch(resetForgotRequest())
    }
  }, [])

  if (isLoginned) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    )
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>Восстановление пароля</p>
      <div className={styles.inputWrapper}>
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'login'}
          size={'default'}
        />
      </div>
      <div className={styles.button}>
        <Button type="primary" size="small" onClick={onClick}>
          Восстановить
        </Button>
      </div>
      <div className={styles.linkBlock}>
        <p>Вспомнили пароль?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
  )
}
