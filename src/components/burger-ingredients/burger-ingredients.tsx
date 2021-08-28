import { FC } from 'react'
import styles from './index.module.css'
import IngredientsTabs from './ingridients-tabs/ingridients-tabs'
import IngredientsList from './ingredients-list/ingredients-list'
import { IIngredient } from '../../interfaces'

interface iBurgerConstructorProps {
  data: IIngredient[]
}

const BurgerIngredients: FC<iBurgerConstructorProps> = ({ data }) => {
  return (
    <div className={styles.root}>
      <IngredientsTabs />
      <IngredientsList data={data}/>
    </div>
  )
}

export default BurgerIngredients
