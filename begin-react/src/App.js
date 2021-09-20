import React, { useReducer, useMemo, createContext } from "react";
import produce from "immer";
import CreateUser from "./CreateUser";
import UserList from "./UserList";

const countActiveUsers = (users) => {
  return users.filter((user) => user.active).length;
};

export const UserDispatch = createContext(null);

const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_USER":
      return produce(state, (draft) => {
        draft.user.push(action.user);
      });
    // return {
    //   inputs: initialState.inputs,
    //   users: [...state.users, action.user],
    // };
    case "TOGGLE_USER":
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
        return user;
      });
    // return {
    //   ...state,
    //   users: state.users.map((user) =>
    //     user.id === action.id ? { ...user, active: !user.active } : user
    //   ),
    // };
    case "REMOVE_USER":
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.user.splice(index, 1);
      });
    // return {
    //   ...state,
    //   users: state.users.filter((user) => user.id !== action.id),
    // };
    default:
      throw new Error("Unhandled action");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => {
    countActiveUsers(users);
  }, [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
};

export default App;
