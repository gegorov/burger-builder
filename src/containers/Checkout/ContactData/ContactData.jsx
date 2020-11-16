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
          validation: {
            required: true,
            minLength: 2,
          },
          valid: false,
          touched: false,
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Address',
            label: 'Address',
          },
          value: '',
          validation: {
            required: true,
            minLength: 10,
          },
          valid: false,
          touched: false,
        },
        zipCode: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Postal Code',
            label: 'ZIP Code',
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Country',
            label: 'Country',
          },
          value: '',
          validation: {
            required: true,
            minLength: 2,
          },
          valid: false,
          touched: false,
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your Email',
            label: 'Email',
          },
          value: '',
          validation: {
            required: true,
            email: true,
            minLength: 3,
          },
          valid: false,
          touched: false,
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
          validation: {
          },
          valid: true,
          touched: false,
        },
      },
      formIsValid: false,
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
    }

    /**
     * Simple validation function
     * @param {string} value value for validation
     * @param {object} rules object with rules
     */
    checkValidity = (value, rules) => {
      let isValid = true;

      if (rules.required) {
        isValid = isValid && value.trim() !== '';
      }

      if (rules.email) {
        isValid = isValid && value.trim().includes('@');
      }

      if (rules.minLength) {
        isValid = isValid && value.trim().length >= rules.minLength;
      }

      return isValid;
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
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputId] = updatedFormElement;

      let formIsValid = true;

      Object.values(updatedOrderForm).forEach((v) => {
        formIsValid = v.valid && formIsValid;
      });

      this.setState({ orderForm: updatedOrderForm, formIsValid });
    }

    render() {
      const { loading, orderForm, formIsValid } = this.state;
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
            valid={item.config.valid}
            shouldValidate={Object.keys(item.config.validation).length > 0}
            touched={item.config.touched}
          />
        ));

      let form = (
        <form onSubmit={this.orderHandler}>
          {formItems}
          <Button
            btnType="Success"
            type="submit"
            disabled={!formIsValid}
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
