import { FC } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { setCurrentTab } from '../../../services/slices/currentTab'
import styles from './index.module.css'
import { useAppDispatch, useAppSelector } from '../../../services/store'

const IngredientsTabs: FC = () => {
  const dispatch = useAppDispatch()
  const currentTab = useAppSelector(store => store.currentTab)

  const setTab = (tab: string) => dispatch(setCurrentTab(tab))

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
