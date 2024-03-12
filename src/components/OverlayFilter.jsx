import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddTodoShow } from '../Redux/Futures/userSlice'

const OverlayFilter = () => {
    const OverlayShow = useSelector(state => state.user.addTodoShow)
    const dispatch = useDispatch()

    return <div
        onClick={() => dispatch(setAddTodoShow(false))}
        className={`${OverlayShow ? "fixed" : "hidden"} h-screen transition-all size-full inset-0 z-30 opacity-60 bg-black`}></div>
}

export default OverlayFilter
