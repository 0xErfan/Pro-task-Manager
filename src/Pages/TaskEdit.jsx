import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCookie, getParsedTodos } from '../utils';
import { IoMdClose } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline, MdEMobiledata, MdOutlineTimer } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { IoPricetagsOutline } from 'react-icons/io5';
import { HiOutlineFlag } from 'react-icons/hi2';
import { categoryList } from '../components/AddTodo';
import { taskUpdater } from '../Redux/Futures/userSlice';

export default function TaskEdit() {

    const [isEditing, setIsEditing] = useState(false)

    const taskId = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let userTasks = useSelector(state => state.user.userData.todos)
    !userTasks.length && (userTasks = getCookie().todos)
    userTasks = getParsedTodos(userTasks)


    const { title, description, time = null, category, priority } = userTasks.find(task => task.id == taskId.id)

    return (
        <section className='container'>
            <Link to="/"><IoMdClose className=' bg-dark-light size-9 p-[6px] rounded-md my-6 cursor-pointer ' /></Link>

            <div className='flex items-center justify-between mt-12'>
                <div className='flex items-center gap-4'>
                    <FaRegCircle />
                    <h3 className='text-xl font-lato-bold'>{title}</h3>
                </div>
                <BiEditAlt className='size-7' />
            </div>

            <p className=' text-milky-dark max-h-[320px] overflow-y-auto pl-8 mt-4'>{description} </p>

            <div className='mt-10 space-y-10'>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-[6px]'>
                        <MdOutlineTimer className='size-7' />
                        <p>Task Time :</p>
                    </div>

                    <div className=' bg-primary-gray p-2 rounded-md' >
                        {
                            time ?
                                <div>{time.time == "AM" ? "Today" : "Tomorrow"} At {time.hour + ":" + time.min}</div>
                                : <div>Not set</div>
                        }
                    </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-[6px]'>
                        <IoPricetagsOutline className='size-6' />
                        <p>Task Category :</p>
                    </div>
                    <div className='flex gap-2 items-center ch:size-6 bg-primary-gray p-2 rounded-md' >{category && categoryList.find(cat => cat.catName == category).svg} {category || "Not set"} </div>
                </div>

                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-[6px]'>
                        <HiOutlineFlag className='size-6' />
                        <p>Task Priority :</p>
                    </div>
                    <div className='flex gap-2 items-center ch:size-5 bg-primary-gray p-2 rounded-md' > {priority && <HiOutlineFlag />} {priority || "Not set"} </div>
                </div>

                <div onClick={() => { dispatch(taskUpdater({ action: "delete", taskId: taskId.id })), navigate("/") }} className=' cursor-pointer flex items-center justify-between text-red-500'>
                    <div className='flex items-center gap-[6px]'>
                        <MdDeleteOutline className='size-6' />
                        <p>Delete Task</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
