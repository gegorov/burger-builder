import React, { Component } from 'react';

import axios from '../../../axios';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: '',
      },
      loading: false,
    };
  }

    orderHandler = (event) => {
      const { ingredients, price } = this.props;
      event.preventDefault();

      this.setState({ loading: true });
      const order = {
        ingredients,
        price,
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
      axios.post('/orders.json', order)
        .then((response) => {
          console.log(response);
          this.setState({
            loading: false,
          });
          this.props.history.push('/');
        }).catch((e) => {
          console.log(e);
          this.setState({
            loading: false,
          });
        });

      console.log('ContactData: ', this.props.ingredients);
    }

    render() {
      const { loading } = this.state;
      let form = (
        <form>
          <input
            className={classes.Input}
            type="text"
            name="name"
            placeholder="Your Name"
          />
          <input
            className={classes.Input}
            type="text"
            name="email"
            placeholder="Your email"
          />
          <input
            className={classes.Input}
            type="text"
            name="street"
            placeholder="Your street address"
          />
          <input
            className={classes.Input}
            type="text"
            name="postalCode"
            placeholder="Your postal code"
          />
          <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
      );
      if (loading) {
        form = <Spinner />;
      }

      return (
        <div className={classes.ContactData}>
          <h4>Enter your contact data</h4>
          {form}
        </div>
      );
    }
}

export default ContactData;
