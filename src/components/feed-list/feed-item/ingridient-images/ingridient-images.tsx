import { FC } from 'react'
import { useAppSelector } from '../../../../services/store'
import styles from './index.module.css'

const IngredientImages: FC<{ingredients: string[]}> = ({ ingredients }) => {
  const allIngredients = useAppSelector(({ ingridients }) => ingridients.items)

  const currentIngredients = ingredients.map(el =>
    allIngredients.find((item) => item._id === el)
  )

  const mainIngridients = currentIngredients.slice(0, 5)
  const tailIngridientsCount = currentIngredients.length - 5

  return (
    <div className={styles.root}>
      {mainIngridients.map((ingredient, index) => (
        <div key={index} style={{ zIndex: 10 - index }} className={styles.ingridient}>
          <div className={styles.imageWrapper}>
            <img src={ingredient?.image_mobile} alt={ingredient?.name} />
          </div>
        </div>
      ))}
      {tailIngridientsCount > 0 && currentIngredients[5]
        ? (
            <div className={styles.ingridient}>
              <div className={`${styles.restNumber} text text_type_digits-default`}>
                +{tailIngridientsCount}
              </div>
              <div className={`${styles.imageWrapper} ${styles.last}`}>
                <img src={currentIngredients[5].image_mobile} alt={currentIngredients[5].name} />
              </div>
            </div>
          )
        : null}
    </div>
  )
}

export default IngredientImages
