import React, { useEffect, useState } from 'react'
import Intro from '../components/Intro'
import { getCookie, getParsedTodos } from '../utils'
import { isLoginSetter } from '../Redux/Futures/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CgSortAz } from "react-icons/cg";
import { useNavigate } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import Nav from '../components/Nav'
import AddTodo from '../components/AddTodo'
import OverlayFilter from '../components/OverlayFilter'
import Task from '../components/Task'

export default function Home() {

    const dispatch = useDispatch()
    const { isLogin, userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [shownTodos, setShownTodos] = useState([])
    const [addTodoShown, setAddTodoShown] = useState(false)

    useEffect(() => setShownTodos(allUserTodos), [userData.todos])
    useEffect(() => { dispatch(isLoginSetter(getCookie())) }, [])

    let allUserTodos
    if (isLogin) allUserTodos = getParsedTodos(userData.todos)

    const taskFilterHandler = e => {
        let filteredTodos = [...allUserTodos]
        filteredTodos = filteredTodos.filter(todo => [todo.title.toLowerCase(), todo.description.toLowerCase()].some(text => text.includes(e.target.value.toLowerCase())))
        setShownTodos(filteredTodos)
    }

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
                                <h2 className='text-xl font-bold font-lato-bold text-primary'>UpTodo</h2>
                                {
                                    !userData?.userImg ?
                                        <img onClick={() => navigate("/account")} className=' cursor-pointer size-12 object-cover rounded-full' src="https://fakeimg.pl/250x100/" alt="Profile" />
                                        :
                                        <div className='flex items-center justify-center size-12 rounded-full bg-dark-light text-xl font-bold'>{userData.name[0]}</div>
                                }
                            </div>
                            {
                                allUserTodos?.length ?
                                    <>
                                        <div className=''>
                                            <div className='flex gap-2 items-center h-12 rounded-[px] bg-dark-light px-3 border border-border/30'>
                                                <IoSearch className='size-6' />
                                                <input onChange={taskFilterHandler} className='outline-none w-full h-full bg-transparent' placeholder='Search for your task...' type="text" />
                                            </div>
                                        </div>
                                        <select defaultValue="all" className=' flex items-center justify-center p-2 outline-none bg-primary-gray mt-4 w-28 h-10 rounded-md' onChange={e => console.log(e.target.value)}>
                                            <option value="all">All</option>
                                            <option value="today">Today</option>
                                            <option value="tomorrow">Tomorrow</option>
                                        </select>
                                        <div className='space-y-4 mt-4 pb-[120px]'>
                                            {// 1000 because if the todo did't have priority value, it goes to the bottom in sorting
                                                [...shownTodos].sort((a, b) => (a.priority || 10000) - (b.priority || 10000)).map(data => <Task key={data.id} {...data} />)
                                            }</div>
                                    </>

                                    :
                                    <div className='mt-40'>
                                        <img className='block m-auto max-s-[277px] s-full' src="/Images/Checklist-rafiki 1.png" />
                                        <h5 className=' text-[20px] font-bold text-center mt-2'>What do you want to do today?</h5>
                                        <p className='text-center text-md text-milky mt-2'>Tap + to add your tasks</p>
                                    </div>
                            }
                            <Nav />
                            <AddTodo visible={addTodoShown} />
                        </section>
                    </>
            }
            <OverlayFilter />
        </main>
    )
}