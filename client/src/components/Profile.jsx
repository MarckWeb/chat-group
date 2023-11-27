import { useEffect, useState } from "react";
import { CiSettings } from "react-icons/ci";

import { toast } from 'react-toastify';

import { MdOutlinePhotoSizeSelectActual } from "react-icons/md"
import { PiUserSwitchFill } from "react-icons/pi";

const VITE_URL = import.meta.env.VITE_URL;

const Profile = ({ userSelect, handleUserSelect, setIsAutenticated }) => {
   console.log(userSelect)
   const [showProfile, setShowProfile] = useState(false)
   const [profileFile, setProfileFile] = useState(null)
   const [selectedFile, setSelectedFile] = useState(null);
   const [selectedImage, setSelectedImage] = useState(null);

   const handleCloseSesion = () => {
      localStorage.removeItem('token')
      setIsAutenticated('')
   }

   const handleFile = (e) => {
      e.preventDefault()
      const name = e.target.name;
      let value = e.target.value;

      if (name === 'image') {
         const imageFile = e.target.files[0];
         setSelectedFile(imageFile)
         if (imageFile) {
            setSelectedImage(URL.createObjectURL(imageFile));
         } else {
            setSelectedImage(null)
         }
      }

      setProfileFile({
         [name]: value
      });
   }

   const sendImageFileFromProfile = async (e) => {
      e.preventDefault()
      console.log(userSelect.id)
      const fileImage = new FormData()
      if (selectedFile) {
         fileImage.append('image', selectedFile);
      }

      const data = {
         method: 'PUT',
         body: fileImage,

      };

      const res = await fetch(`${VITE_URL}user/${userSelect.id}`, data)
      const resDta = await res.json()
      if (resDta.ok === true && resDta.state === 200) {
         handleUserSelect()
         setProfileFile(!showProfile)
         return toast.success('Imagen de perfil actualizado!!!')
      }
   }

   return (
      <section className={`w-full max-w-xs transition-all duration-50000 ease-linear  ${showProfile ? 'h-36 flex flex-col justify-between items-center' : 'h-20'} mt-auto bg-black  px-5 py-2`} >
         {showProfile
            ? <section className="w-full h-20 ">
               <div className="flex flex-row justify-around items-center">
                  <div className="w-18 h-full border border-white rounded-[50%] relative ">
                     {selectedImage
                        ? <figure className="w-16 h-16 overflow-hidden rounded-[50%]">
                           <img className="object-cover" src={selectedImage && selectedImage} alt="" />
                        </figure>
                        : <span className="text-7xl"><PiUserSwitchFill /></span>}
                     <div className="absolute bottom-[-5px] right-[-15px] bg-orange-700 p-1 rounded">
                        <label htmlFor="image" className="cursor-pointer"><MdOutlinePhotoSizeSelectActual className="text-lg" /></label>
                        <input className="hidden"
                           type="file"
                           name="image"
                           id="image"
                           onChange={handleFile} />
                     </div>
                  </div>

                  <div className="flex flex-col gap-2">
                     <button className="border border-white py-1 px-3 rounded hover:bg-orange-500 "
                        onClick={sendImageFileFromProfile}>
                        Editar
                     </button>
                     <button className="border border-white py-1 px-3 rounded hover:bg-orange-500 "
                        onClick={handleCloseSesion}>
                        Cerrar Sesion
                     </button>
                  </div>

               </div>

            </section>
            : ''}

         <section className="w-full bg-black flex flex-row justify-between items-center pt-3">
            {showProfile
               ? ''
               : <figure className='relative'>
                  {userSelect?.profile_image ? <img src={userSelect?.profile_image} alt="" className='w-10 h-10 rounded-[50%]' /> : <span className="text-5xl"><PiUserSwitchFill /></span>}

                  <span className={`w-2 h-2 ${userSelect ? 'bg-green-600' : ''}  rounded-[50%] absolute  right-0 bottom-1`}></span>
               </figure>}


            <p className='text-xl font-bold'>{`${userSelect?.name} ${userSelect?.lastname}`}</p>
            <CiSettings
               className='text-3xl cursor-pointer'
               onClick={() => setShowProfile(!showProfile)} />
         </section>

      </section>
   )
}

export default Profile