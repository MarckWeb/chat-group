import React, { createContext, useContext, useEffect, useState } from 'react';

const VITE_URL = import.meta.env.VITE_URL;
const AppContext = createContext();

export const AppProviderChannels = ({ children }) => {
   const [channels, setChannels] = useState();

   const handleChannels = async () => {
      const response = await fetch('http://localhost:3000/api/channel')
      const data = await response.json()
      console.log(data)
      setChannels(data)
   }
   useEffect(() => {
      handleChannels()
   }, [])

   return (
      <AppContext.Provider value={{ channels }}>
         {children}
      </AppContext.Provider>
   );
}

export const useContextChannels = () => {
   return useContext(AppContext);
};
