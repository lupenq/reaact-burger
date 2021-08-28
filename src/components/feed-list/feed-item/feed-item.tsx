import { FC } from 'react'
import styles from './index.module.css'
import { useLocation, Link } from 'react-router-dom'
import IngredientImages from './ingridient-images/ingridient-images'
import { setCurrentOrder } from '../../../services/slices/currentOrder'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector, useAppDispatch } from '../../../services/store'
import { IFeedOrder } from '../../../interfaces'

interface IFeedItem {
  order: IFeedOrder
  isOrderPage: boolean
}

const FeedItem: FC<IFeedItem> = ({ order, isOrderPage }) => {
  const allIngredients = useAppSelector(({ ingridients }) => ingridients.items)

  const dispatch = useAppDispatch()
  const location = useLocation()

  const currentCost = order.ingredients.reduce((accumulator: number, el) => {
    const newPrice = allIngredients.find(item => item._id === el)?.price || 0
    return accumulator + newPrice
  }, 0)

  const onClick = () => {
    dispatch(setCurrentOrder(order))
  }

  const getStatus = () => {
    switch (order.status) {
      case 'done':
        return 'Выполнен'
      case 'cancel':
        return 'Отменён'
      case 'created':
        return 'Создан'
      default:
        return ''
    }
  }

  return (
      <Link to={{
        pathname: `/${isOrderPage ? 'profile/orders' : 'feed'}/${order._id}`,
        state: { background: location }
      }} className={styles.link}>
        <div className={styles.root} onClick={onClick}>
          <header className={styles.header}>
            <span className={styles.orderNumber}>
              #{order.number}
            </span>
            <span className={styles.orderDate}>
              {new Date(order.createdAt).toLocaleString()}
            </span>
          </header>
          <h3 className={styles.orderTitle}>
            {order.name}
          </h3>
          {isOrderPage && <span className={styles.status}>{getStatus()}</span>}
          <div className={styles.footer}>
            <IngredientImages ingredients={order.ingredients} />
            <div className={styles.totalPriceWrap}>
              <span className={styles.totalPrice}>
                {currentCost}
              </span>
              <CurrencyIcon type={'primary'} />
            </div>
          </div>
        </div>
      </Link>
  )
}

export default FeedItem
