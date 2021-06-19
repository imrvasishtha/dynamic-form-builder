import React from 'react';
import PropTypes from 'prop-types';
import style from './button.module.scss';

/**
 * coming soon pill for awaited content
 *
 * @param props
 */

/**
 * @param props
 */
function ComingSoon(props) {
  const { className } = props;
  return (
    <small className={`border p-1 font-weight-bold rounded-pill text-white ${className} ${style.comingSoon}`}>Coming soon</small>
  );
}

ComingSoon.defaultProps = {
  className: '',
};

ComingSoon.propTypes = {
  className: PropTypes.string,
};

export default ComingSoon;
