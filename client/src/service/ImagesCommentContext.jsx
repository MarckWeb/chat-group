import React, { createContext, useContext, useEffect, useState } from 'react';

const VITE_URL = import.meta.env.VITE_URL;
const AppContext = createContext();

export const AppProviderUsers = ({ children }) => {
   const [commentImages, setCommentImages] = useState();

   const handleCommentImages = async () => {
      const response = await fetch('http://localhost:3000/api/comments/image')
      const data = await response.json()
      console.log(data)
      setCommentImages(data)
   }
   useEffect(() => {
      handleCommentImages()
   }, [])

   return (
      <AppContext.Provider value={{ commentImages }}>
         {children}
      </AppContext.Provider>
   );
}

export const useContextCommentImages = () => {
   return useContext(AppContext);
};
