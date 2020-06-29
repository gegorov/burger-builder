import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const propTypes = {
  ingredients: PropTypes.shape({
    salad: PropTypes.number.isRequired,
    bacon: PropTypes.number.isRequired,
    cheese: PropTypes.number.isRequired,
    meat: PropTypes.number.isRequired,
  }).isRequired,
};

const Burger = (props) => {
  const { ingredients } = props;
  const transformedIngredients = Object.keys(ingredients)
    .map((key) => [...Array(ingredients[key])]
      .map((_, i) => <BurgerIngredient key={String(key + i)} type={key} />))
    .flat();

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {
        !transformedIngredients.length
          ? <p>Please start adding ingredients</p>
          : transformedIngredients
      }
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = propTypes;

export default Burger;
