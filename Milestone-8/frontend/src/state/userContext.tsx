import axios from 'axios';
import React, { createContext, useCallback, useState } from 'react';

interface UserContextProps {
  username: string;
  setUsername: (username: string) => void;
  saveTree: (tree: any) => void;
}

export const UserContext = createContext<UserContextProps>({
  username: '',
  setUsername: () => {},
  saveTree: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState('');

  const saveTree = useCallback(async (tree: any) => {
    await axios.put(`http://localhost:3001/users/${username}/tree`, { tree });
  }, [username]);

  return (
    <UserContext.Provider value={{ username, setUsername, saveTree }}>
      {children}
    </UserContext.Provider>
  );
};
