import { useSelector, useDispatch } from 'react-redux'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { setCurrentTab } from '../../../services/slices/currentTab'
import styles from './index.module.css'

function IngredientsTabs () {
  const dispatch = useDispatch()
  const currentTab = useSelector(store => store.currentTab)

  const setTab = tab => dispatch(setCurrentTab(tab))

  return (
    <div className={styles.root}>
      <Tab value='buns' active={currentTab === 'buns'} onClick={setTab}>
        Булки
      </Tab>
      <Tab value='sauces' active={currentTab === 'sauces'} onClick={setTab}>
        Соусы
      </Tab>
      <Tab value='toppings' active={currentTab === 'toppings'} onClick={setTab}>
        Начинки
      </Tab>
    </div>
  )
}

export default IngredientsTabs
