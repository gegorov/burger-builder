import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.module.css';

const propTypes = {
  clicked: PropTypes.func.isRequired,
};

const DrawerToggle = (props) => {
  const { clicked } = props;
  return (
    <div onClick={clicked} className={classes.DrawerToggle} role="button">
      <div />
      <div />
      <div />
    </div>
  );
};

DrawerToggle.propTypes = propTypes;

export default DrawerToggle;
