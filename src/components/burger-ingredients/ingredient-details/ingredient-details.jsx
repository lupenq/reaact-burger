import PropTypes from 'prop-types'
import styles from './index.module.css'

function IngredientDetails ({ name, image, proteins, fat, carbohydrates }) {
  return (
    <div className={styles.root}>
      <img src={image} alt="" className={styles.ingridientImage} />
      <span className={styles.ingridientTitle}>{name}</span>
      <div className={styles.nutritionalsTable}>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Калории</span>
          <span className={styles.nutritionalValue}>244,4</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Белки</span>
          <span className={styles.nutritionalValue}>{proteins}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Жиры</span>
          <span className={styles.nutritionalValue}>{fat}</span>
        </div>
        <div className={styles.nutritionalCell}>
          <span className={styles.nutritionalTitle}>Углеводы</span>
          <span className={styles.nutritionalValue}>{carbohydrates}</span>
        </div>
      </div>
    </div>
  )
}

IngredientDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired
}

export default IngredientDetails
