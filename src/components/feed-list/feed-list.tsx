import { FC } from 'react'
import { useAppSelector } from '../../services/store'
import FeedItem from './feed-item/feed-item'
import styles from './index.module.css'

const FeedList: FC<{isOrderPage: boolean}> = ({ isOrderPage }) => {
  const orders = useAppSelector((store) => store.feed.orders)

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {orders.map(order => (
          <FeedItem isOrderPage={isOrderPage} key={order._id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default FeedList
