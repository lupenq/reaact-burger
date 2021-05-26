import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './index.module.css';

function Main({data}) {
  return (
	<main className={styles.root}>
		<h1 className={styles.title}>Соберите бургер</h1>
		<article className={styles.content}>
			<BurgerIngredients data={data} />
			<BurgerConstructor data={data} />
		</article>
	</main>
  );
}

Main.propTypes = {
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

export default Main;
