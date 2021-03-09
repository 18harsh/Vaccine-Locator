import AsyncStorage from "@react-native-async-storage/async-storage";

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime,userType) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token,userType:userType });
  };
};

export const signup = (firstName, lastName, email, password, phoneNo, aadharCardNo) => {
  return async dispatch => {
    const response = await fetch("http://10.0.2.2:4000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
          "password": password,
          "phoneNo": phoneNo,
          "aadharNo": aadharCardNo,

        }),
      },
    );


    const resData = await response.json();
    console.log(resData.errorMessage);
    if (resData.errorMessage !== undefined) {
      return resData.errorMessage
    }
    console.log(resData);
    dispatch(
      authenticate(
        resData.tokens[0].token,
        resData._id,
        parseInt(3600) * 1000,
        'Patient'
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(3600) * 1000,
    );
    saveDataToStorage(resData.tokens[0].token, resData._id, expirationDate,'Patient');
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "http://10.0.2.2:4000/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
    );

    const resData = await response.json();
    console.log("response",resData);
    // console.log();
    if (resData.errorMessage !== undefined) {
      return resData
    }
    dispatch(
      authenticate(
        resData.tokens[0].token,
        resData._id,
        parseInt(3600) * 1000,
        'Patient'
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(3600) * 1000,
    );
    saveDataToStorage(
      resData.tokens[0].token,
      resData._id,
      expirationDate,'Patient');


    return resData

  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem("userData");
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (token, userId, expirationDate,userType) => {
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
      userType:userType
    }),
  );
};
