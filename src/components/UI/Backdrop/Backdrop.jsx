import React from 'react';
import classes from './Backdrop.module.css';

const Backdrop = (props) => {
  const { clicked, show } = props;
  return show ? <div className={classes.Backdrop} onClick={clicked} /> : null;
};

export default Backdrop;
