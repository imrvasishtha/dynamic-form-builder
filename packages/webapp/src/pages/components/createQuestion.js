/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable  no-tabs */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { reduxForm, getFormValues, Field } from 'redux-form';
import { withTranslation } from 'i18nConfig';
import { Modal, FormGroup } from 'react-bootstrap';
import RenderField from 'sharedComponents/RenderField/renderfield';
import { required } from 'validation/commonValidation';

/**
 * Popup modal for create/edit challenge
 */
class CreateSubmissionModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      multiChoiceAnswer: '',
      multiChoices: ['', '', ''],
    };
  }

  componentDidMount() {
    this.initializeForm();
  }

  initializeForm = () => {
    const { initialize } = this.props;
    initialize({ answerType: 'text', title: '' });
  };

  checkAnswerType = e => {
    if (e.target.value === 'multichoice') {
      this.setState({
        multiChoiceAnswer: true,
      });
    } else {
      this.setState({
        multiChoiceAnswer: false,
      });
    }
  };

  render() {
    const { multiChoiceAnswer, multiChoices } = this.state;

    const {
      isModal,
      toggleCreateQuesModal,
      handleSubmit,
      saveQuestion,
    } = this.props;

    return (
      <>
        <Modal show={isModal} onHide={() => {}} size="lg">
          <form name="create-submission" onSubmit={handleSubmit(saveQuestion)}>
            <Modal.Header
              className="p-2 border-0"
              style={{ backgroundColor: 'rgb(28, 38, 44)' }}
            >
              <Modal.Title className="w-100">
                <div className="col-12 d-flex align-items-center justify-content-between text-white font-weight-bold">
                  <small className="font-weight-bold">Submit an question</small>
                  <button
                    className="bg-transparent border-0 text-white"
                    onClick={() => toggleCreateQuesModal(0)}
                    style={{ fontSize: '30px' }}
                    type="button"
                  >
                    &times;
                  </button>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              className="pb-4 border-secondary border-top"
              style={{ backgroundColor: 'rgb(28, 38, 44)' }}
            >
              <div className="pt-4 text-white pl-4 pr-4">
                <label htmlFor="action">Question/Title</label>
                <FormGroup id="action" name="formGroup" className="mb-2">
                  <Field
                    name="title"
                    component={RenderField}
                    type="text"
                    validate={required}
                    Cssclass="bg-transparent form-control text-white border-secondary"
                  />
                </FormGroup>
              </div>

              <div className="pt-4 text-white pl-4 pr-4">
                <label htmlFor="action">Answer Type</label>
                <FormGroup id="action" name="formGroup" className="mb-2">
                  <Field
                    name="answerType"
                    component="select"
                    validate={required}
                    onChange={event => this.checkAnswerType(event)}
                  >
                    <option value="text">Text</option>
                    <option value="multichoice">Multichoice Checkbox</option>
                    <option value="radio">Single select radio</option>
                  </Field>
                  {multiChoiceAnswer && (
                    <div>
                      {multiChoices.map((ele, index) => (
                        <div className="pt-4 text-white pl-4 pr-4" key={index}>
                          <label htmlFor="action">{`Multichoice ${index +
                            1}`}</label>
                          <FormGroup
                            id="action"
                            name="formGroup"
                            className="mb-2"
                          >
                            <Field
                              name={`multiChoices-${index}`}
                              component={RenderField}
                              type="text"
                              validate={required}
                              Cssclass="bg-transparent form-control text-white border-secondary"
                            />
                          </FormGroup>
                        </div>
                      ))}
                    </div>
                  )}
                </FormGroup>
              </div>

              <div className="border-secondary border-top mt-4 pl-4 pr-4 pt-4">
                <div className="row m-0">
                  <div className="col-8 p-0"></div>
                  <div className="col-4 text-right">
                    <button
                      type="submit"
                      className="btnContinue ml-3 pt-2 pb-2 font-weight-bold"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>{' '}
          </form>
        </Modal>
      </>
    );
  }
}

CreateSubmissionModal.propTypes = {
  isModal: PropTypes.bool.isRequired,
  toggleCreateQuesModal: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  createSubmission: PropTypes.func.isRequired,
  challengeData: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
};

export default connect(state => ({
  formValues: getFormValues('create-submission')(state),
}))(
  withRouter(
    reduxForm({
      form: 'create-submission',
      destroyOnUnmount: false, // preserve form data
      forceUnregisterOnUnmount: true, // unregister fields on unmount
    })(withTranslation('common')(CreateSubmissionModal)),
  ),
);
