import {
  CLINIC_AUTHENTICATE,
  CLINIC_LOGOUT,
} from "../actions/clinicAuth";

const initialState = {
  token: null,
  userId: null,
  userType:null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CLINIC_AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        userType:action.userType
      };
    case CLINIC_LOGOUT:
      return initialState;
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
