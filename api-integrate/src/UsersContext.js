import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

const initialState = {
  users: {
    loading: false,
    data: null,
    error: null,
  },
  user: {
    loading: false,
    data: null,
    error: null,
  },
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data) => ({
  loading: false,
  data,
  error: null,
});

const error = (e) => ({
  loading: false,
  data: null,
  error: e,
});

const usersReducer = (state, action) => {
  // GET_USERS
  // GET_USERS_SUCCESS
  // GET_USERS_ERRROR

  // GET_USER
  // GET_USER_SUCCESS
  // GET_USER_ERROR

  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: loadingState,
      };
    case "GET_USERS_SUCCESS":
      return {
        ...state,
        users: success(action.data),
      };
    case "GET_USERS_ERROR":
      return {
        ...state,
        users: error(action.error),
      };
    case "GET_USER":
      return {
        ...state,
        user: loadingState,
      };
    case "GET_USER_SUCCESS":
      return {
        ...state,
        user: success(action.data),
      };
    case "GET_USER_ERROR":
      return {
        ...state,
        user: error(action.error),
      };
    default:
      return new Error("Unhandled action", action.type);
  }
};

// children 컴포넌트에서 UsersStateContext, UsersProviderContext 를 샤용할 수 있도록 구성
// UsersStateContext, UsersProviderContext 를 하나의 Provider 에서 모두 사용할 수 있도록 구성

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);
  return (
    <UsersStateContext.Provider value={state}>
      <UsersDispatchContext.Provider value={dispatch}>
        {children}
      </UsersDispatchContext.Provider>
    </UsersStateContext.Provider>
  );
};

// UsersStateContext 와 UsersDispatchContext 를 children 컴포넌트에서 쉽게 사용하기 위한 함수

export const useUsersState = () => {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }
  return state;
};

export const useUsersDispatch = () => {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UserProvider");
  }
  return dispatch;
};

export const getUsers = async (dispatch) => {
  dispatch({ type: "GET_USERS" });
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch({ type: "GET_USERS_SUCCESS", data: res.data });
  } catch (e) {
    dispatch({ type: "GET_USERS_ERROR", error: e });
  }
};

export const getUser = async (dispatch, id) => {
  dispatch({ type: "GET_USER" });
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    dispatch({ type: "GET_USER_SUCCESS", data: res.data });
  } catch (e) {
    dispatch({ type: "GET_USER_ERROR", error: e });
  }
};
