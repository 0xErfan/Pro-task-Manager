import React, { useEffect, useState } from 'react'
import Intro from '../components/Intro'
import { getParsedTodos } from '../utils'
import { useSelector } from 'react-redux'
import { CgSortAz } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import AddTodo from '../components/AddTodo'
import Task from '../components/Task'

export default function Home() {

    const { isLogin, userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [shownTodos, setShownTodos] = useState([])

    useEffect(() => setShownTodos(allUserTodos), [userData.todos])

    let allUserTodos
    if (isLogin) allUserTodos = getParsedTodos(userData.todos)

    const taskFilterHandler = e => {
        let filteredTodos = [...allUserTodos]
        filteredTodos = filteredTodos.filter(todo => [todo.title.toLowerCase(), todo.description.toLowerCase()].some(text => text.includes(e.target.value.toLowerCase())))
        setShownTodos(filteredTodos)
    }

    const activeTodos = isLogin && [...shownTodos]
        .sort((a, b) => (a.priority || 10000) - (b.priority || 10000))
        .filter(task => !task.isComplete)
        .map(data => <Task key={data.id} {...data} />)

    return (
        <main>
            {
                !isLogin ?
                    <Intro />
                    :
                    <>
                        <section className='container h-screen'>
                            <div className='flex items-center justify-between my-6'>
                                <CgSortAz className='size-8 cursor-pointer' />
                                <h2 className='text-xl text-glow font-bold font-lato-bold text-primary'>TaskUp</h2>
                                {
                                    userData.userImg ?
                                        <img onClick={() => navigate("/profile")} className=' cursor-pointer size-12 object-cover rounded-full' src={userData.userImg} alt="Profile" />
                                        :
                                        <div className='flex items-center justify-center size-12 rounded-full bg-dark-light text-xl font-bold'>{userData.name[0]}</div>
                                }
                            </div>
                            {
                                allUserTodos?.length ?
                                    <>
                                        <div>
                                            <div className='flex gap-2 items-center h-12 rounded-[px] bg-dark-light px-3 border border-border/30'>
                                                <IoSearch className='size-6' />
                                                <input onChange={taskFilterHandler} className='outline-none w-full h-full bg-transparent' placeholder='Search for your task...' type="text" />
                                            </div>
                                        </div>
                                        {/* <select defaultValue="all" className=' flex items-center justify-center p-2 outline-none bg-primary-gray mt-4 w-28 h-10 rounded-md' onChange={e => console.log(e.target.value)}>
                                            <option value="all">All</option>
                                            <option value="today">Today</option>
                                            <option value="tomorrow">Tomorrow</option>
                                        </select> */}
                                        <div className='space-y-4 mt-8 pb-[120px]'>
                                            {activeTodos}
                                        </div>

                                        {
                                            [...shownTodos].filter(task => task.isComplete).length ? (
                                                <div className='space-y-4 pb-36'>
                                                    <p className=' p-2 outline-none bg-primary-gray mt-4 w-28 h-10 rounded-md'>Completed</p>
                                                    {[...shownTodos].filter(task => task.isComplete).map(data => <Task key={data.id} {...data} />)}
                                                </div>
                                            ) : null

                                        }

                                    </>

                                    :
                                    <div className='mt-40'>
                                        <img className='block m-auto max-s-[277px] s-full' src="/Images/Checklist-rafiki 1.png" />
                                        <h5 className=' text-[20px] font-bold text-center mt-2'>What do you want to do today?</h5>
                                        <p className='text-center text-md text-milky mt-2'>Tap + to add your tasks</p>
                                    </div>
                            }
                            <AddTodo />
                        </section>
                    </>
            }
            {/* <Nav /> */}
        </main>
    )
}