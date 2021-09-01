import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './index.module.css'
import { useAppSelector } from '../../services/store'
import { IIngredient } from '../../interfaces'

export const IngridientPage: FC = () => {
  const [ingridient, setIngridient] = useState<IIngredient>()

  const { items } = useAppSelector(store => store.ingridients)

  const { id } = useParams<{id: string}>()

  useEffect(() => {
    setIngridient(items.filter(e => e._id === id)[0])
  }, [id, items])

  return (
    <div className={styles.root}>
      <img src={ingridient?.image} alt="" className={styles.ingridientImage} />
      <span className={styles.ingridientTitle}>{ingridient?.name}</span>
      <div className={styles.nutritionalsTable}>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Калории</span>
          <span className={styles.nutritionalValue}>{ingridient?.calories}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Белки</span>
          <span className={styles.nutritionalValue}>{ingridient?.proteins}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Жиры</span>
          <span className={styles.nutritionalValue}>{ingridient?.fat}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Углеводы</span>
          <span className={styles.nutritionalValue}>{ingridient?.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}
