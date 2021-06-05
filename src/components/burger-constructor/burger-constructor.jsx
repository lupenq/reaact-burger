import { useState, useMemo } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import OrderElement from './order-element/order-element'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor ({ data }) {
  const [modalVisible, setModalVisible] = useState(false)

  const totalPrice = useMemo(() => {
    return data.reduce((acc, value) => acc + value.price, 0)
  }, [data])

  return (
    <main className={styles.root}>
      <div className={styles.orderList}>
        <OrderElement
          ingridient={data[0]}
          type='top'
          isLocked={true}
        />
        <div className={styles.scrollableList}>
          {
            data.map(item => {
              return <OrderElement
                key={item._id}
                ingridient={item}
                isLocked={false}
                handleClose={() => console.log('tyt')}
              />
            })
          }
        </div>
        <OrderElement
          ingridient={data[0]}
          type='bottom'
          isLocked={true}
        />
      </div>
      <div className={styles.orderInfo}>
        <span className={styles.totalPrice}>
          {totalPrice}
        </span>
        <CurrencyIcon />
        <div className={styles.submitOrder} >
          <Button type="primary" size="medium" onClick={() => setModalVisible(true)}>Оформить заказ</Button>
        </div>
      </div>
      {
        modalVisible &&
        <Modal handleClose={() => setModalVisible(false)}>
          <OrderDetails />
        </Modal>
      }
    </main>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number
  }).isRequired)
}

export default BurgerConstructor
