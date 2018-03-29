//Actions
const SAVE = 'USER.SAVE';
const DEL = 'USER.DEL';


const initialState = {
	name: '未登录', 
	photo: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3987166397,2421475227&fm=27&gp=0.jpg',
};

export default function reducer(state = initialState, actionObj = {}) {
	switch (actionObj.type) {
		case SAVE: 
			const { data } = actionObj.action;
			return { ...state, ...data };
		case DEL:
			return { ...initialState };
		default:
			return state;
	}
}

//Action creators
export function saveUser(action) {
	return { type: SAVE, action };
}

export function delUser(action) {
	return { type: DEL, action };
}