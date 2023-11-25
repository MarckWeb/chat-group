import React, { createContext, useContext, useEffect, useState } from 'react';

const VITE_URL = import.meta.env.VITE_URL;
const AppContext = createContext();

export const AppProviderChannels = ({ children }) => {
   const [channels, setChannels] = useState();

   const handleChannels = async () => {
      const response = await fetch(`${VITE_URL}channel`)
      const data = await response.json()
      setChannels(data)
   }
   useEffect(() => {
      handleChannels()
   }, [])

   return (
      <AppContext.Provider value={{ channels, handleChannels }}>
         {children}
      </AppContext.Provider>
   );
}

export const useContextChannels = () => {
   return useContext(AppContext);
};
