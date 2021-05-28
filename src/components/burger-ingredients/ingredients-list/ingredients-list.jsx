import React from 'react';
import styles from './index.module.css'
import PropTypes from 'prop-types'
import IngredientsItem from './ingredients-item/ingredients-item'

function IngredientsList({data}) {
  const buns = data.filter(item => item.type === 'bun')
  const main = data.filter(item => item.type === 'main')
  const sauces = data.filter(item => item.type === 'sauce')

  return (
	<div className={styles.root}>
		<div className={styles.listSection}>
			<span className={styles.sectionTitle}>Булки</span>
			<div className={styles.ingridients}>
				{
					buns.map(item => (
						<IngredientsItem key={item._id} {...item}/>
					))
				}
			</div>
		</div>
		<div className={styles.listSection}>
			<span className={styles.sectionTitle}>Соусы</span>
			<div className={styles.ingridients}>
				{
					sauces.map(item => (
						<IngredientsItem key={item._id} {...item}/>
					))
				}
			</div>
		</div>
		<div className={styles.listSection}>
			<span className={styles.sectionTitle}>Начинки</span>
			<div className={styles.ingridients}>
				{
					main.map(item => (
						<IngredientsItem key={item._id} {...item}/>
					))
				}
			</div>
		</div>
	</div>
  );
}

IngredientsList.propTypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.string,
		proteins: PropTypes.number,
		fat: PropTypes.number,
		carbohydrates: PropTypes.number,
		calories: PropTypes.number,
		price: PropTypes.number,
		image: PropTypes.string,
		image_mobile: PropTypes.string,
		image_large: PropTypes.string,
		__v: PropTypes.number
	}).isRequired)
}


export default IngredientsList;
