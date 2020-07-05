import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { ingredients as propsIngredients } from '../../propTypes/index';
import classes from './Burger.module.css';

const propTypes = {
  ingredients: PropTypes.shape({ ...propsIngredients }),
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
Burger.defaultProps = {
  ingredients: {
    salad: 0,
    bacon: 0,
    meat: 0,
    cheese: 0,
  },
};

export default Burger;
