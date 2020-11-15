import React, { Component } from 'react';

import axios from '../../../axios';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name',
            label: 'Name',

          },
          value: '',
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Address',
            label: 'Address',
          },
          value: '',
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Postal Code',
            label: 'ZIP Code',
          },
          value: '',
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country',
            label: 'Country',
          },
          value: '',
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email',
            label: 'Email',
          },
          value: '',
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
            options: [
              {
                value: 'fastest',
                displayValue: 'Fastest',
              },
              {
                value: 'cheapest',
                displayValue: 'Cheapest',
              },
            ],
            label: 'Delivery Method',
          },
          value: 'fastest',
        },
      },
      loading: false,
    };
  }

    orderHandler = (event) => {
      const { ingredients, price } = this.props;
      event.preventDefault();
      const { orderForm } = this.state;
      const customerData = Object.keys(orderForm).reduce(
        (acc, key) => ({
          ...acc,
          [key]: orderForm[key].value,
        }),
        {},
      );

      this.setState({ loading: true });

      const order = {
        ingredients,
        price,
        customerData,
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

    inputChangedHandler = (event, inputId) => {
      const { orderForm } = this.state;
      const updatedOrderForm = {
        ...orderForm,
      };
      const updatedFormElement = {
        ...updatedOrderForm[inputId],
      };
      updatedFormElement.value = event.target.value;
      updatedOrderForm[inputId] = updatedFormElement;
      this.setState({ orderForm: updatedOrderForm });
    }

    render() {
      const { loading, orderForm } = this.state;
      const formItems = Object.keys(orderForm)
        .map((key) => ({
          id: key,
          config: orderForm[key],
        }))
        .map((item) => (
          <Input
            key={item.id}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            value={item.config.value}
            name={item.id}
            changed={(event) => this.inputChangedHandler(event, item.id)}
          />
        ));

      let form = (
        <form onSubmit={this.orderHandler}>
          {formItems}
          <Button
            btnType="Success"
            type="submit"
          >
            Order
          </Button>
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
