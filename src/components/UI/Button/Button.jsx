import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const propTypes = {
  children: PropTypes.string.isRequired,
  clicked: PropTypes.func,
  btnType: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
};

const Button = (props) => {
  const {
    children, clicked, btnType, type, disabled,
  } = props;
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={clicked}
      className={[classes.Button, classes[btnType]].join(' ')}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = {
  type: 'button',
  disabled: false,
  clicked: () => {},
};

export default Button;
