import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postLogin } from '../../services/slices/user'

import styles from './index.module.css'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const dispatch = useDispatch()
  const { isLoginned } = useSelector(store => store.user)
  const history = useHistory()

  const onClick = () => {
    dispatch(postLogin({ email, password }))
  }

  useEffect(() => {
    if (isLoginned) {
      history.push('/')
    }
  }, [history, isLoginned])

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
      <p className={styles.title}>Вход</p>
      <div className={styles.inputWrapper}>
        <Input
          type={'text'}
          placeholder={'E-mail'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'email'}
          // error={false}
          // ref={inputRef}
          // errorText={'Ошибка'}
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
          // error={false}
          // ref={inputRef}
          // errorText={'Ошибка'}
          size={'default'}
        />
      </div>
      <div className={styles.button}>
        <Button type="primary" size="small" onClick={onClick}>
          Войти
        </Button>
      </div>
      <div className={styles.linkBlock}>
        <p>Вы — новый пользователь? </p>
        <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
      </div>
      <div className={styles.linkBlock}>
        <p>Забыли пароль? </p>
        <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
      </div>
    </div>
  )
}
