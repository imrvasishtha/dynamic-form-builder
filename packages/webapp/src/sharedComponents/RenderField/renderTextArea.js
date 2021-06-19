import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from './renderField.module.scss';

class RenderTextArea extends PureComponent {
  render() {
    const {
      input,
      placeholder,
      Cssclass,
      id,
      meta: { touched, error, warning },
      disabled,
    } = this.props;

    const disabledStyle = {
      background: 'transparent',
      border: 'none',
      fontSize: '25px',
      fontWeight: '600',
    };

    return (
      <>
        {Cssclass === undefined ? (
          <div className="form-group">
            <div>
              <textarea
                className={`form-control ${
                  touched && error ? `redrim ${style.errorfield}` : ''
                }`}
                {...input}
                placeholder={placeholder}
                style={disabled && disabledStyle}
                disabled={disabled}
                rows="4"
              />

              {touched &&
                ((error && (
                  <p
                    style={{
                      color: '#ba220a',
                    }}
                    name={error}
                    className="validationError"
                  >
                    {error}
                  </p>
                )) ||
                  (warning && <p style={{ color: '#ba220a' }}>{warning}</p>))}
            </div>
          </div>
        ) : (
          <textarea
            className={Cssclass}
            {...input}
            placeholder={placeholder}
            id={id}
            autoComplete="on"
            rows="4"
          />
        )}
      </>
    );
  }
}

RenderTextArea.propTypes = {
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  Cssclass: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};
export default RenderTextArea;
