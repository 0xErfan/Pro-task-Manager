import React from 'react'
import Button from './Button'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, prevePage, changeByMount } from '../Redux/Futures/OnbordingSlice';


export default function Onbording() {

    const page = useSelector(state => state.OnbordingPage)
    const navigaate = useNavigate()
    const dispach = useDispatch()

    const currentPageData = OnbordingData.find(data => data.index == page)

    const nextPageHandler = () => { page == 3 ? navigaate("/login") : dispach(nextPage()) }
    const prevePageHandler = () => { page == 3 ? navigaate("/register") : dispach(prevePage()) }

    return (
        <section className='container'>
            {page < 3 ?
                <button onClick={() => dispach(changeByMount(3))} className='text-milky-dark block mr-auto my-5 font-lato'>SKIP</button>
                :
                <button onClick={() => dispach(changeByMount(2))} className='text-milky block mr-auto my-5 ch:size-6'><IoIosArrowBack /></button>
            }

            {currentPageData?.imageSrc && <div className='m-auto max-w-[213px] w-full min-h-[277px]'><img className='size-full' src={currentPageData?.imageSrc} /></div>}

            {
                page < 3 && <div className='flex items-center justify-center my-12 gap-2'>
                    <span className={`w-6 h-1 ${page == 0 ? "bg-milky" : "bg-milky-dark"} rounded-md`}></span>
                    <span className={`w-6 h-1 ${page == 1 ? "bg-milky" : "bg-milky-dark"} rounded-md`}></span>
                    <span className={`w-6 h-1 ${page == 2 ? "bg-milky" : "bg-milky-dark"} rounded-md`}></span>
                </div>
            }

            <h4 className='font-lato-bold font-bold text-[32px] text-milky text-center mb-10'>{currentPageData?.title}</h4>
            <h6 className='font-lato text-[16px] text-milky text-center'>{currentPageData?.text}</h6>

            <div className={`flex items-center ${page == 3 ? "flex-col-reverse gap-4" : "gap-34"} justify-between absolute bottom-2 left-0 p-5 w-full`}>
                {page > 0 && <Button data={{ text: page == 3 ? "Create Account" : "BACK", color: 1, border: page == 3, fn: prevePageHandler }} />}
                {<Button data={{ text: page == 2 ? "GET STARTED" : page == 3 ? "Login" : "NEXT", fn: nextPageHandler }} />}
            </div>
        </section>

    )
}

const OnbordingData = [
    { index: 0, title: "Manage your tasks", text: "You can easily manage all of your daily tasks in DoMe for free", imageSrc: "Images/Managment.png" },
    { index: 1, title: "Create daily routine", text: "In TaskUp  you can create your personalized routine to stay productive", imageSrc: "Images/Routine.png" },
    { index: 2, title: "Orgonaize your tasks", text: "You can organize your daily tasks by adding your tasks into separate categories", imageSrc: "Images/Orgonaize.png" },
    { index: 3, title: "Welcome to TaskUp", text: "Please login to your account or create new account to continue" }
]