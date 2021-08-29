import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect, useState, FormEvent } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router'
import { postResetPassword } from '../../services/slices/user'

import styles from './index.module.css'
import { useAppSelector, useAppDispatch } from '../../services/store'

interface IUseHistory {
  isForgot?: boolean
}

export const ResetPasswordPage: FC = () => {
  const [password, setPassword] = useState('')
  const [token, settoken] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const { resetRequestSuccess } = useAppSelector(store => store.user)

  const dispatch = useAppDispatch()
  const { isLoginned } = useAppSelector(store => store.user)

  const history = useHistory<IUseHistory>()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(postResetPassword({ token, password }))
  }

  useEffect(() => {
    if (resetRequestSuccess) {
      history.push('/login', undefined)
    }
  }, [history, resetRequestSuccess])

  useEffect(() => {
    history.action === 'POP' && history.replace({})
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
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.inputWrapper}>
          <Input
            type={passwordVisible ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={e => setPassword(e.target.value)}
            value={password}
            name={'password'}
            onIconClick={() => setPasswordVisible(!passwordVisible)}
            icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
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
            size={'default'}
          />
        </div>
        <div className={styles.button}>
          <Button type="primary" size="small">
            Сохранить
          </Button>
        </div>
      </form>
      <div className={styles.linkBlock}>
        <p>Вспомнили пароль?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
  )
}
