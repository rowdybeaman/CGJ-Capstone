import { createContext, useReducer, useEffect } from "react";

const initialState = {
  userId: null,
  token: null,
  exp: null,
  username: null
};

const AuthContext = createContext(initialState);

const getLocalData = () => {
  const storedToken = localStorage.getItem("token");
  const storedExp = localStorage.getItem("exp");
  const storedId = localStorage.getItem("userId");
  const storedName = localStorage.getItem("username");

  let remainingTime = storedExp - new Date().getTime();
  if (remainingTime < 0) {
    localStorage.clear();
    return null;
  }

  return {
    token: storedToken,
    exp: storedExp,
    userId: storedId,
    username: storedName
  };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      let { token, exp, userId, username } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("exp", exp);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      return { ...state, token, exp, userId, username };
    case "LOGOUT":
      localStorage.clear();
      return initialState;
    case "RETURNING_USER":
      let { token: t, userId: u, exp: e, username: n } = action.payload;
      return { ...state, token: t, userId: u, exp: e, username: n };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    let localData = getLocalData();
    if (localData) {
      dispatch({ type: "RETURNING_USER", payload: localData });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
