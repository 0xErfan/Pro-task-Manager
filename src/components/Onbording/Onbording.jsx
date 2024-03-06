import React, { useState } from 'react'
import Button from '../Button'
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

export default function Onbording() {

    const [pageIndex, setPageIndex] = useState(0)
    const currentPageData = OnbordingData.find(data => data.index == pageIndex)
    // const navigaate = useNavigate()

    const nextPageHandler = () => { pageIndex == 3 ? "" : setPageIndex(preve => preve + 1) }
    const prevePageHandler = () => { pageIndex == 3 ? "" : setPageIndex(preve => preve - 1) }

    return (
        <section className='container'>
            {pageIndex < 3 ?
                <button onClick={() => setPageIndex(3)} className='text-milky-dark block mr-auto my-5 font-lato'>SKIP</button>
                :
                <button onClick={() => setPageIndex(2)} className='text-milky block mr-auto my-5 ch:size-6'><IoIosArrowBack /></button>
            }

            {currentPageData?.imageSrc && <div className='m-auto max-w-[213px] w-full min-h-[277px]'><img className='size-full' src={currentPageData?.imageSrc} /></div>}

            {
                pageIndex < 3 && <div className='flex items-center justify-center my-12 gap-2'>
                    <span className={`w-6 h-1 ${pageIndex == 2 ? "bg-milky" : "bg-milky-dark"} rounded-md`}></span>
                    <span className={`w-6 h-1 ${pageIndex == 1 ? "bg-milky" : "bg-milky-dark"} rounded-md`}></span>
                    <span className={`w-6 h-1 ${pageIndex == 0 ? "bg-milky" : "bg-milky-dark"} rounded-md`}></span>
                </div>
            }

            <h4 className='font-lato-bold font-bold text-[32px] text-milky text-center mb-10'>{currentPageData?.title}</h4>
            <h6 className='font-lato text-[16px] text-milky text-center'>{currentPageData?.text}</h6>

            <div className={`flex items-center ${pageIndex == 3 ? "flex-col gap-4" : "gap-34"} justify-between absolute bottom-2 left-0 p-5 w-full`}>
                {<Button data={{ text: pageIndex + 1 == 3 ? "GET STARTED" : pageIndex == 3 ? "Login" : "NEXT", fn: nextPageHandler }} />}
                {pageIndex > 0 && <Button data={{ text: pageIndex == 3 ? "Create Account" : "BACK", color: 1, border: pageIndex == 3, fn: prevePageHandler }} />}
            </div>
        </section>

    )
}

const OnbordingData = [
    { index: 0, title: "Manage your tasks", text: "You can easily manage all of your daily tasks in DoMe for free", imageSrc: "/Images/Managment.png" },
    { index: 1, title: "Create daily routine", text: "In Uptodo  you can create your personalized routine to stay productive", imageSrc: "/Images/Routine.png" },
    { index: 2, title: "Orgonaize your tasks", text: "You can organize your daily tasks by adding your tasks into separate categories", imageSrc: "/Images/Orgonaize.png" },
    { index: 3, title: "Welcome to UpTodo", text: "Please login to your account or create new account to continue" }
]