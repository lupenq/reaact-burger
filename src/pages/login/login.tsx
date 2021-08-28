import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { postLogin } from '../../services/slices/user'
import { useAppDispatch, useAppSelector } from '../../services/store'
import styles from './index.module.css'

type LocationState = {
  from: {
    pathname: string;
  }
}

export const LoginPage: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const dispatch = useAppDispatch()
  const { isLoginned } = useAppSelector(store => store.user)
  const location = useLocation()

  const onClick = () => {
    dispatch(postLogin({ email, password }))
  }

  if (isLoginned) {
    const { from } = location.state as LocationState || { from: { pathname: '/' } }

    return (
      <Redirect
        to={from}
      />
    )
  }

  return (
    <div className={styles.root}>
      <p className={styles.title}>Вход</p>
      <div className={styles.inputWrapper}>
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'email'}
          size={'default'}
        />
      </div>
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
      <div className={styles.button}>
        <Button type="primary" size="small" onClick={onClick}>
          Войти
        </Button>
      </div>
      <div className={styles.linkBlock}>
        <p>Вы — новый пользователь? </p>
        <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
      </div>
      <div className={styles.linkBlock}>
        <p>Забыли пароль? </p>
        <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
      </div>
    </div>
  )
}
