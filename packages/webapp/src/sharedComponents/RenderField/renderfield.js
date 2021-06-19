import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './renderField.module.scss';

class RenderField extends PureComponent {
  render() {
    const {
      input,
      placeholder,
      type,
      Cssclass,
      meta: { touched, error, warning },
      disabled,
      rows,
      cols,
    } = this.props;

    const disabledStyle = {
      background: 'transparent',
      border: 'none',
      fontSize: '25px',
      fontWeight: '600',
    };

    // add switch state based on input type
    const inputField = () => {
      switch (type) {
        case 'textarea':
          return (
            <div className="form-group m-0">
              <textarea
                className={
                  Cssclass ||
                  `form-control m-0 ${
                    touched && error ? `redrim ${style.errorfield}` : ''
                  }`
                }
                {...input}
                placeholder={placeholder}
                rows={rows}
                cols={cols}
              />
            </div>
          );
        case 'money':
          return (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">£</span>
              </div>
              <input
                className={`form-control m-0 ${
                  touched && error ? `redrim ${style.errorfield}` : ''
                }`}
                {...input}
                placeholder={placeholder}
                rows={rows}
                type="number"
                cols={cols}
              />
            </div>
          );
        case 'phone':
          return (
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text">+44</span>
              </div>
              <input
                className={`form-control m-0 ${
                  touched && error ? `redrim ${style.errorfield}` : ''
                }`}
                {...input}
                placeholder={placeholder}
                rows={rows}
                type="number"
                cols={cols}
              />
            </div>
          );

        default:
          return (
            <>
              <div className="form-group m-0">
                <div>
                  <input
                    className={
                      Cssclass ||
                      `form-control ${
                        touched && error ? `redrim ${style.errorfield}` : ''
                      }`
                    }
                    {...input}
                    placeholder={placeholder}
                    type={type}
                    style={disabled ? disabledStyle : { height: '40px' }}
                    disabled={disabled}
                  />
                </div>
              </div>
            </>
          );
      }
    };

    return (
      <>
        {inputField()}
        {touched &&
          ((error && (
            <p
              style={{ color: '#ba220a' }}
              name={error}
              className="validationError"
            >
              {error}
            </p>
          )) ||
            (warning && <p style={{ color: '#ba220a' }}>{warning}</p>))}
      </>
    );
  }
}

RenderField.defaultProps = {
  cols: 30,
  rows: 5,
  placeholder: '',
  Cssclass: null,
  disabled: false,
};

RenderField.propTypes = {
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  Cssclass: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
};
export default RenderField;
