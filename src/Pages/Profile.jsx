import React from 'react'
import { useSelector } from 'react-redux'
import { IoSettingsOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { Link } from 'react-router-dom'

export default function Profile() {

    const userImg = useSelector(state => state.user?.profileImg)

    return (
        <section className='container'>
            <h5 className=' text-center text-xl mt-6'>Profile</h5>

            <div className=' flex items-center justify-center text-2xl m-auto ch:size-24 my-5 ch:border-2 ch:border-primary'>
                {
                    !userImg ?
                        <img className=" cursor-pointer size-12 object-cover rounded-full" src="https://png.pngtree.com/background/20230530/original/pngtree-man-looking-for-a-good-mens-beauty-look-picture-image_2791625.jpg" alt="Profile" />
                        :
                        <div className="flex items-center justify-center cursor-pointer bg-primary-gray rounded-full">u</div>
                }
            </div>

            <h2 className='text-center font-lato-bold text-xl'>Erfan eftekhari</h2>

            <div className='flex items-center gap-4 mt-5 mb-12 justify-center'>
                <Link to="/" className='text-center p-4 grow rounded-md bg-primary-gray '>10 tasks left</Link>
                <Link to="/" className='text-center p-4 grow rounded-md bg-primary-gray '>5 tasks done</Link>
            </div>

            <div>
                <div className=' text-milky-dark mb-3 '>Settings</div>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <IoSettingsOutline className='size-7' />
                        App Settings
                    </div>
                    <FaChevronRight className='size-5' />
                </div>
            </div>
        </section>
    )
}
