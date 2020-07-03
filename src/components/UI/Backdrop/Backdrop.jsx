import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.css';

const propTypes = {
  clicked: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

const Backdrop = (props) => {
  const { clicked, show } = props;
  return show ? <div className={classes.Backdrop} onClick={clicked} /> : null;
};

Backdrop.propTypes = propTypes;
Backdrop.defaultProps = {
  show: false,
};

export default Backdrop;
