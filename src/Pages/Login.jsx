import React, { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import Input from '../components/Input'
import Button from "../components/Button"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCookie, showToast } from '../utils'
import { userLogin } from '../Redux/Futures/userSlice'

export default function Login() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isOnline = useSelector(store => store.user.isOnline)

    const active = password.trim().length > 7 && userName.trim().length > 3

    const reseter = () => {
        setTimeout(() => {
            setPassword("");
            setUserName("");
        }, 2000);
    }

    const formSubmit = () => {
        if (!isOnline) {
            showToast("Check your internet connection!", 0);
            return;
        }
        
        dispatch(userLogin({ userName, password, showToast, setCookie, reseter }))
    };


    return (
        <section className='container'>
            <button onClick={() => navigate("/")} className='text-milky block mr-auto my-5 ch:size-6'><IoIosArrowBack /></button>
            <h3 className='text-milky font-lato-bold text-[32px] py-12'>Login</h3>
            <form className='mt-3 space-y-8'>
                <Input data={{ id: "name", title: "Username", placeholder: "Enter your username", value: userName, onChange: data => setUserName(data) }} />
                <Input data={{ id: "pass", title: "Password", placeholder: "Enter your password", value: password, onChange: data => setPassword(data), type: "password" }} />
            </form>
            <div className='pt-24'><Button data={{ text: "Login", active, fn: formSubmit }} /></div>
            <div className=' h-[3px] mt-12 bg-dark-light relative'><span className="absolute translate-x-0.5 translate-y-0.5 right-[45%] z-20 h-4 -top-3 text-sm text-center bg-primary-black size-12">OR</span></div>
            <div className='text-milky-dark mt-6 text-sm text-center z-30'>Dont have an account? <Link to="/register" className=' text-primary font-bold underline'>Register</Link></div>
        </section>
    )
}