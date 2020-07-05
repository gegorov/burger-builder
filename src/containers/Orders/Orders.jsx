import React, { Component } from 'react';
import axios from '../../axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Order from '../../components/Order/Order';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios.get('/orders.json').then((response) => {
      const fetchedOrders = [];
      for (const key in response.data) {
        fetchedOrders.push({
          ...response.data[key],
          id: key,
        });
      }
      this.setState({ orders: fetchedOrders, loading: false });
    }).catch(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading, orders } = this.state;
    return (
      <div>
        {
          loading
            ? <Spinner />
            : orders.map((order) => <Order key={order.id} ingredients={order.ingredients} price={order.price} />)
        }
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
