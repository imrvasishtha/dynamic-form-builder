import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import style from './renderField.module.scss';

class datePicker extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
  }

  componentDidMount() {
    const { input, value, preFilled } = this.props;
    const { startDate } = this.state;
    let selectDate = '';
    if (value || preFilled) {
      selectDate = new Date(value || preFilled);
      this.setState({
        startDate: selectDate,
      });
    } else {
      selectDate = startDate;
    }
    input.onChange(selectDate);
  }

  handleChange = date => {
    this.setState({
      startDate: date,
    });
    const { input } = this.props;
    input.onChange(date);
  };

  render() {
    const { startDate } = this.state;
    const { showMonthYearPicker, dateFormat } = this.props;
    return (
      <div className={`${style.datepicker}`}>
        <DatePicker
          selected={startDate}
          onChange={this.handleChange}
          dateFormat={dateFormat}
          className="w-100"
          showMonthYearPicker={showMonthYearPicker}
        />
      </div>
    );
  }
}

datePicker.defaultProps = {
  showMonthYearPicker: false,
  dateFormat: 'dd/MM/yyyy',
};

datePicker.propTypes = {
  input: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  preFilled: PropTypes.string.isRequired,
  showMonthYearPicker: PropTypes.bool,
  dateFormat: PropTypes.string,
};

export default datePicker;
