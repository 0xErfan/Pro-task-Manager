import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoSettingsOutline } from "react-icons/io5";
import { FaChevronRight, FaGithub, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { LuKeyRound } from "react-icons/lu";
import { TiCameraOutline } from "react-icons/ti";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getCookie, getParsedTodos, showToast } from '../utils';
import DataSetter from '../components/DataSetter';
import { setImgError, setToastData, setUpdater, userDataUpdater, userProfileImgUploader } from '../Redux/Futures/userSlice';

export default function Profile() {

    const { userData, isLoading, isLogin, imgError } = useSelector(state => state.user)
    const navigate = useNavigate()

    const [changeAcoundNameShow, setChangeAcoundNameShow] = useState("")
    const [changeAcoundPassword, setChangeAcoundPassword] = useState("")
    const [changeAcoundProfile, setChangeAcoundProfile] = useState("")

    const [isPasswordCorredt, setIsPasswordCorrect] = useState(false)
    const [currentName, setCurrentName] = useState("")


    const [newPass, setNewPass] = useState("")
    const [confirmNewPass, setConfirmNewPass] = useState("")


    const logout = () => {
        document.cookie = `userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
        location.reload()
    }

    let tasks

    isLogin && (tasks = getParsedTodos(getCookie().todos))
    const dispatch = useDispatch()
    const completedTasks = tasks?.filter(task => task.isComplete).length

    const newPasswordUpdater = () => {

        changeAcoundPassword == userData.password ? setIsPasswordCorrect(true) : showToast(dispatch, "Incorrect password !", 0)

        if (changeAcoundPassword == userData.password) {

            if (!newPass.trim().length || !confirmNewPass.trim().length) return

            if (newPass != confirmNewPass) {
                showToast(dispatch, "Password and Confirm password are different !", 0, 3500)
            } else if (newPass.trim().length < 8) {
                showToast(dispatch, "Password can be at least 8 characters !", 0, 3500)
            } else {
                dispatch(userDataUpdater({ action: "changePass", newPass }))
                showToast(dispatch, "Password changed successfully (:", 1, 2000)
                setChangeAcoundPassword(false)
                setIsPasswordCorrect(false)
                setNewPass("")
                setConfirmNewPass("")
            }
        }
    }

    const newProfileHandler = e => {
        const newImageFile = e.target.files[0]

        if (newImageFile.type.includes("image")) {
            dispatch(userProfileImgUploader({ file: newImageFile, action: "update" }))
        } else showToast(dispatch, "Only image files acceptable !", 0, 2500)
    }

    const newNameUpdater = () => {
        if (currentName.trim().length < 4) {
            showToast(dispatch, "Name at least should contain 4 letters ! ", 0, 3000)
        } else {
            dispatch(userDataUpdater({ action: "changeName", newName: currentName }))
            setChangeAcoundNameShow(false)
        }
    }

    return (

        <>
            {!isLogin ? <Navigate to="/" /> :
                <section className='container'>
                    <h5 className=' text-center text-2xl mt-6'>Profile</h5>

                    <div className=' flex items-center justify-center text-2xl m-auto ch:size-24 my-5 ch:border-2 ch:border-primary'>
                        {
                            userData.userImg ?
                                <img onError={() => dispatch(setImgError())} className=" cursor-pointer size-12 object-cover rounded-full" key={userData.userImg} src={userData.userImg} alt="Profile" />
                                :
                                <div className="flex items-center justify-center cursor-pointer bg-primary-gray rounded-full">{userData.name[0]}</div>
                        }
                    </div>

                    <h2 className='text-center font-lato-bold text-xl'>{userData.name}</h2>

                    {
                        tasks.length ?
                            <div className='flex items-center gap-4 mt-5 mb-12 justify-center'>
                                <Link to="/" className='text-center p-4 grow rounded-md bg-primary-gray '>{tasks.length - completedTasks} task{completedTasks > 1 && "s"} left</Link>
                                {completedTasks ? <Link to="/" className='text-center p-4 grow rounded-md bg-primary-gray '>{completedTasks} task{completedTasks > 1 && "s"} done</Link> : null}
                            </div>
                            : null
                    }

                    {/* <div className='mb-9'>
                <div className=' text-milky-dark mb-3 '>Settings</div>
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                        <IoSettingsOutline className='size-7' />
                        App Settings
                    </div>
                    <FaChevronRight className='size-5' />
                </div>
            </div> */}

                    <div className='mb-9'>
                        <div className=' text-milky-dark mb-3 '>Account</div>
                        <div onClick={() => setChangeAcoundNameShow(true)} className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-2'>
                                <LuUser2 className='size-7' />
                                Change account name
                            </div>
                            <FaChevronRight className='size-5' />
                        </div>
                        <div className='flex items-center justify-between mb-4'>
                            <div onClick={() => setChangeAcoundPassword(true)} className='flex items-center gap-2'>
                                <LuKeyRound className='size-7' />
                                Change account password
                            </div>
                            <FaChevronRight className='size-5' />
                        </div>
                        <div className='flex items-center justify-between mb-4'>
                            <label htmlFor='profile' onClick={() => setChangeAcoundProfile(true)} className='flex items-center gap-2'>
                                <TiCameraOutline className='size-7' />
                                Change account Image
                            </label>
                            <input onChange={newProfileHandler} className='hidden' accept='' id='profile' type="file" />
                            <FaChevronRight className='size-5' />
                        </div>
                        <div onClick={logout} className="text-red-600 flex items-center gap-2 text-xl ">
                            <IoLogOutOutline className='size-6 rotate-180' />
                            Logout
                        </div>
                    </div>



                    <div className='mb-9'>
                        <div className=' text-milky-dark mb-3 '>Contact me</div>
                        <div className='flex items-center gap-3 ch:ch:size-10 ch:ch:border ch:ch:border-primaryWhite/20 ch:ch:p-2 ch:ch:rounded-full'>
                            <a target='_blank' href="https://t.me/0oErfan"><FaTelegramPlane /></a>
                            <a target='_blank' href="https://github.com/0xErfan"><FaGithub /></a>
                            <a target='_blank' href="https://www.instagram.com/libanogs.so"><FaInstagram /></a>
                        </div>
                    </div>

                    <DataSetter
                        topic="Change name"
                        children={<div className='flex flex-col w-full items-center gap-3 pt-8'><input onChange={e => setCurrentName(e.target.value)} value={currentName} className=' w-full py-3 rounded-sm bg-transparent border border-border px-2 ' placeholder='Enter your new name: '></input></div>}
                        cancelBtnFn={() => { setChangeAcoundNameShow(false) }}
                        saveBtnFn={newNameUpdater}
                        saveBtnText="Save"
                        show={changeAcoundNameShow}
                    />

                    <DataSetter
                        topic="Change password"
                        children={<div className='flex flex-col w-full items-center gap-3 pt-8'>
                            {
                                !isPasswordCorredt && <input onChange={e => setChangeAcoundPassword(e.target.value)} className=' w-full py-3 rounded-sm bg-transparent border border-border px-2 ' placeholder='Enter your current password : '></input>
                            }
                            {
                                isPasswordCorredt && <div className='space-y-3'>
                                    <input onChange={e => setNewPass(e.target.value)} className=' w-full py-3 rounded-sm bg-transparent border border-border px-2' type='password' placeholder='Enter your new password : '></input>
                                    <input onChange={e => setConfirmNewPass(e.target.value)} className=' w-full py-3 rounded-sm bg-transparent border border-border px-2' type='password' placeholder='Confirm your new password : '></input>
                                </div>
                            }
                        </div>}
                        cancelBtnFn={() => { setChangeAcoundPassword(false), setIsPasswordCorrect(false) }}
                        saveBtnFn={newPasswordUpdater}
                        saveBtnText={isPasswordCorredt ? "Update" : "Check"}
                        show={changeAcoundPassword}
                    />









                </section>
            }

        </>
    )
}
