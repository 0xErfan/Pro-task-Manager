import React from 'react'
import { categoryList } from './AddTodo'
import { FaRegCircle } from "react-icons/fa";
import { HiOutlineFlag } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

export default function Task({ description, title, category, priority, id }) {

    const navigate = useNavigate()

    return (
        <div onClick={() => navigate(`/task-edit/${id}`)} className='w-full py-2 px-3 justify-between h-24 relative bg-primary-gray rounded-md' >
            <div className='flex flex-col items-center gap-3'>
                <div className='flex items-center gap-3 w-full relative'>
                    <FaRegCircle className='size-5 absolute top-1/2 inset-0 h-full translate-y-1/2' />
                    <div className='ml-auto w-[87%] relative'>
                        <h4 className='font-lato-bold text-xl truncate-letters w-full]'>{title}</h4>
                        <p className=' text-milky-dark absolute top-[100%] w-[40%] text-ellipsis translate-y-1/2 line-clamp-1 '>{description}</p>
                    </div>
                </div>

                <div className='ml-auto'>
                    <div className='flex justify-between'>
                        <div className='flex justify-between gap-1'>
                            <div className='flex items-center gap-2 justify-between'>
                                {category && <div
                                    className='h-9 flex items-center z-20 justify-center rounded-[4px] text-white'
                                    style={{ backgroundColor: categoryList.find(cat => cat.catName == category).bgColor }}>
                                    <div className='flex items-center gap-2 px-1'>
                                        <div className='ch:size-[22px]'>{categoryList.find(cat => cat.catName == category).svg}</div>
                                        {category}
                                    </div>
                                </div>}
                            </div>
                            {priority && <div>
                                <div className='h-9 flex items-center justify-center rounded-[4px] text-white border-[2.5px] px-2 gap-2 border-primary'>
                                    <HiOutlineFlag />
                                    {priority}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
}
