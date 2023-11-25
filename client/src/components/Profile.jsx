import { CiSettings } from "react-icons/ci";

const Profile = ({ userSelect }) => {
   console.log(userSelect)
   return (
      <section className='w-full max-w-xs h-20 mt-auto bg-black flex flex-row justify-between items-center px-5'>
         <figure className='relative'>
            <img src={userSelect?.profile_image} alt="" className='w-10 h-10 rounded-[50%]' />
            <span className={`w-2 h-2 ${userSelect ? 'bg-green-600' : ''}  rounded-[50%] absolute  right-0 bottom-1`}></span>
         </figure>

         <p className='text-lg font-bold'>{`${userSelect?.name} ${userSelect?.lastname}`}</p>
         <CiSettings className='text-3xl' />
      </section>
   )
}

export default Profile