import React, { lazy } from 'react'
import { categoryList } from './AddTodo'
import { FaRegCircle } from "react-icons/fa";
import { HiOutlineFlag } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { checkTaskStatus, padStarter } from '../utils';
import { taskUpdater } from '../Redux/Futures/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Task({ description, title, category, priority, id, time, isComplete }) {

    const navigate = useNavigate()
    const taskStats = checkTaskStatus(time)
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.user)

    return (
        <div onClick={e => e.target.tagName != "svg" && navigate(`/task-edit/${id}`)} className={`w-full p-2 justify-between h-24 relative bg-primary-gray rounded-md ${isComplete && "opacity-30"}`} >
            <FaRegCircle onClick={() => !isLoading && dispatch(taskUpdater({ taskId: id, action: "update" }))} className={`size-6 ${isComplete && "bg-primary"} rounded-full centered left-6`} />
            <div className='flex flex-col items-center gap-3'>
                <div className='flex items-center gap-3 w-full relative'>
                    <div className='ml-auto w-[87%] relative'>
                        <h4 className='font-lato-bold text-xl truncate-letters w-full]'>{title}</h4>
                        <div className='text-milky-dark absolute top-[100%] w-[40%] translate-y-1/2'>
                            {
                                time ?
                                    <div className=' line-clamp-1 '>
                                        {
                                            taskStats != "Passed" ? taskStats + " At " + padStarter(time.hour) + ":" + padStarter(time.min) : "Passed"
                                        }
                                    </div>
                                    :
                                    <p className='text-ellipsis line-clamp-1 '>{description}</p>
                            }
                        </div>
                    </div>
                </div>

                <div className='ml-auto'>
                    <div className='flex justify-between'>
                        <div className='flex justify-between gap-2'>
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
