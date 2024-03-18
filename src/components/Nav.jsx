import React, { useEffect, useState } from 'react'
import { AiFillHome } from "react-icons/ai";
import { MdAccessTime } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { setAddTodoShow } from '../Redux/Futures/userSlice';
import { useDispatch } from 'react-redux';

export default function Nav() {

    const [activeNav, steActiveNav] = useState(location.pathname)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => steActiveNav(location.hash), [location.hash])

    return (
        <>
            <nav className="navbar fixed w-full mt-10 right-0 left-0 px-4 bg-primary-gray bottom-0 z-20">
                <div>
                    <div className='mainNav flex items-center justify-between text-milky-dark'>
                        <div className='flex items-center gap-10 text-xs text-center pt-4 ch:py-2'>
                            <Link to="/" className={`flex text-md ${activeNav == "#/" || activeNav.includes("task-edit") && "activeNav"} flex-col`}>
                                <div className='flex items-center pb-[3px] justify-center cursor-pointer'>
                                    <AiFillHome className='size-6' />
                                </div>
                                Home
                            </Link>
                            <Link to="/calender" className={`flex text-primaryOrange ${activeNav.includes("/calender") && "activeNav"} flex-col`}>
                                <div className='flex items-center pb-[3px] justify-center'>
                                    <SlCalender className='size-6' />
                                </div>
                                Calender
                            </Link>
                        </div>
                        <div className='flex items-center gap-10 text-xs text-center pt-4 ch:py-2'>
                            <Link to="/focus" className={`flex ${activeNav.includes("focus") && "activeNav"} flex-col`}>
                                <div className='flex items-center pb-[3px] justify-center cursor-pointer'>
                                    <MdAccessTime className='size-6' />
                                </div>
                                Focus
                            </Link>
                            <Link to="/profile" className={`flex ${activeNav.includes("profile") && "activeNav"} flex-col`}>
                                <div className='flex items-center pb-[3px] justify-center cursor-pointer'>
                                    <LuUser className='size-6' />
                                </div>
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <div onClick={() => {dispatch(setAddTodoShow(true)), navigate("/")}} className='addTodo bg-primary size-[75px] rounded-full flex items-center justify-center cursor-pointer'><FaPlus className='size-6' /></div>
            </nav>
        </>
    )
}