import React, { createContext, useContext, useEffect, useState } from 'react';

const VITE_URL = import.meta.env.VITE_URL;
const AppContext = createContext();

export const AppProviderUsers = ({ children }) => {
   const [users, setUsers] = useState();

   const handleUsers = async () => {
      const response = await fetch('http://localhost:3000/api/user')
      const data = await response.json()
      console.log(data)
      setUsers(data)
   }
   useEffect(() => {
      handleUsers()
   }, [])

   return (
      <AppContext.Provider value={{ users }}>
         {children}
      </AppContext.Provider>
   );
}

export const useContextUsers = () => {
   return useContext(AppContext);
};
