import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Aux from '../../hoc/Aux';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: null,
      totalPrice: 0,
    };
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const param of query.entries()) {
      const [key, value] = param;
      if (key === 'price') {
        price = value;
      } else {
        ingredients[key] = +value;
      }
    }
    console.log({ ingredients });
    this.setState({ ingredients, totalPrice: price });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    const { ingredients, totalPrice } = this.state;
    return (
      <Aux>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          render={(props) => (<ContactData ingredients={ingredients} price={totalPrice} {...props} />)}
        />
      </Aux>
    );
  }
}

export default Checkout;
