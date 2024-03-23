import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import Input from '../components/Input'
import Button from "../components/Button"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCookie, showToast } from "../utils"
import supabase from "../client"
import { isLoginSetter, userLogin } from '../Redux/Futures/userSlice'

export default function Register() {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isOnline, isLogin } = useSelector(state => state.user)

    const [showError, setShowError] = useState(null)

    const active = password.trim().length > 7 && userName.trim().length > 3 && password == repeatPassword

    useEffect(() => {
        let timeout
        if (!userName.length) { return }
        clearTimeout(timeout)
        timeout = setTimeout(() => userName.length < 4 ? setShowError(preve => preve + "username") : setShowError(preve => preve?.replace("username", "")), 600);
        return () => clearTimeout(timeout)
    }, [userName])

    useEffect(() => {
        let timeout
        if (!password.length) { return }
        clearTimeout(timeout)
        timeout = setTimeout(() => password.length < 8 ? setShowError(preve => preve + "password") : setShowError(preve => preve?.replace("password", "")), 600);
        return () => clearTimeout(timeout)
    }, [password])

    useEffect(() => {
        let timeout
        if (!repeatPassword.length) { return }
        clearTimeout(timeout)
        timeout = setTimeout(() => repeatPassword.length < 8 ? setShowError(preve => preve + "repeatPassword") : setShowError(preve => preve?.replace("repeatPassword", "")), 600);
        return () => clearTimeout(timeout)
    }, [repeatPassword])


    const formSubmit = async () => {

        if (!isOnline) {
            showToast(dispatch, "Check your internet connection!", 0)
            return
        }

        try {
            const { error } = await supabase.from("users").insert({ name: userName, password, todos: [], userImg: null })

            if (error) {
                showToast(dispatch, "This username already exist!", 0)
                throw new Error(error)
            }

            showToast(dispatch, "Your account registered successfully.", 1)

            setTimeout(() => { dispatch(userLogin({ userName, password })) }, 1500);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {
                isLogin ? <Navigate to="/" />
                    :
                    <section className='container'>
                        <button onClick={() => navigate("/")} className='text-milky block mr-auto my-5 ch:size-6'><IoIosArrowBack /></button>
                        <h3 className='text-milky font-lato-bold text-[32px] py-12'>Register</h3>
                        <form className='mt-3 space-y-4'>
                            <div >
                                <Input data={{ id: "name", title: "Username", placeholder: "Enter your username", value: userName, onChange: data => setUserName(data) }} />
                                <div className={`text-sm ${showError?.includes("username") ? "opacity-100" : "opacity-0"} mt-2 text-center transition-all text-red-400`} >Username must contain at least 4 characters</div>
                            </div>

                            <div>
                                <Input data={{ id: "pass", title: "Password", placeholder: "Enter your password", value: password, onChange: data => setPassword(data), type: "password" }} />
                                <div className={`text-sm ${showError?.includes("password") ? "opacity-100" : "opacity-0"} mt-2 text-center transition-all text-red-400`} >Password must contain at least 8 characters</div>
                            </div>

                            <div>
                                <Input data={{ id: "rep-pass", title: "Confirm Password", placeholder: "Confirm your password", value: repeatPassword, onChange: data => setRepeatPassword(data), type: "password" }} />
                                <div className={`text-sm ${showError?.includes("repeatPassword") ? "opacity-100" : "opacity-0"} mt-2 text-center transition-all text-red-400`} >Password must contain at least 8 characters</div>
                            </div>
                        </form>
                        <div className='pt-24'><Button data={{ text: "Register", active, fn: formSubmit }} /></div>
                        <div className=' h-[3px] mt-12 bg-dark-light relative'><span className="absolute translate-x-0.5 translate-y-0.5 right-[45%] z-20 h-4 -top-3 text-sm text-center bg-primary-black size-12">OR</span></div>
                        <div className='text-milky-dark mt-6 text-sm text-center z-30'>Already have an account?<Link to="/login" className=' text-primary font-bold underline'>Login</Link></div>
                    </section>
            }
        </>
    )
}