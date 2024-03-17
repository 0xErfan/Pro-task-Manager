import React from 'react'
import Button from './Button'

export default function DataSetter({ topic, children, cancelBtnFn, saveBtnFn, show, saveBtnText = null }) {
    
    return (
        <div className={`${show && "h-screen fixed transition-all backdrop-blur-[2px] inset-0 z-40"}`}>
            <div className={` ${!show && "hidden"} addPrioruty flex flex-col items-center h-auto bg-primary-gray w-[93%] rounded-md p-4`}>
                <p className='text-center border-b w-full border-border pb-2'>{topic}</p>
                {children}
                <div className='flex items-center justify-between mt-6 w-full'>
                    <Button data={{ text: "Cancel", color: 1, fn: cancelBtnFn }} />
                    <Button data={{ text: saveBtnText || "Save", fn: saveBtnFn }} />
                </div>
            </div>
        </div>
    )
}
