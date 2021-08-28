import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, useEffect, useState } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom'
import { postRegister } from '../../services/slices/user'
import styles from './index.module.css'
import { useAppDispatch, useAppSelector } from '../../services/store'

export const RegisterPage: FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const history = useHistory()

  const dispatch = useAppDispatch()
  const { isLoginned } = useAppSelector(store => store.user)

  const onClick = () => {
    dispatch(postRegister({ name, email, password }))
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
      <p className={styles.title}>Регистрация</p>
      <div className={styles.inputWrapper}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={e => setName(e.target.value)}
          value={name}
          name={'name'}
          size={'default'}
        />
      </div>
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
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.linkBlock}>
        <p>Уже зарегистрированы?</p>
        <Link className={styles.link} to='/login'>Войти</Link>
      </div>
    </div>
  )
}
