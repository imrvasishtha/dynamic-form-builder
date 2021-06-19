import { PureComponent } from 'react';
import { reduxForm, getFormValues, Field } from 'redux-form';
import { FormGroup } from 'react-bootstrap';
import RenderField from 'sharedComponents/RenderField/renderfield';
import { required } from 'validation/commonValidation';
import { connect } from 'react-redux';
import router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import { fetchForms } from 'reducer/form';
import { withTranslation } from 'i18nConfig';
import getConfig from 'next/config';
import moment from 'moment';

const { publicRuntimeConfig } = getConfig();

class FormListingPage extends PureComponent {
  async componentDidMount() {
    const { fetchForms } = this.props;
    await fetchForms();
  }

  render() {
    const { formListing } = this.props;

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-1" />
            <div className="col-10">
              <div
                className={`border-secondary border rounded my-3 pt-4 pb-4 text-white pl-4 pr-4`}
              >
                <table className="table text-white">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Form Name</th>
                      <th scope="col">Slug</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Total Rsp(Rnd no)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(formListing) &&
                      formListing.map((item, index) => (
                        <tr>
                          <th scope="row">{index + 1} </th>
                          <td>{item.formName}</td>
                          <td>
                            <u
                              className="btn btn-primary"
                              onClick={() =>
                                window.open(
                                  `${publicRuntimeConfig.ApiBaseUrl}/form?_id=${item._id}`,
                                )
                              }
                            >
                              form/{item._id}
                            </u>
                          </td>
                          <td>
                            {moment(item.createdAt).format('Do MMM')}
                            {` `}
                            {moment(item.createdAt).format('hh:mm a')}
                          </td>
                          <td>{Math.floor(Math.random() * 100 + 1)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

FormListingPage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

FormListingPage.propTypes = {
  formListing: PropTypes.array.isRequired,
  fetchForms: PropTypes.func.isRequired,
};
const mapStateToProps = state => {
  return {
    formListing: state.dynamicForm.formListing,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchForms: payload => dispatch(fetchForms(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withTranslation('common')(FormListingPage)));
