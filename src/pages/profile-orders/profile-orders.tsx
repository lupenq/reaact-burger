import { FC, useEffect } from 'react'
import styles from './index.module.css'
import FeedList from '../../components/feed-list/feed-list'
import { ProfileNav } from '../../components/profile-nav/profile-nav'
import { wsOpenConnection, wsClose } from '../../services/slices/feed'
import { useAppDispatch } from '../../services/store'
import { WS_API_URL } from '../../utils/constants'

export const ProfileOrdersPage: FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      wsOpenConnection({
        url: `${WS_API_URL}/orders`,
        personal: true
      })
    )

    return () => {
      dispatch(wsClose())
    }
  }, [dispatch])

  return (
    <div className={styles.root}>
      <ProfileNav />
      <div className={styles.content}>
        <FeedList isOrderPage={true} />
      </div>
    </div>
  )
}
