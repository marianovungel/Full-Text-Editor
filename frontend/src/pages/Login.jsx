import React, { useState } from 'react'
import logo from '../images/logocortada.png'
import { IoEye } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import rightIMG from "../images/home.jpg";
import { api_base_url } from '../Helper';

export default function Login() {
    const navigate = useNavigate()
    const [ email, setEmail] = useState("")
    const [ pwd, setPwd] = useState("")
    const [ error, setError] = useState("")

    const login = (e)=>{
        e.preventDefault()
        fetch(api_base_url + "/login", {
            mode:"cors",
            method: "POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                email:email,
                password:pwd,
            }),
        })
        .then((res)=> res.json())
        .then((data)=>{
            console.log(data)
            if(data.success === true){
                localStorage.setItem("token", data.token)
                localStorage.setItem("isLoggenIn", true)
                localStorage.setItem("userID", data.userId)
                navigate("/")
            }else{
                setError(data.message)
            }
        })
    }
    
  return (
    <>
        <div className='flex overflow-hidden items-center w-screen justify-center flex-col h-screen bg-[#F0F0F0]'>
            <div className="flex w-full items-center">
                <div className="left w-[30%] flex  flex-col ml-[100px]">
                    <img className='w-[210px]' src={logo} alt='' />
                    <form onSubmit={login} className='pl-3 mt-5' action="">
                        
                        <div className="inputCont">
                            <p className='text-[14px] text-[#808080]'>Email</p>
                            <div className="inputBox w-[100%]">
                                <i><MdEmail /></i>
                                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' id='Email' name='Email' required />
                            </div>
                        </div>
                        
                        <div className="inputCont">
                            <p className='text-[14px] text-[#808080]'>Password</p>
                            <div className="inputBox w-[100%]">
                                <i><RiLockPasswordFill /></i>
                                <input onChange={(e)=>setPwd(e.target.value)} value={pwd} type="password" placeholder='Password' id='Password' name='Password' required />
                                <i className='cursor-pointer !mr-3 !text-[25px]'><IoEye /></i>
                            </div>
                        </div>

                        <p className='text-red-500 text-[14px] my-2'>{error}</p>
                        <p>Don't heve an account <Link to="/signup" className='text-blue-500'>Sign Up</Link></p>

                        <button className='p-[10px] bg-green-500 transition-all hover:bg-green-600 text-white rounded-lg w-full border-0 mt-3'>Sing Up</button>
                    </form>
                </div>
                <div className="right flex items-end justify-end  w-[50%] ml-[50px] ">
                    <img className='w-full h-[400px] object-cover rounded-lg shadow-xl' src={rightIMG} alt="" />
                </div>
            </div>
        </div>
    </>
  )
}
