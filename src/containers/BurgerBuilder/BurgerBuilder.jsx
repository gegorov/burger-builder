import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3,
};

class BurgerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
      purchaseable: false,
      purchaseMode: false,
    };
  }

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;

    const updatedCount = ingredients[type] + 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = totalPrice + priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount === 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = totalPrice - priceAddition;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIngredients,
    });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({
      purchaseMode: true,
    });
  }

  purchaseCancelHandler = () => {
    this.setState({
      purchaseMode: false,
    });
  }

  purchaseContinueHandler = () => {
    alert('you continue');
    this.setState({
      purchaseMode: false,
    });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((acc, i) => acc + i, 0);
    console.log(sum);
    this.setState({
      purchaseable: sum > 0,
    });
  }

  render() {
    const {
      ingredients, totalPrice, purchaseable, purchaseMode,
    } = this.state;
    const disabledInfo = {
      ...ingredients,
    };

    const keys = Object.keys(disabledInfo);

    keys.forEach((key) => {
      disabledInfo[key] = disabledInfo[key] <= 0;
    });

    console.log(disabledInfo);

    return (
      <Aux>
        <Modal show={purchaseMode} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={ingredients}
            purchaseCancelHandler={this.purchaseCancelHandler}
            purchaseContinueHandler={this.purchaseContinueHandler}
            price={totalPrice}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchaseable={purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
