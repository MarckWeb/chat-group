import React, { createContext, useContext, useEffect, useState } from 'react';

const VITE_URL = import.meta.env.VITE_URL;
const AppContext = createContext();

export const AppProviderImages = ({ children }) => {
   const [images, setImages] = useState();

   const handleImages = async () => {
      const response = await fetch(`${VITE_URL}comments/image`)
      const data = await response.json()
      setImages(data)
   }
   useEffect(() => {
      handleImages()
   }, [])

   return (
      <AppContext.Provider value={{ images, handleImages }}>
         {children}
      </AppContext.Provider>
   );
}

export const useContextImages = () => {
   return useContext(AppContext);
};