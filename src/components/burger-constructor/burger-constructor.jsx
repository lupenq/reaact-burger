import { useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import OrderElement from './order-element/order-element'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { createOrder } from '../../services/slices/order'
import { changeIndexes } from '../../services/slices/burgerConstructor'
import { useDrop } from 'react-dnd'

function BurgerConstructor () {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingridient',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  const isActive = canDrop && isOver
  let backgroundColor = 'transparent'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  const [modalVisible, setModalVisible] = useState(false)
  const { ingridients, bun } = useSelector(store => store.burgerConstructor)
  const dispatch = useDispatch()

  const totalPrice = useMemo(() => {
    return ingridients.length && ingridients.reduce((acc, value) => acc + value.price, 0)
  }, [ingridients])

  const handleCheckoutButton = () => {
    dispatch(createOrder(ingridients))
    setModalVisible(true)
  }

  const moveIngridient = useCallback((dragIndex, hoverIndex) => {
    dispatch(changeIndexes({ dragIndex, hoverIndex }))
  }, [dispatch])

  return (
    <main className={styles.root} ref={drop} style={{ backgroundColor }}>
      <div className={styles.orderList}>
        {bun && <OrderElement
          ingridient={bun}
          type='top'
          isLocked={true}
        />}
        <div className={styles.scrollableList}>
          {
            !!ingridients.length && ingridients.map((item, index) => {
              return <OrderElement
                key={item._id}
                index={index}
                ingridient={item}
                isLocked={false}
                handleClose={() => console.log('tyt')}
                moveIngridient={moveIngridient}
              />
            })
          }
        </div>
        {bun && <OrderElement
          ingridient={bun}
          type='bottom'
          isLocked={true}
        />}
      </div>
      <div className={styles.orderInfo}>
        <span className={styles.totalPrice}>
          {totalPrice}
        </span>
        <CurrencyIcon />
        <div className={styles.submitOrder} >
          <Button type="primary" size="medium" onClick={handleCheckoutButton}>Оформить заказ</Button>
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
