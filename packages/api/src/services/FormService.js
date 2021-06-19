const Form = require('../models/form');

// all form services
class FormService {
  // creating new form
  async createForm(formObj) {
    var newForm = new Form({
      formName: formObj.formName,
      questions: formObj.questions,
    });

    const result = await newForm.save();
    return result;
  }
}

module.exports = FormService;
