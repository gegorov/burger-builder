import React from 'react';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.css';

const propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
const NavigationItem = (props) => {
  const { active, children, link } = props;
  return (
    <li className={classes.NavigationItem}>
      <a href={link} className={active ? classes.active : null}>{children}</a>
    </li>
  );
};

NavigationItem.propTypes = propTypes;

export default NavigationItem;
