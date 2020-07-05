import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {
  const { ingredients, price } = props;

  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      {
        Object.keys(ingredients).map((key) => (
          <span className={classes.Ingredient} key={key}>
            {key}
            :
            {' '}
            (
            {ingredients[key]}
            )
          </span>
        ))
      }
      <p>
        Price:
        {' '}
        $
        <strong>{parseFloat(price).toFixed(2)}</strong>
        {' '}
      </p>
    </div>
  );
};

export default Order;
