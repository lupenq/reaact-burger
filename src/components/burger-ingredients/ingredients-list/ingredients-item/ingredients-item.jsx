import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css'
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientsItem({name, image, price}) {
  return (
    <div className={styles.root}>
      <img src={image} alt="" className={styles.image} />
      <div className={styles.currencyBlock}>
        <span>{price}</span>
        <CurrencyIcon />
      </div>
      <span className={styles.title}>{name}</span>
    </div>
  );
}

IngredientsItem.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default IngredientsItem;
