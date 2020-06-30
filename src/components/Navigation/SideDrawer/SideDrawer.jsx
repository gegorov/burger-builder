import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './SideDrawer.module.css';

const propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const SideDrawer = (props) => {
  const { closed, open } = props;

  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={open} clicked={closed} />
      <div className={attachedClasses.join(' ')}>
        <Logo height="11%" />
        <nav style={{ marginTop: '32px' }}>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

SideDrawer.propTypes = propTypes;

export default SideDrawer;
