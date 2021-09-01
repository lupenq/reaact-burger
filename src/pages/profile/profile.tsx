import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useEffect, FC, FormEvent } from 'react'
import styles from './index.module.css'
import { ProfileNav } from '../../components/profile-nav/profile-nav'
import { changeUserData } from '../../services/slices/user'
import { useAppDispatch, useAppSelector } from '../../services/store'

export const ProfilePage: FC = () => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const [editable, setEditable] = useState(false)

  const dispatch = useAppDispatch()

  const { email, name } = useAppSelector(store => store.user.user) || {}

  useEffect(() => {
    setNameValue(name || '')
    setEmailValue(email || '')
  }, [email, name])

  const onCancel = () => {
    setEditable(false)
    setNameValue(name || '')
    setEmailValue(email || '')
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(changeUserData({ name: nameValue, email: emailValue }))
    setEditable(false)
  }

  return (
    <div className={styles.root}>
      <ProfileNav />
      <div className={styles.content}>
        <form onSubmit={onSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={e => setNameValue(e.target.value)}
              value={nameValue}
              name={'name'}
              disabled={!editable}
              onIconClick={() => !editable && setEditable(!editable)}
              icon={'EditIcon'}
              size={'default'}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={'text'}
              placeholder={'Логин'}
              onChange={e => setEmailValue(e.target.value)}
              value={emailValue}
              name={'login'}
              disabled={!editable}
              onIconClick={() => !editable && setEditable(!editable)}
              icon={'EditIcon'}
              size={'default'}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={e => setPasswordValue(e.target.value)}
              value={passwordValue}
              name={'password'}
              disabled={!editable}
              onIconClick={() => !editable && setEditable(!editable)}
              icon={'EditIcon'}
              size={'default'}
            />
          </div>
          {editable && <div className={styles.buttons}>
            <Button type="secondary" size="small" onClick={onCancel}>
              Отмена
            </Button>
            <Button type="primary" size="small">
              Сохранить
            </Button>
          </div>}
        </form>
      </div>
    </div>
  )
}
