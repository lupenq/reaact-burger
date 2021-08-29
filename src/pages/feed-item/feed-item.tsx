import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { wsOpenConnection, wsClose } from '../../services/slices/feed'
import { setCurrentOrder } from '../../services/slices/currentOrder'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './index.module.css'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { IIngredient } from '../../interfaces'
import Loader from 'react-loader-spinner'

type IIngredientWithCount = IIngredient & {count: number}

export const FeedItemPage: FC<{isOrderPage: boolean}> = ({ isOrderPage }) => {
  const [ingridientsData, setIngridientsData] = useState<IIngredientWithCount[]>([])
  const dispatch = useAppDispatch()
  const orders = useAppSelector(store => store.feed.orders)
  const currentOrder = useAppSelector(store => store.currentOrder)
  const allIngredients = useAppSelector(({ ingridients }) => ingridients.items)
  const currentIngredients = currentOrder?.ingredients?.map(el =>
    allIngredients.find((item) => item._id === el)
  )
  const { id } = useParams<{id: string}>()

  useEffect(() => {
    if (isOrderPage) {
      dispatch(
        wsOpenConnection({
          url: 'wss://norma.nomoreparties.space/orders',
          personal: true
        })
      )
    } else {
      dispatch(
        wsOpenConnection({
          url: 'wss://norma.nomoreparties.space/orders/all'
        })
      )
    }

    return () => {
      dispatch(wsClose())
    }
  }, [dispatch])

  useEffect(() => {
    if (!currentOrder.ingredients && orders.length) {
      dispatch(setCurrentOrder(orders.find(e => e._id === id)))
    }
  }, [JSON.stringify(orders)])

  useEffect(() => {
    const ingredientsGroup: IIngredientWithCount[] = []

    currentIngredients?.forEach(
      (item) => {
        if (ingredientsGroup.find(el => el._id === item?._id)) {
          const idx = ingredientsGroup.findIndex(e => e._id === item?._id)

          ingredientsGroup[idx].count += 1
        } else {
          ingredientsGroup.push(
            {
              ...item,
              count: 1
            } as IIngredientWithCount
          )
        }
      }
    )

    setIngridientsData(ingredientsGroup)
  }, [JSON.stringify(currentIngredients)])

  const getStatus = () => {
    switch (currentOrder.status) {
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

  const currentCost = currentOrder?.ingredients?.reduce((accumulator: number, el: string) => {
    const newPrice = allIngredients.find(item => item._id === el)?.price || 0
    return accumulator + newPrice
  }, 0)

  return (
    currentOrder.ingredients
      ? <main className={styles.root}>
      <span className={styles.orderNumber}>#{currentOrder.number}</span>
      <span className={styles.title}>{currentOrder.name}</span>
      <span className={styles.status}>{getStatus()}</span>

      <span className={styles.compos}>Состав:</span>
      <div className={styles.ingredients}>
        {
          ingridientsData.map(ingridient => {
            return <div className={styles.ingridient} key={ingridient._id}>
              <div className={styles.imageWrapper}>
                <img src={ingridient.image_mobile} alt={ingridient.name} />
              </div>
              <span className={styles.ingredientName}>{ingridient.name}</span>
              <div className={styles.ingredientPriceWrap}>
                <span className={styles.price}>
                  {ingridient.count} x {ingridient.price}
                </span>
                <CurrencyIcon type={'primary'} />
              </div>
            </div>
          })
        }

      </div>

      <div className={styles.footer}>
        <span className={styles.date}>{new Date(currentOrder.createdAt).toLocaleString()}</span>
        <div className={styles.totalPriceWrap}>
          <span className={styles.totalPrice}>
            {currentCost}
          </span>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </main>
      : <Loader type={'Audio'} />
  )
}
