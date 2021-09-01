import { FC } from 'react'
import BurgerIngredients from '../burger-ingredients/burger-ingredients'
import BurgerConstructor from '../burger-constructor/burger-constructor'
import styles from './index.module.css'
import { IIngredient } from '../../interfaces'

const Main: FC<{data: IIngredient[]}> = ({ data }) => {
  return (
    <main className={styles.root}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <article className={styles.content}>
        <BurgerIngredients data={data} />
        <BurgerConstructor />
      </article>
    </main>
  )
}

export default Main
