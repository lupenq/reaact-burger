import { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor ({ data }) {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <main className={styles.root}>
      <div className={styles.orderList}>
        <ConstructorElement
            type='top'
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
            handleClose={() => console.log('tyt')}
        />
        <div className={styles.scrollableList}>
          {
            data.map(item => {
              return <ConstructorElement
                key={item._id}
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={() => console.log('tyt')}
              />
            })
          }
        </div>
        <ConstructorElement
            type='bottom'
            isLocked={true}
            text={data[0].name}
            price={data[0].price}
            thumbnail={data[0].image}
            handleClose={() => console.log('tyt')}
          />
      </div>
      <div className={styles.orderInfo}>
        <span className={styles.totalPrice}>
          {data.reduce((acc, value) => acc + value.price, 0)}
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
