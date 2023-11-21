
import { IoIosArrowDown } from "react-icons/io";


const Profile = ({ userSelect }) => {
   return (
      <section className='w-full max-w-xs h-20 mt-auto bg-black flex flex-row justify-between items-center px-5'>
         <img src={userSelect?.image} alt="" className='w-10 h-10' />
         <p className='text-lg'>{`${userSelect?.name} ${userSelect?.lastname}`}</p>
         <IoIosArrowDown className='text-3xl' />
      </section>
   )
}

export default Profile