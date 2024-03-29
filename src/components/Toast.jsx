import React from 'react'
import { FaCheck } from "react-icons/fa";
import { MdError } from "react-icons/md";
// import { InfinitySpin } from 'react-loader-spinner';

export default function Toast({ text, status, loader, showToast }) {

    return (
        <>
            <div className={`py-4 ${!showToast ? "-left-[300px] invisible opacity-0" : "left-4  visible  opacity-100"} h-auto fixed border border-border top-8 transition-all duration-300 z-40 bg-dark-light text-xl py-2 px-4 rounded-sm`}>
                <div className=' w-[300px] flex mt-auto h-full items-center justify-between overflow-hidden gap-3'>
                    <h4 className='break-words'>{text}</h4>
                    {
                        loader ?
                            <div className='basis-1/4'>
                                <InfinitySpin
                                    visible={true}
                                    width="100"
                                    color="#DA510B"
                                    ariaLabel="infinity-spin-loading"
                                />
                            </div>
                            :
                            status ? <FaCheck className={`text-green-400 size-6 shrink-0`} /> : <MdError className={`text-red-500 size-8`} />
                    }
                </div>
            </div>
        </>
    )
}