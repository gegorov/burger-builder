import React, { Component } from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,

    };
  }

  componentWillMount() {
    this.requestInterceptor = axios.interceptors.request.use((resp) => {
      this.setState({ error: null });
      return resp;
    });
    this.responseInterceptor = axios.interceptors.response.use((req) => req, (error) => {
      this.setState({ error });
    });
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.requestInterceptor);
    axios.interceptors.response.eject(this.responseInterceptor);
  }

  errorConfirmedHandler = () => {
    this.setState({
      error: null,
    });
  }

  render() {
    const { error } = this.state;
    return (
      <Aux>
        <WrappedComponent {...this.props} />
        <Modal show={error} modalClosed={this.errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
      </Aux>
    );
  }
};

export default withErrorHandler;
