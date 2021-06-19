/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RenderField extends PureComponent {
  render() {
    const {
      input,
      placeholder,
      type,
      Cssclass,
      id,
      meta: { touched, error, warning },
      message,
      disabled,
      deleteHandler,
      autoFocus,
      icon,
      areaHeight,
      units,
      maxChar,
      height,
    } = this.props;

    let displayField;
    let existError = false;
    if (
      message
      && (input.name === 'name'
        || input.name === 'Website'
        || input.name === 'companyName')
    ) {
      existError = true;
    }
    switch (type) {
      case 'textarea':
        displayField = (
          <textarea
            className={`form-control form-control-lg txtarea ${
              touched && (error || message) ? 'error' : ''
            }`}
            style={{ height: areaHeight }}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            {...input}
          />
        );
        break;

      case 'currency':
        displayField = (
          <section style={{ position: 'relative' }}>
            <span
              className="currencysymbol"
              style={{
                position: 'absolute',
                left: '7px',
                top: '10px',
                color: '',
              }}
            >
              £
            </span>
            <input
              type="number"
              className="form-control form-control-lg"
              placeholder={placeholder}
              id={id}
              autoComplete="on"
              style={{ paddingLeft: '25px' }}
              {...input}
            />
          </section>
        );
        break;
      case 'Icon':
        displayField = (
          <section style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                color: '',
              }}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                onClick={deleteHandler}
                cursor="pointer"
              >
                <path d={icon} fill="#4e5d78" />
              </svg>
            </span>
            <input
              type="type"
              className="form-control textbox form-control-lg"
              placeholder={placeholder}
              id={id}
              autoComplete="on"
              {...input}
            />
          </section>
        );
        break;
      case 'contact':
        displayField = (
          <section style={{ position: 'relative' }}>
            <img
              src="assets/jpg/london.png"
              className="contactFieldFlag"
              height="18px"
              alt="flag"
            />
            <span className="contactCountryCode">+44</span>
            <input
              type="number"
              className="form-control form-control-lg contactfield"
              placeholder={placeholder}
              id={id}
              autoComplete="on"
              style={{ paddingLeft: '25px' }}
              {...input}
            />
          </section>
        );
        break;

      case 'units': {
        let css = {
          position: 'absolute',
          right: '10px',
          top: '12px',
          color: '#B0B7C3',
          height: '24px',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: '500',
          letterSpacing: '0',
          lineHeight: '24px',
        };
        if (units === '£') {
          css = {
            position: 'absolute',
            left: '10px',
            top: '12px',
            height: '24px',
            color: '#B0B7C3',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: '500',
            letterSpacing: '0',
            lineHeight: '24px',
          };
        }
        displayField = (
          <section style={{ position: 'relative' }}>
            <span style={css}>{units}</span>
            <input
              width="40%"
              className={`form-control form-control-lg ${
                touched && (error || existError) ? 'error' : ''
              }`}
              placeholder={placeholder}
              type="number"
              disabled={disabled}
              autoFocus={autoFocus}
              style={{ paddingLeft: '25px', height: '48px' }}
              {...input}
            />
          </section>
        );
        break;
      }
      case 'limitChar':
        displayField = (
          <input
            width="40%"
            className={`form-control form-control-lg ${
              touched && (error || existError) ? 'error' : ''
            }`}
            style={{ height: '48px' }}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            autoFocus={autoFocus}
            {...input}
            maxLength={maxChar}
          />
        );
        break;
      default:
        displayField = (
          <input
            width="40%"
            className={`form-control textbox form-control-lg ${
              touched && (error || existError) ? 'error' : ''
            }`}
            style={{ height }}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            id={id}
            autoFocus={autoFocus}
            {...input}
          />
        );
        break;
    }
    return (
      <>
        {Cssclass === undefined ? (
          <section className="form-group">
            <section>
              {displayField}
              {touched
                && ((error && error !== 'Duplicate Email' && (
                  <p name={error} className="validationError text-danger">
                    {error}
                  </p>
                ))
                  || (warning && <p>{warning}</p>))}
            </section>
          </section>
        ) : (
          <input
            className={Cssclass}
            placeholder={placeholder}
            id={id}
            type={type}
            autoComplete="on"
            autoFocus={autoFocus}
            {...input}
          />
        )}
      </>
    );
  }
}

RenderField.defaultProps = {
  areaHeight: '120px',
  height: '48px',
};

RenderField.propTypes = {
  type: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object,
  Cssclass: PropTypes.string,
  deleteHandler: PropTypes.func,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  message: PropTypes.string,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
  icon: PropTypes.string,
  viewBox: PropTypes.string,
  areaHeight: PropTypes.string,
  units: PropTypes.string,
  maxChar: PropTypes.number,
  height: PropTypes.string,
};

const mapStateToProps = () => ({
  // message: state.company.message,
});

export default connect(mapStateToProps, null)(RenderField);
