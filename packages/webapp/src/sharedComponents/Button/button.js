/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon/Icon';
import Style from './button.module.scss';

const Button = (props) => {
  const {
    btntype,
    isActive,
    customClass,
    buttonValue,
    clickHandler,
    className,
    id,
    icon,
    btnText,
    iconSize,
    iconPosition,
  } = props;
  const myclass = isActive ? customClass : 'disabled';
  return btntype === 'btnContinue' ? (
    <button type="submit" className="btnContinue" id="signup-btn">
      {btnText}
    </button>
  ) : (
    <button
      type={btntype}
      id={id}
      className={`${Style.btn} ${Style[myclass]}  ${className} ${Style[iconPosition]}`}
      onClick={clickHandler}
    >
      {icon ? <span>{buttonValue}</span> : (
        <>
          {' '}
          { buttonValue }
        </>
      )}

      {icon && (
        <Icon icon={icon} iconSize={iconSize || '20px'} />
      )}
    </button>
  );
};

Button.defaultProps = {
  customClass: '',
  className: '',
  isActive: false,
  buttonValue: '',
  icon: '',
  iconPosition: '',
  iconSize: '',
  clickHandler: () => {},
  btntype: 'button',
};

Button.propTypes = {
  buttonValue: PropTypes.string,
  btntype: PropTypes.string,
  isActive: PropTypes.bool,
  clickHandler: PropTypes.func,
  id: PropTypes.string.isRequired,
  icon: PropTypes.string,
  customClass: PropTypes.string,
  className: PropTypes.string,
  iconPosition: PropTypes.string,
  iconSize: PropTypes.string,
  btnText: PropTypes.string.isRequired, // value of button

};
export default Button;
