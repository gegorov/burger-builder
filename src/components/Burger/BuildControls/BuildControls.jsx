import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const propTypes = {
  ingredientAdded: PropTypes.func.isRequired,
  ingredientRemoved: PropTypes.func.isRequired,
  disabled: PropTypes.shape({
    salad: PropTypes.bool.isRequired,
    bacon: PropTypes.bool.isRequired,
    cheese: PropTypes.bool.isRequired,
    meat: PropTypes.bool.isRequired,
  }).isRequired,
  price: PropTypes.number.isRequired,
  purchaseable: PropTypes.bool.isRequired,
  ordered: PropTypes.func.isRequired,
};

const controls = [
  {
    label: 'Salad',
    type: 'salad',
  },
  {
    label: 'Bacon',
    type: 'bacon',
  },
  {
    label: 'Cheese',
    type: 'cheese',
  },
  {
    label: 'Meat',
    type: 'meat',
  },
];

const BuildControls = (props) => {
  const {
    ingredientAdded, ingredientRemoved, disabled, price, purchaseable, ordered,
  } = props;
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:
        {' '}
        <strong>
          $
          {price.toFixed(2)}
        </strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          key={control.label}
          label={control.label}
          added={() => ingredientAdded(control.type)}
          removed={() => ingredientRemoved(control.type)}
          disabled={disabled[control.type]}
        />
      ))}
      <button
        type="button"
        className={classes.OrderButton}
        disabled={!purchaseable}
        onClick={ordered}
      >
        Order now

      </button>
    </div>
  );
};

BuildControls.propTypes = propTypes;

export default BuildControls;
