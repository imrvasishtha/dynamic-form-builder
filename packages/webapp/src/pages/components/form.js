import { PureComponent } from 'react';
import { reduxForm, getFormValues, Field } from 'redux-form';
import { FormGroup } from 'react-bootstrap';
import RenderField from 'sharedComponents/RenderField/renderfield';
import { required } from 'validation/commonValidation';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import CreateQuestionModal from './createQuestion';
import PropTypes from 'prop-types';

class AddForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      showQuestionModal: false,
      questions: [],
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    this.initializeForm();
  }

  initializeForm = () => {
    const { initialize } = this.props;
    initialize({ formName: '' });
  };

  toggleCreateQuesModal = () => {
    const { showQuestionModal } = this.state;
    this.setState({
      showQuestionModal: !showQuestionModal,
    });
  };

  submitForm = async values => {
    const { questions } = this.state;
    const { saveNewForm } = this.props;

    const finalQuestions = [];
    questions.forEach(ele => {
      const obj = {};
      obj.title = ele.title;
      obj.answerType = ele.answerType;
      obj.multiChoices = ele['multiChoices-0']
        ? [ele['multiChoices-0'], ele['multiChoices-1'], ele['multiChoices-2']]
        : undefined;
      finalQuestions.push(obj);
    });

    await saveNewForm({ formName: values.formName, questions: finalQuestions });
    this.setState(this.baseState);
    this.initializeForm();
  };

  saveQuestion = values => {
    const { questions } = this.state;

    this.setState({
      questions: [...questions, values],
    });
    this.toggleCreateQuesModal();
  };

  render() {
    const { showQuestionModal, questions } = this.state;
    const { handleSubmit } = this.props;

    return (
      <>
        {showQuestionModal && (
          <CreateQuestionModal
            isModal={showQuestionModal}
            toggleCreateQuesModal={this.toggleCreateQuesModal}
            showQuestionModal={showQuestionModal}
            saveQuestion={this.saveQuestion}
          />
        )}
        <div className="container">
          <div className="row">
            <div className="col-2" />
            <div className="col-8">
              <div
                className={`border-secondary border rounded my-3 pt-4 pb-4 text-white pl-4 pr-4`}
              >
                <form
                  name="create-link"
                  onSubmit={handleSubmit(this.submitForm)}
                >
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={this.toggleCreateQuesModal}
                      className="btnContinue ml-2 pt-2 pb-2 font-weight-bold"
                    >
                      Add Question
                    </button>
                  </div>
                  <label htmlFor="action" className="py-2">
                    Form Name
                  </label>
                  <FormGroup id="action" name="formGroup" className="mb-2">
                    <Field
                      name="formName"
                      component={RenderField}
                      validate={required}
                      type="text"
                      Cssclass="bg-transparent form-control text-white border-secondary"
                      placeholder="Please enter form name"
                    />
                  </FormGroup>

                  <div className="row m-0 pt-2">
                    <div className="col-1 m-0 p-0">
                      <button
                        type="submit"
                        className="btnContinue pt-2 pb-2 mr-2 font-weight-bold"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="my-2">
                    {' '}
                    {Array.isArray(questions) &&
                      questions.map((item, index) => (
                        <div>
                          <h3>Question you added in this form:</h3>
                          <label>{`Question ${index + 1}`}</label>
                          <p>Question Title: {item.title}</p>
                          <p>Answer Type: {item.answerType}</p>
                          {item.answerType === 'multichoice' && (
                            <div>
                              <p>{`Multichoice 1: ${item['multiChoices-0']}`}</p>
                              <p>{`Multichoice 2: ${item['multiChoices-1']}`}</p>
                              <p>{`Multichoice 3: ${item['multiChoices-2']}`}</p>
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AddForm.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

AddForm.propTypes = {
  formLinks: PropTypes.array.isRequired,
  saveNewForm: PropTypes.func.isRequired,
};

export default connect(state => ({
  formValues: getFormValues('AddFrom')(state),
}))(
  withRouter(
    reduxForm({
      form: 'AddFrom',
    })(AddForm),
  ),
);
