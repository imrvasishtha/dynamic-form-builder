import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveNewForm } from 'reducer/form';
import { withTranslation } from 'i18nConfig';
import Form from './components/form';

class Index extends PureComponent {
  render() {
    const { formLinks, saveNewForm } = this.props;
    return (
      <div>
        <>
          <Form saveNewForm={saveNewForm} formLinks={formLinks} />
        </>
      </div>
    );
  }
}

Index.propTypes = {
  formLinks: PropTypes.array.isRequired,
  saveNewForm: PropTypes.func.isRequired,
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

const mapStateToProps = state => ({ formLinks: state.dynamicForm.formLinks });

const mapDispatchToProps = dispatch => ({
  saveNewForm: payload => dispatch(saveNewForm(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withTranslation('common')(Index)));
