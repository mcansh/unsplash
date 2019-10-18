import React from 'react';

type Action = { type: 'login'; token: string } | { type: 'logout' };
type Dispatch = (action: Action) => void;
interface State {
  token: string | null;
}

const UserStateContext = React.createContext<State | undefined>(undefined);
const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function countReducer(_state: State, action: Action) {
  switch (action.type) {
    case 'login': {
      return { token: action.token };
    }

    case 'logout': {
      return { token: null };
    }

    default: {
      // @ts-ignore
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setToken] = React.useReducer(countReducer, { token: null });
  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={setToken}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  const context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  const context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  UserStateContext,
  UserDispatchContext,
};
