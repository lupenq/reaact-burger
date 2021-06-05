import styles from './index.module.css'
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function OrderDetails () {
  return (
    <div className={styles.root}>
      <span className={styles.orderNumber}>034536</span>
      <span className={styles.numberDescription}>Идентификатора заказа</span>
      <div className={styles.checkedIcon}>
        <CheckMarkIcon />
      </div>
      <span className={styles.orderStatus}>Ваш заказ начали готовить</span>
      <span className={styles.orderStatusDescription}>Дождитесь готовности на орбитальной станции</span>
    </div>
  )
}

export default OrderDetails
