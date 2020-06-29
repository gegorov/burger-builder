import React from 'react';
import Aux from '../../../hoc/Aux';

const OrderSummary = (props) => {
  const { ingredients } = props;
  const ingredientSummary = Object.keys(ingredients)
    .map((igKey) => (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>
        :
        {' '}
        {ingredients[igKey]}
      </li>
    ));
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
