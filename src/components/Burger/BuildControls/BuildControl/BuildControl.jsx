import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.module.css';

const propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const BuildControl = (props) => {
  const {
    label, removed, added, disabled,
  } = props;
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button
        onClick={removed}
        type="button"
        className={classes.Less}
        disabled={disabled}
      >
        Less
      </button>
      <button
        onClick={added}
        type="button"
        className={classes.More}
      >
        More
      </button>
    </div>
  );
};

BuildControl.propTypes = propTypes;

export default BuildControl;
