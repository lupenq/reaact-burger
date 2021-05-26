import React, {useState} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './index.module.css'

function IngredientsTabs() {
  const [activeTab, setActiveTab] = useState('buns')

  return (
		<div className={styles.root}>
			<Tab value='buns' active={activeTab === 'buns'} onClick={setActiveTab}>
				Булки
			</Tab>
			<Tab value='sauces' active={activeTab === 'sauces'} onClick={setActiveTab}>
				Соусы
			</Tab>
			<Tab value='toppings' active={activeTab === 'toppings'} onClick={setActiveTab}>
				Начинки
			</Tab>
		</div>
  );
}

export default IngredientsTabs;
