import React from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const propTypes = {
  children: PropTypes.element.isRequired,
  modalClosed: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

const Modal = (props) => {
  const { children, modalClosed, show } = props;
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
};

Modal.propTypes = propTypes;

export default Modal;
