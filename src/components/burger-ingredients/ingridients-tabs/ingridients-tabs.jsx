import { useSelector } from 'react-redux'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './index.module.css'

function IngredientsTabs () {
  const currentTab = useSelector(store => store.currentTab)

  return (
    <div className={styles.root}>
      <Tab value='buns' active={currentTab === 'buns'}>
        Булки
      </Tab>
      <Tab value='sauces' active={currentTab === 'sauces'}>
        Соусы
      </Tab>
      <Tab value='toppings' active={currentTab === 'toppings'}>
        Начинки
      </Tab>
    </div>
  )
}

export default IngredientsTabs
