import { useMemo, useRef, useEffect, FC } from 'react'
import { useInView } from 'react-intersection-observer'
import styles from './index.module.css'
import { Link, useLocation } from 'react-router-dom'
import IngredientsItem from './ingredients-item/ingredients-item'
import { setCurrentTab } from '../../../services/slices/currentTab'

import { ingridientModalAdd } from '../../../services/slices/ingridientModal'
import { IIngredient } from '../../../interfaces'
import { useAppDispatch } from '../../../services/store'

interface IIngredientsListProps {
  data: IIngredient[]
}

const IngredientsList: FC<IIngredientsListProps> = ({ data }) => {
  const dispatch = useAppDispatch()

  const buns = useMemo(() => data.filter(item => item.type === 'bun'), [data])
  const main = useMemo(() => data.filter(item => item.type === 'main'), [data])
  const sauces = useMemo(() => data.filter(item => item.type === 'sauce'), [data])

  const scrollableList = useRef<HTMLDivElement>(null)
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 })
  const [toppingsRef, inViewToppings] = useInView({ threshold: 0 })
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 })

  useEffect(() => {
    if (inViewBuns) {
      dispatch(setCurrentTab('buns'))
    } else if (inViewSauces) {
      dispatch(setCurrentTab('sauces'))
    } else if (inViewToppings) {
      dispatch(setCurrentTab('toppings'))
    }
  }, [dispatch, inViewBuns, inViewToppings, inViewSauces])

  const handleOpenModal = (ingridient: IIngredient) => {
    dispatch(ingridientModalAdd(ingridient))
  }

  const location = useLocation()

  return (
  <>
    <div className={styles.root} ref={scrollableList}>
      <div className={styles.listSection} ref={bunsRef}>
        <span className={styles.sectionTitle}>Булки</span>
        <div className={styles.ingridients}>
          {
            buns.map(item => {
              return (
              <Link className={styles.link} to={{
                pathname: `/ingridients/${item._id}`,
                state: { background: location }
              }} key={item._id}><IngredientsItem ingridient={item} onClick={() => handleOpenModal(item)}/></Link>
              )
            })
          }
        </div>
      </div>
      <div className={styles.listSection} ref={saucesRef}>
        <span className={styles.sectionTitle} >Соусы</span>
        <div className={styles.ingridients}>
          {
            sauces.map(item => {
              return (
              <Link className={styles.link} to={{
                pathname: `/ingridients/${item._id}`,
                state: { background: location }
              }} key={item._id}><IngredientsItem ingridient={item} onClick={() => handleOpenModal(item)}/></Link>
              )
            })
          }
        </div>
      </div>
      <div className={styles.listSection} ref={toppingsRef}>
        <span className={styles.sectionTitle}>Начинки</span>
        <div className={styles.ingridients}>
          {
            main.map(item => {
              return (
              <Link className={styles.link} to={{
                pathname: `/ingridients/${item._id}`,
                state: { background: location }
              }} key={item._id}><IngredientsItem ingridient={item} onClick={() => handleOpenModal(item)}/></Link>
              )
            })
          }
        </div>
      </div>
    </div>
  </>
  )
}

export default IngredientsList
