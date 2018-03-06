//Actions
const CREATE = 'QUESTION.CREATE';


const initialState = {
	data: undefined,
	keyword: '',
};

export default function reducer(state = initialState, actionObj = {}) {
	switch (actionObj.type) {
		case CREATE: 
			const { data, keyword } = actionObj.action;
			return { ...state, data, keyword };
		default:
			return state;
	}
}

//Action creators
export function createQuestion(action) {
	return { type: CREATE, action };
}