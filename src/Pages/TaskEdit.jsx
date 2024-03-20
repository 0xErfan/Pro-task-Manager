import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { checkTaskStatus, getCookie, getParsedTodos, padStarter } from '../utils';
import { IoMdClose } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline, MdEMobiledata, MdOutlineTimer } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa";
import { IoPricetagsOutline } from 'react-icons/io5';
import { HiOutlineFlag } from 'react-icons/hi2';
import { categoryList } from '../components/AddTodo';
import { setOverlayShow, taskUpdater } from '../Redux/Futures/userSlice';
import Button from '../components/Button';
import DataSetter from '../components/DataSetter';

export default function TaskEdit() {

    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const [taskTitle, setTaskTitle] = useState("")
    const [desc, setDesc] = useState("")

    const taskId = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let userTasks = useSelector(state => state.user.userData.todos)
    !userTasks.length && (userTasks = getCookie().todos)
    userTasks = getParsedTodos(userTasks)

    const { title, description, time = null, category, priority, isComplete } = userTasks.find(task => task.id == taskId.id)
    const taskStats = checkTaskStatus(time)

    const taskUpdate = action => {
        setIsEditing(false)

        if (action == "complete") {
            dispatch(taskUpdater({ taskId: taskId.id, action: "update" }))
        } else dispatch(taskUpdater({ action: "update", taskId: taskId.id, data: { desc, taskTitle } }))

        setTaskTitle("")
    }

    const showTaskEditor = () => {
        setIsEditing(true)
        setDesc(description)
        setTaskTitle(title)
    }


    return (
        <section className={`container ${isComplete && "ch:line-through opacity-50 ch:transition-all "} `}>
            <Link to="/"><IoMdClose className='bg-dark-light size-9 p-[6px] rounded-md my-6 cursor-pointer ' /></Link>

            <div className='flex items-center justify-between mt-12'>
                <div className='flex items-center gap-4'>
                    <FaRegCircle className={`${isComplete && "bg-primary"} rounded-full size-5 `} onClick={() => taskUpdate("complete")} />
                    <h3 className='text-xl font-lato-bold'>{title}</h3>
                </div>
                <BiEditAlt onClick={showTaskEditor} className='size-7' />
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
                                taskStats != "Passed" ? taskStats + " At " + padStarter(time.hour) + ":" + padStarter(time.min) : "Passed"
                                : <div>Not set</div>
                        }
                    </div>
                </div>

                <div onClick={() => setCategoryShow(true)} className='flex items-center justify-between'>
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

                <div onClick={() => setIsDeleting(true)} className='cursor-pointer flex items-center justify-between text-red-500'>
                    <div className='flex items-center gap-[6px]'>
                        <MdDeleteOutline className='size-6' />
                        <p>Delete Task</p>
                    </div>
                </div>

                <div className={`${isEditing && "h-screen fixed transition-all backdrop-blur-[2px] inset-0 z-40"}`}>
                    <div className={` ${!isEditing && "hidden"} centered flex flex-col items-center h-auto bg-primary-gray w-[93%] rounded-md p-4`}>
                        <p className='text-center border-b w-full border-border pb-2'>Edit task</p>
                        <div className='flex flex-col w-full items-center gap-3 pt-8'>

                            <input onChange={e => setTaskTitle(e.target.value)} className=' bg-dark-light py-3 w-full px-3 rounded-md ' value={taskTitle} type="text" />
                            <input onChange={e => setDesc(e.target.value)} className=' bg-dark-light py-3 w-full px-3 rounded-md ' value={desc} type="text" />

                        </div>
                        <div className='flex items-center justify-between mt-6 w-full'>
                            <Button data={{ text: "Cancel", color: 1, fn: () => { setIsEditing(false) } }} />
                            <Button data={{ text: "Save", fn: taskUpdate }} />
                        </div>
                    </div>
                </div>

                {/* Task deleter */}
                <DataSetter
                    topic="Delete task"
                    children={<div className='flex flex-col w-full items-center gap-3 pt-8'><h3>Are You sure you want to delete this task?</h3></div>}
                    cancelBtnFn={() => { setIsDeleting(false) }}
                    saveBtnFn={() => { dispatch(taskUpdater({ action: "delete", taskId: taskId.id })), setIsDeleting(false), navigate("/") }}
                    saveBtnText="Delete"
                    show={isDeleting}
                />

            </div>
        </section >
    );
}
