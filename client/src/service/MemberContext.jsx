import React, { createContext, useContext, useEffect, useState } from 'react';

const VITE_URL = import.meta.env.VITE_URL;
const AppContext = createContext();

export const AppProviderMembers = ({ children }) => {
   const [members, setMembers] = useState();

   const handleMembers = async () => {
      const response = await fetch(`${VITE_URL}members`)
      const data = await response.json()
      setMembers(data)
   }
   useEffect(() => {
      handleMembers()
   }, [])

   return (
      <AppContext.Provider value={{ members, handleMembers }}>
         {children}
      </AppContext.Provider>
   );
}

export const useContextMembers = () => {
   return useContext(AppContext);
};
