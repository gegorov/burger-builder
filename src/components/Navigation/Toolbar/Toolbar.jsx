import React from 'react';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.module.css';

const propTypes = {
  drawerToggleClicked: PropTypes.func.isRequired,
};
const Toolbar = (props) => {
  const { drawerToggleClicked } = props;
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <Logo height="80%" />
      <nav className={classes.DeskTopOnly}>
        <NavigationItems />
      </nav>
    </header>
  );
};

Toolbar.propTypes = propTypes;

export default Toolbar;
