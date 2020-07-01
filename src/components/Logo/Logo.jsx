import React from 'react';
import PropTypes from 'prop-types';

import burgerLogo from '../../assets/images/burger-logo.png';

import classes from './Logo.module.css';

const propTypes = {
  height: PropTypes.string.isRequired,
};

const Logo = (props) => {
  const { height } = props;
  return (
    <div className={classes.Logo} style={{ height }}>
      <img src={burgerLogo} alt="Burger Builder" />
    </div>
  );
};

Logo.propTypes = propTypes;

export default Logo;
