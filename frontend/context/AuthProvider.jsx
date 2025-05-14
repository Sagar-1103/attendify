import {useContext, createContext, useState} from 'react';

const AuthContext = createContext();

const AuthProvider = props => {
  const [user,setUser] = useState(null);
  const [token,setToken] = useState(null);
    return (
    <AuthContext.Provider
      value={{user,setUser,token,setToken}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);