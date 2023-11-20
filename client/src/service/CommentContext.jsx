import React, { createContext, useContext, useEffect, useState } from 'react';

const VITE_URL = import.meta.env.VITE_URL;
const AppContext = createContext();

export const AppProviderComments = ({ children }) => {
   const [comments, setComments] = useState();

   const handleComments = async () => {
      const response = await fetch('http://localhost:3000/api/comments')
      const data = await response.json()
      console.log(data)
      setComments(data)
   }
   useEffect(() => {
      handleComments()
   }, [])

   return (
      <AppContext.Provider value={{ comments, setComments, handleComments }}>
         {children}
      </AppContext.Provider>
   );
}

export const useContextComments = () => {
   return useContext(AppContext);
};
