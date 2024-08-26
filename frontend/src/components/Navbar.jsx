import React, { useEffect, useState } from 'react'
import logo from '../images/logocortada.png'
import { ImSearch } from "react-icons/im";
import Avatar from 'react-avatar';
// import { api_base_url } from '../Helper';

export default function Navbar() {

  return (
    <>
        <div className='navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]'>
            <img src={logo} alt="" className='h-[50px]' />

            <div className="right flex items-center justify-end gap-2">
                <div className="inputBox w-[30vw]">
                    <i><ImSearch /></i>
                    <input type="text" placeholder='Search Here...' />
                </div>
                <Avatar name="User Name" className='cursor-pointer' size="40" round="50%" />
            </div>
        </div>
    </>
  )
}
