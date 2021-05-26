import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css'
import {ConstructorElement, Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'

function BurgerConstructor({data}) {
  return (
    <main className={styles.root}>
      <div className={styles.orderList}>
        {
          data.map((item, index) => {
            return <ConstructorElement
              type={(!index && 'top') || (index === data.length - 1 && 'bottom')}
              isLocked={false}
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => console.log('tyt')}
            />
          })
        }
      </div>
      <div className={styles.orderInfo}>
        <span className={styles.totalPrice}>
          {data.reduce((acc, value) => acc + value.price, 0)}
        </span>
        <CurrencyIcon />
        <div className={styles.submitOrder} >
          <Button type="primary" size="medium">Оформить заказ</Button>
        </div>
      </div>
    </main>
  );
}

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;
