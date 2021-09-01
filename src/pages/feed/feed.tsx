import { FC, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import FeedList from '../../components/feed-list/feed-list'
import FeedStat from '../../components/feed-stat/feed-stat'
import { wsOpenConnection, wsClose } from '../../services/slices/feed'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { WS_API_URL } from '../../utils/constants'
import styles from './index.module.css'

export const FeedPage: FC = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(store => store.feed.orders)

  useEffect(() => {
    dispatch(
      wsOpenConnection({
        url: `${WS_API_URL}/all`
      })
    )

    return () => {
      dispatch(wsClose())
    }
  }, [dispatch])

  return (
    orders.length
      ? <main className={styles.root}>
      <h1 className={styles.title}>Лента заказов</h1>
      <article className={styles.content}>
        <FeedList isOrderPage={false} />
        <FeedStat />
      </article>
    </main>
      : <Loader type={'Circles'} />
  )
}
