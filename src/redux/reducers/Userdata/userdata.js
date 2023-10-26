import {
	USER_DATA,
	USER_LOADING,
	UPDATE_USER,
	USER_ROLES,
} from "../../actions/Userdata/userdata";

const initialState = {
	data: [],
	isLoading: false,
	createMsg: null,
	updateMsg: null,
	userRoles: [],
};

const User = (state = initialState, action) => {
	switch (action.type) {
		case USER_DATA:
			return {
				...state,
				data: action.data,
				isLoading: false,
			};
		case USER_LOADING:
			return { ...state, isLoading: true };

		case UPDATE_USER:
			return { ...state, updateMsg: action.data };

		case USER_ROLES:
			return { ...state, userRoles: action.data };

		default:
			return state;
	}
};
export default User;
