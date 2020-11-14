import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.css';

const propTypes = {
  value: PropTypes.string.isRequired,
  elementType: PropTypes.string.isRequired,
  elementConfig: PropTypes.shape({
    type: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      displayValue: PropTypes.string.isRequired,
    })),
  }).isRequired,
  name: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
};

const Input = (props) => {
  const {
    value, elementType, elementConfig, name, changed,
  } = props;

  let inputElement = null;

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={classes.InputElement}
          placeholder={elementConfig.placeholder}
          id={name}
          name={name}
          value={value}
          type={elementConfig.type}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={classes.InputElement}
          placeholder={elementConfig.placeholder}
          id={name}
          name={name}
          type={elementConfig.type}
          onChange={changed}
        />
      );
      break;
    case ('select'):
      inputElement = elementConfig.options && (
        <select
          className={classes.InputElement}
          id={name}
          name={name}
          onChange={changed}
        >
          {elementConfig.options.map(
            (o) => (
              <option
                key={o.value}
                value={o.value}
              >
                {o.displayValue}
              </option>
            ),
          )}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          placeholder="Default placeholder"
          id="default"
          name="default"
          type="text"
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label htmlFor={name} className={classes.Label}>{elementConfig.label}</label>
      {inputElement}
    </div>
  );
};

Input.propTypes = propTypes;

export default Input;
