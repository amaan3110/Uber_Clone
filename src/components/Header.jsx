import React from "react";
import Uber_Logo from '../assets/Uber_Logo.png'

const Header = () => {
  return (
    <div className='w-full bg-slate-100 border-b-2'>
        <div className='w-[100px]'>
        <img src={Uber_Logo} alt="logo" className='w-full'/>
        </div>
    </div>
  )
}

export default Header