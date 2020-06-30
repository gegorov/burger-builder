import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css';

const propTypes = {
  children: PropTypes.element.isRequired,
};

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
    };
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => ({ showSideDrawer: !prevState.showSideDrawer }));
  }

  render() {
    const { children } = this.props;
    const { showSideDrawer } = this.state;

    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <div>
          Toolbar, SideDrawer, Backdrop
        </div>
        <main className={classes.Content}>
          {children}
        </main>
      </Aux>
    );
  }
}
Layout.propTypes = propTypes;

export default Layout;
