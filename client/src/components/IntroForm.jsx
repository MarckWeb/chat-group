import React from 'react'
import Button from './Button'

const IntroForm = ({ className, title, description, toggle, statusOfForm }) => {
   return (
      <section className={className}>
         <h4 className=' text-4xl font-bold md:text-4xl '>{title}</h4>
         <p className='text-2xl lg:w-[600px] my-3 '>{description}</p>
         <Button
            value={toggle ? 'Registrarme' : 'Iniciar Sesion'}
            onClick={statusOfForm} />
      </section>
   )
}

export default IntroForm