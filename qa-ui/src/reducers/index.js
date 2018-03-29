import { combineReducers } from 'redux';

import home from './home';
import question from './question';
import questionDetail from './questionDetail';
import user from './user';

const RootReducer = combineReducers({
	user,
	home,
	question,
	questionDetail,
});

export default RootReducer;