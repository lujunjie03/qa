//Actions
const SAVE = 'QUESTIONDETAIL.SAVE';
const FOLLOW = 'QUESTIONDETAIL.FOLLOW';
const CANCEL_FOLLOW = 'QUESTIONDETAIL.CANCEL_FOLLOW';


const initialState = {
	data: {},
	id: undefined,
	reply: [],
};

export default function reducer(state = initialState, actionObj = {}) {
	switch (actionObj.type) {
		case SAVE: 
			return (() =>{
				const { data, id, reply } = actionObj.action;
				return { ...state, data, id, reply };
			})();
		case FOLLOW:
			return (() => {
				const { data } = state;
				const follow = data.follow + 1;
	        	const isFollow = 1;
				return { ...state, data: { ...data, follow, isFollow } }
			})();
		case CANCEL_FOLLOW:
			return (() =>{
				const { data } = state;
				const follow = data.follow - 1;
	        	const isFollow = 0;
				return{ ...state, data: { ...data, follow, isFollow } };
			})();
		default:
			return state;
	}
}

//Action creators
export function saveQuestionDetail(action) {
	return { type: SAVE, action };
}

export function follow(action) {
	return { type: FOLLOW };
}

export function cancel(action) {
	return { type: CANCEL_FOLLOW };
}