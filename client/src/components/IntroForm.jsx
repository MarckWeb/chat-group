import React from 'react'
import Button from './Button'

const IntroForm = ({ className, title, description, toggle, statusOfForm }) => {
   return (
      <section className={className}>
         <h4 className=' text-2xl font-bold md:text-4xl'>{title}</h4>
         <p className='text-lg'>{description}</p>
         <Button

            value={toggle ? 'registrase' : 'login'}
            onClick={statusOfForm} />
      </section>
   )
}

export default IntroForm