import { combineReducers } from 'redux';

import home from './home';
import question from './question';
import questionDetail from './questionDetail';

const RootReducer = combineReducers({
	home,
	question,
	questionDetail,
});

export default RootReducer;