import React from 'react';
import PropTypes from 'prop-types';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { ingredients as propsIngredients } from '../../../propTypes/index';

const propTypes = {
  ingredients: PropTypes.shape({ ...propsIngredients }),
  checkoutCancelled: PropTypes.func.isRequired,
  checkoutContinued: PropTypes.func.isRequired,
};

const CheckoutSummary = (props) => {
  const { ingredients, checkoutCancelled, checkoutContinued } = props;
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well</h1>
      <div className={classes.Preview}>
        <Burger ingredients={ingredients} />
      </div>
      <Button
        btnType="Danger"
        clicked={checkoutCancelled}
      >
        Cancel
      </Button>
      <Button
        btnType="Success"
        clicked={checkoutContinued}
      >
        Continue
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = propTypes;
CheckoutSummary.defaultProps = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0,
  },
};

export default CheckoutSummary;
