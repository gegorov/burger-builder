import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const propTypes = {
  children: PropTypes.element,
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    const { show, children } = this.props;
    if (nextProps.show !== show || nextProps.children !== children) {
      return true;
    }
    return false;
  }

  render() {
    const { children, modalClosed, show } = this.props;
    return (
      <Aux>
        <Backdrop show={show} clicked={modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: show ? 'translateY(0)' : 'translateY(-100vh',
            opacity: show ? '1' : '0',
          }}
        >
          {children}
        </div>
      </Aux>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = {
  children: null,
  show: false,
};

export default Modal;
