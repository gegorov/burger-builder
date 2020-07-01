import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
  }).isRequired,
  purchaseCancelHandler: PropTypes.func.isRequired,
  purchaseContinueHandler: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

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

OrderSummary.propTypes = propTypes;

export default OrderSummary;
