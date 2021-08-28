import { FC } from 'react'
import { useAppSelector } from '../../services/store'
import styles from './index.module.css'

const FeedStat: FC = () => {
  const feed = useAppSelector(store => store.feed)

  const doneOrders = feed.orders
    .filter(item => item.status === 'done')
    .slice(0, 20)
  const inWorkOrders = feed.orders
    .filter(item => item.status === 'created')
    .slice(0, 20)

  return (
    <div className={styles.root}>
      <div className={styles.ordersStat}>
        <div className={styles.readyWrap}>
          <span className={styles.title}>Готовы:</span>
          <div className={styles.readies}>
            {doneOrders.map(el => {
              return <p key={el._id} className={styles.ready}>{el.number}</p>
            })}
          </div>
        </div>
        <div className={styles.inWorkWrap}>
          <span className={styles.title}>В работе:</span>
          <div className={styles.inWorks}>
            {inWorkOrders.map(el => {
              return <p key={el._id} className={styles.inWork}>{el.number}</p>
            })}
          </div>
        </div>
      </div>
      <div className={styles.doneAllTimeWrap}>
        <span className={styles.title}>Выполнено за все время:</span>
        <span className={styles.bigNumber}>{feed.total}</span>
      </div>
      <div className={styles.doneTodayWrap}>
        <span className={styles.title}>Выполнено за сегодня:</span>
        <span className={styles.bigNumber}>{feed.totalToday}</span>
      </div>
    </div>
  )
}

export default FeedStat
