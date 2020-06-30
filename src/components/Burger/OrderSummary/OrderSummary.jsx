import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const {
    ingredients, purchaseCancelHandler, purchaseContinueHandler, price,
  } = props;
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
      <p>
        Total price:
        {' '}
        $
        {price.toFixed(2)}
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" type="button" clicked={purchaseCancelHandler}>Cancel</Button>
      <Button btnType="Success" type="button" clicked={purchaseContinueHandler}>Continue</Button>
    </Aux>
  );
};

export default OrderSummary;
