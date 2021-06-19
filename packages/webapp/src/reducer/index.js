import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { reducer as formReducer } from 'redux-form';
import storage from 'redux-persist/lib/storage';

// dynamicFormReducer
import dynamicFormReducer from './form';

// persist config for auth reducer
const dynamicFormPersistConfig = {
  key: 'dynamicForm',
  storage,
  whitelist: [],
};

export default combineReducers({
  dynamicForm: persistReducer(dynamicFormPersistConfig, dynamicFormReducer),
  form: formReducer,
});
