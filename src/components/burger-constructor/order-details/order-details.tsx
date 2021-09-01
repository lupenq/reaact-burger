import styles from './index.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../../services/store'
import { FC } from 'react'

const OrderDetails: FC = () => {
  const { order } = useAppSelector(store => store.order)

  return (
    <div className={styles.root}>
      <span className={styles.orderNumber}>{order?.number}</span>
      <span className={styles.numberDescription}>Идентификатора заказа</span>
      <div className={styles.checkedIcon}>
        <CheckMarkIcon type={'primary'} />
      </div>
      <span className={styles.orderStatus}>Ваш заказ начали готовить</span>
      <span className={styles.orderStatusDescription}>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
}

export default OrderDetails
