import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setAddTodoShow, setOverlayShow } from '../Redux/Futures/userSlice'

const OverlayFilter = () => {

    const { addTodoShow, overlayShow } = useSelector(state => state.user)
    const dispatch = useDispatch()

    return (
        <div
            onClick={() => { dispatch(setAddTodoShow(false)), dispatch(setOverlayShow(false)) }}
            className={`${(overlayShow || addTodoShow) ? "fixed" : "hidden"} w-full h-screen transition-all size-full inset-0 z-30 opacity-60 bg-black`}>
        </div>
    )
}

export default OverlayFilter
