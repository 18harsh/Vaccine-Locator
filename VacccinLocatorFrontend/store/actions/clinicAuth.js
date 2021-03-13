import AsyncStorage from "@react-native-async-storage/async-storage";

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const CLINIC_AUTHENTICATE = "CLINIC_AUTHENTICATE";
export const CLINIC_LOGOUT = "CLINIC_LOGOUT";

let timer;

export const authenticate = (userId, token, expiryTime,userType) => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: CLINIC_AUTHENTICATE, userId: userId, token: token,userType:userType });
  };
};


export const signup = (clinicName, phoneNo, password, address_string, clinic_coordinates ) => {
  return async dispatch => {
    const response = await fetch("http://10.0.2.2:4000/register/clinic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "clinicName": clinicName,
          "clinicId": phoneNo,
          "clinicPassword": password,
          "clinicAddress": String(address_string),
          "clinicCoordinates": {
            "type":"Point",
            "coordinates":clinic_coordinates,
          }
        }),
      },
    );


    const resData = await response.json();
    console.log(resData.errorMessage);
    if (resData.errorMessage !== undefined) {
      return resData.errorMessage;
    }
    return resData
    // dispatch(
    //   authenticate(
    //     resData.tokens[0].token,
    //     resData._id,
    //     parseInt(3600) * 1000,
    //   ),
    // );
    // const expirationDate = new Date(
    //   new Date().getTime() + parseInt(3600) * 1000,
    // );
    // saveDataToStorage(resData.tokens[0].token, resData._id, expirationDate);
  };
};

export const login = (email, password) => {
  console.log("Entered")
  return async dispatch => {
    const response = await fetch(
      "http://10.0.2.2:4000/login/clinic",
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
    console.log("response", resData);
    // console.log();
    if (resData.errorMessage !== undefined) {
      return resData;
    }
    dispatch(
      authenticate(
        resData.token,
        resData.userId,
        parseInt(3600) * 1000,
        "clinic"
      ),
    );
    const expirationDate = new Date(
      new Date().getTime() + parseInt(3600) * 1000,
    );
    saveDataToStorage(  resData.token, resData.userId, expirationDate,"clinic");


    return resData;

  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: CLINIC_LOGOUT };
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
