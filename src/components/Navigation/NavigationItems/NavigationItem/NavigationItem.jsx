import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.css';

const propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
const NavigationItem = (props) => {
  const { children, link } = props;
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} exact activeClassName={classes.active}>{children}</NavLink>
    </li>
  );
};

NavigationItem.propTypes = propTypes;

export default NavigationItem;
