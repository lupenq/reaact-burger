import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { postResetPassword } from '../../services/slices/user'

import styles from './index.module.css'

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState('')
  const [token, settoken] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { resetRequestSuccess } = useSelector(store => store.user)

  const dispatch = useDispatch()
  const { isLoginned } = useSelector(store => store.user)

  const history = useHistory()

  const onClick = () => {
    dispatch(postResetPassword({ token, password }))
  }

  useEffect(() => {
    if (resetRequestSuccess) {
      history.push('/login', undefined)
    }
  }, [history, resetRequestSuccess])

  useEffect(() => {
    history.action === 'POP' && history.replace()
  }, [])

  if (isLoginned || !history.location?.state?.isForgot) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: undefined
        }}
      />
    )
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>Восстановление пароля</p>
      <div className={styles.inputWrapper}>
        <Input
          type={passwordVisible ? 'text' : 'password'}
          placeholder={'Пароль'}
          onChange={e => setPassword(e.target.value)}
          value={password}
          name={'password'}
          onIconClick={() => setPasswordVisible(!passwordVisible)}
          icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
          // error={false}
          // ref={inputRef}
          // errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={styles.inputWrapper}>
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={e => settoken(e.target.value)}
          value={token}
          name={'token'}
          // error={false}
          // ref={inputRef}
          // errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={styles.button}>
        <Button type="primary" size="small" onClick={onClick}>
          Сохранить
        </Button>
      </div>
      <div className={styles.linkBlock}>
        <p>Вспомнили пароль?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
  )
}
