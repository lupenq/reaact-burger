import { useState, useMemo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styles from './index.module.css'
import { useHistory } from 'react-router-dom'
import Modal from '../modal/modal'
import OrderDetails from './order-details/order-details'
import OrderElement from './order-element/order-element'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { postOrder } from '../../services/slices/order'
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

  const [modalVisible, setModalVisible] = useState(false)
  const { ingridients, bun } = useSelector(store => store.burgerConstructor)
  const dispatch = useDispatch()
  const { isLoginned } = useSelector(store => store.user)
  const history = useHistory()

  const totalPrice = useMemo(() => {
    if (ingridients.length || bun.price) {
      return ingridients.reduce((acc, value) => acc + value.price, 0) + (bun.price * 2 || 0)
    }

    return 0
  }, [bun.price, ingridients])

  const handleCheckoutButton = () => {
    if (!isLoginned) {
      return history.push('/login')
    }

    dispatch(postOrder())
    setModalVisible(true)
  }

  const moveIngridient = useCallback((dragIndex, hoverIndex) => {
    dispatch(changeIndexes({ dragIndex, hoverIndex }))
  }, [dispatch])

  return (
    <main className={styles.root} >
      <div className={styles.orderList} ref={drop}>
        {canDrop && (<div className={styles.dropHover}>
          {!isActive && (<span className={styles.dropText}>Переместите ингредиент в эту область</span>)}
          {isActive && (<span className={styles.dropText}>Теперь можете отпустить его</span>)}
        </div>)}
        {bun.name || ingridients.length
          ? (<div className={styles.ingridientsWrapper}>
        {bun.name && <OrderElement
          ingridient={bun}
          type='top'
          isLocked={true}
        />}
        <div className={styles.scrollableList}>
          {
            !!ingridients.length &&
              ingridients.map((item, index) => {
                return (<OrderElement
                  key={item.addedAt}
                  index={index}
                  ingridient={item}
                  isLocked={false}
                  moveIngridient={moveIngridient}
                />)
              })
          }
        </div>
        {bun.name && (<OrderElement
          ingridient={bun}
          type='bottom'
          isLocked={true}
        />)}
        </div>)
          : (!isActive && !canDrop) &&
          (<span className={styles.placeholderText}>Добавьте свой первый ингредиент или булку</span>)}
      </div>
      <div className={styles.orderInfo}>
        <span className={styles.totalPrice}>
          {totalPrice}
        </span>
        <CurrencyIcon />
        <div className={`${styles.submitOrder} ${!bun.name && styles.disabled}`} >
          <Button type="primary" size="medium" onClick={handleCheckoutButton}>Оформить заказ</Button>
        </div>
      </div>
      {
        modalVisible &&
        (<Modal handleClose={() => setModalVisible(false)}>
          <OrderDetails />
        </Modal>)
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
