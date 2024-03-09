import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineTimer } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { IoPricetagsOutline } from "react-icons/io5";
import { HiOutlineFlag } from "react-icons/hi2";
import { TiTickOutline } from "react-icons/ti";
import Button from "./Button"
export default function AddTodo({ visible }) {

    const titleRef = useRef()
    const [activePrio, setActivePrio] = useState(1)
    const [isPrioShown, setIsPrioShown] = useState(false)

    useEffect(() => { titleRef.current.focus() }, [])

    let allPriorities = []

    for (let i = 1; i <= 10; i++) { allPriorities.push(<div key={i} onClick={() => setActivePrio(i)} className={`${activePrio == i ? "bg-primary" : "bg-[#272727]"} transition-colors cursor-pointer`}>{i}<HiOutlineFlag /> </div>) }

    return (
        <>
            <div className={`z-40 min-h-[228px] bg-primary-gray w-full fixed px-3  transition-all ${visible ? "bottom-0" : "-bottom-[228px]"}  rounded-r-2xl rounded-l-2xl`}>
                <h4 className=" flex items-center gap-1 text-[18px] font-lato-bold ch:size-7 p-4 text-primary">Add task <TiTickOutline /></h4>
                <input ref={titleRef} className='flex justify-center items-center w-full h-10 rounded-md mt-3 pl-3 text-[20px] focus:border focus:border-border bg-transparent outline-none placeholder:text-milky-dark' placeholder='Title' type="text" spellCheck={false} />
                <textarea className='flex justify-center items-center w-full rounded-md mt-3 pl-6 text-[20px] min-h-10 max-h-24 focus:border focus:border-border bg-transparent placeholder:text-milky-dark outline-none' placeholder='Description' spellCheck={false} />
                <div className='flex items-center justify-between mt-6 py-4 px-3'>
                    <div className='flex items-center gap-6 justify-between ch:size-6 ch:cursor-pointer'>
                        <MdOutlineTimer />
                        <IoPricetagsOutline className=' -rotate-90 ' />
                        <HiOutlineFlag onClick={() => setIsPrioShown(true)} />
                    </div>
                    <VscSend className='text-primary size-7 cursor-pointer' />
                </div>

            </div>
            <div className={`${isPrioShown && "h-screen fixed transition-all backdrop-blur-[2px] inset-0 z-40"}`}>
                <div className={` ${!isPrioShown && "hidden" } addPrioruty flex flex-col items-center h-auto bg-primary-gray w-[93%] rounded-md p-4`}>
                    <p className='text-center border-b w-full border-border pb-2'>Task Priority</p>
                    <div className='grid grid-cols-4 gap-4 mt-4 ch:flex ch:flex-col-reverse ch:gap-2 ch:items-center ch:justify-center ch:rounded-md ch:size-16 ch:ch:size-5'>
                        {allPriorities}
                    </div>
                    <div className='flex items-center justify-between mt-6 w-full'>
                        <Button data={{ text: "Cancel", color: 1, fn: () => setIsPrioShown(false) }} />
                        <Button data={{ text: "Save", fn: () => setIsPrioShown(false) }} />
                    </div>
                </div>
            </div>
        </>
    )
}