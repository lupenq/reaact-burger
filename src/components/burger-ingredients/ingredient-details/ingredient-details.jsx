import { useEffect } from 'react'
import styles from './index.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ingridientModalRemove, ingridientModalAdd } from '../../../services/slices/ingridientModal'

function IngredientDetails () {
  const modalData = useSelector(({ ingridientModal }) => ingridientModal)
  const ingridients = useSelector(({ ingridients }) => ingridients.items)
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => {
    const ingridient = ingridients.filter(e => e._id === id)[0]
    dispatch(ingridientModalAdd(ingridient))
    return () => {
      dispatch(ingridientModalRemove())
    }
  }, [dispatch, id, ingridients])

  return (
    <div className={styles.root}>
      <img src={modalData.image} alt="" className={styles.ingridientImage} />
      <span className={styles.ingridientTitle}>{modalData.name}</span>
      <div className={styles.nutritionalsTable}>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Калории</span>
          <span className={styles.nutritionalValue}>{modalData.calories}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Белки</span>
          <span className={styles.nutritionalValue}>{modalData.proteins}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Жиры</span>
          <span className={styles.nutritionalValue}>{modalData.fat}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Углеводы</span>
          <span className={styles.nutritionalValue}>{modalData.carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails
