import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.css';

const propTypes = {
  children: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  btnType: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

const Button = (props) => {
  const {
    children, clicked, btnType, type,
  } = props;
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={clicked}
      className={[classes.Button, classes[btnType]].join(' ')}
    >
      {children}
    </button>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = {
  type: 'button',
};

export default Button;
