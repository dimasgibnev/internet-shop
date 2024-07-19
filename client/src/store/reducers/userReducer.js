import { ROLE } from "../../constants";

const initialUserState = {
	id: '',
	name: '',
	roleId: ROLE.GUEST,
	registredAT: ''
}


export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case 0:

			return state;

		default:
			return initialUserState
	}
}