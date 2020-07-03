import React, { Component } from 'react';

import axios from '../../axios';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
      ingredients: null,
      totalPrice: 4,
      purchaseable: false,
      purchaseMode: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    axios.get('https://burgerbuilder-d5c72.firebaseio.com/ingredients.json')
      .then((response) => {
        this.setState({
          ingredients: response.data,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
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
    // alert('you continue');

    this.setState({ loading: true });
    const { ingredients, totalPrice } = this.state;
    const order = {
      ingredients,
      price: totalPrice,
      customer: {
        name: 'Test Byuer',
        address: {
          street: 'Teststreet 1',
          zipCode: '12314',
          country: 'Germany',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios.post('/order.json', order)
      .then((response) => {
        console.log(response);
        this.setState({
          purchaseMode: false,
          loading: false,
        });
      }).catch((e) => {
        console.log(e);
        this.setState({
          purchaseMode: false,
          loading: false,
        });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((acc, i) => acc + i, 0);

    this.setState({
      purchaseable: sum > 0,
    });
  }

  render() {
    const {
      ingredients, totalPrice, purchaseable, purchaseMode, loading, error,
    } = this.state;
    let disabledInfo;

    let orderSummary = null;

    if (loading) {
      orderSummary = <Spinner />;
    }
    let burger = error ? <p>Ingredients can;t be fetched</p> : <Spinner />;

    if (ingredients) {
      disabledInfo = {
        ...ingredients,
      };

      const keys = Object.keys(disabledInfo);

      keys.forEach((key) => {
        disabledInfo[key] = disabledInfo[key] <= 0;
      });

      orderSummary = (
        <OrderSummary
          ingredients={ingredients}
          purchaseCancelHandler={this.purchaseCancelHandler}
          purchaseContinueHandler={this.purchaseContinueHandler}
          price={totalPrice}
        />
      );

      burger = (
        <Aux>
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

    return (
      <Aux>
        <Modal show={purchaseMode} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
