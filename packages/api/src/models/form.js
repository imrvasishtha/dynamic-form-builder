// form schema

var mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: { type: String },
  answerType: { type: String },
  multiChoices: [{ type: String }],
});

const formSchema = new Schema(
  {
    formName: { type: String },
    questions: [questionSchema],
  },
  { timestamps: true },
);

formSchema.plugin(mongoosePaginate);
const Form = mongoose.model('form', formSchema);
module.exports = Form;
