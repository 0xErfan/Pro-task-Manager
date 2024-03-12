import React, { useEffect, useRef, useState } from 'react'
import { MdOutlineTimer } from "react-icons/md";
import { VscSend } from "react-icons/vsc";
import { IoPricetagsOutline } from "react-icons/io5";
import { HiOutlineFlag } from "react-icons/hi2";
import { TiTickOutline } from "react-icons/ti";
import Button from "./Button"
import userSlice, { newTodoUpdater, setOverlayShow, setAddTodoShow } from '../Redux/Futures/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function AddTodo() {

    const titleRef = useRef()
    const [activePrio, setActivePrio] = useState(2)
    const [isPrioShown, setIsPrioShown] = useState(false)
    const [isCategoriesShown, setIsCategoriesShown] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [prioChosen, setPrioChosen] = useState(false)
    const [categoryChosen, setCategoryChosen] = useState(false)
    const [category, setCategory] = useState("Home")
    const { addTodoShow, userData } = useSelector(state => state.user)

    const dispatch = useDispatch()

    const chosenPriorities = userData.todos.filter(todo => todo.priority)

    // addTodoShow && dispatch(setOverlayShow(true))

    useEffect(() => { titleRef.current?.focus() }, [addTodoShow])
    useEffect(() => { setActivePrio(allPriorities.find(value => !value.props.className.includes("opacity")).key) }, [userData.todos])

    const addNewTodo = () => {
        const newTodo = {
            id: Date.now(),
            title,
            description,
            priority: prioChosen ? activePrio : null,
            category: categoryChosen ? category : null,
            time: null
        }
        dispatch(newTodoUpdater(newTodo))

        setTitle("")
        setCategory("Home")
        setDescription("")
        setCategoryChosen(false)
        setPrioChosen(false)
        dispatch(setOverlayShow(false))
        dispatch(setAddTodoShow(false))
    }

    let allPriorities = []

    for (let i = 1; i <= 10; i++) {

        allPriorities.push(<div
            key={i}
            onClick={() => chosenPriorities.filter(value => value.priority == i).length ? "" : setActivePrio(i)}
            className={`${activePrio == i ? "bg-primary" : "bg-[#272727]"} ${chosenPriorities.filter(value => value.priority == i).length && "opacity-30"} transition-colors cursor-pointer`}>
            {i}
            <HiOutlineFlag />
        </div>)

    }

    return (
        <>
            <div className={`z-40 min-h-[228px] bg-primary-gray w-full left-0 fixed px-3  transition-all ${addTodoShow ? "bottom-0 opacity-100" : "opacity-0 -bottom-[258px]"}  rounded-t-2xl`}>
                <h4 className=" flex items-center gap-1 text-[18px] font-lato-bold ch:size-7 p-4 text-primary">Add task <TiTickOutline /></h4>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    ref={titleRef}
                    className='flex justify-center items-center w-full h-10 rounded-md mt-3 pl-3 text-[20px] focus:border focus:border-border bg-transparent outline-none placeholder:text-milky-dark' placeholder='Title' type="text" spellCheck={false} />

                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className='flex justify-center items-center w-full rounded-md mt-3 pl-6 text-[20px] min-h-10 max-h-24 focus:border focus:border-border bg-transparent placeholder:text-milky-dark outline-none' placeholder='Description' spellCheck={false} />
                <div className='flex items-center justify-between mt-6 py-4 px-3'>
                    <div className='flex items-center gap-6 justify-between ch:size-6 ch:cursor-pointer'>
                        <MdOutlineTimer />
                        <IoPricetagsOutline onClick={() => setIsCategoriesShown(true)} className={`${categoryChosen && "text-primary"} -rotate-90`} />
                        <HiOutlineFlag className={`${prioChosen && "text-primary"}`} onClick={() => setIsPrioShown(true)} />
                    </div>
                    <VscSend onClick={addNewTodo} className='text-primary size-7 cursor-pointer' />
                </div>

            </div>

            <div className={`${isPrioShown && "h-screen fixed transition-all backdrop-blur-[2px] inset-0 z-40"}`}>
                <div className={` ${!isPrioShown && "hidden"} addPrioruty flex flex-col items-center h-auto bg-primary-gray w-[93%] rounded-md p-4`}>
                    <p className='text-center border-b w-full border-border pb-2'>Task Priority</p>
                    <div className='grid grid-cols-4 gap-4 mt-4 ch:flex ch:flex-col-reverse ch:gap-2 ch:items-center ch:justify-center ch:rounded-md ch:size-16 ch:ch:size-5'>
                        {allPriorities}
                    </div>
                    <div className='flex items-center justify-between mt-6 w-full'>
                        <Button data={{ text: "Cancel", color: 1, fn: () => { setIsPrioShown(false), setPrioChosen(false) } }} />
                        <Button data={{ text: "Save", fn: () => { setIsPrioShown(false), setPrioChosen(true) } }} />
                    </div>
                </div>
            </div>

            <div className={`${isCategoriesShown && "h-screen fixed transition-all backdrop-blur-[2px] inset-0 z-40"}`}>
                <div className={` ${!isCategoriesShown && "hidden"} addPrioruty flex flex-col items-center h-auto bg-primary-gray w-[93%] rounded-md p-4`}>
                    <p className='text-center border-b w-full border-border pb-2'>Choose category</p>
                    <div className='grid grid-cols-3 gap-6 mt-4 ch:size-16 bg-primary-gray'>
                        {
                            categoryList.map(data => <div
                                onClick={() => setCategory(data.catName)}
                                key={data.catName}
                            >
                                <div className='flex flex-col items-center gap-1'>
                                    <div style={{ backgroundColor: data.bgColor }} className={` ${category == data.catName && "border-4 border-primary"} size-14 cursor-pointer flex items-center justify-center rounded-md transition-all`}>{data.svg}</div>
                                    <p className='text-[13px] text-center'>{data.catName}</p>
                                </div>
                            </div>)
                        }
                    </div>
                    <div className='flex items-center justify-between mt-8 w-full'>
                        <Button data={{ text: "Cancel", color: 1, fn: () => { setIsCategoriesShown(false), setCategoryChosen(null) } }} />
                        <Button data={{ text: "Add category", fn: () => { setIsCategoriesShown(false), setCategoryChosen(true) } }} />
                    </div>
                </div>
            </div>
        </>
    )
}

const categoryList = [
    {
        catName: "Home", bgColor: "#FFCC80", color: "#A36200", svg: <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <path
                d="M26.6665 10.6667L18.6665 3.65333C17.9332 2.99739 16.9838 2.63475 15.9999 2.63475C15.016 2.63475 14.0666 2.99739 13.3332 3.65333L5.33322 10.6667C4.90971 11.0454 4.57175 11.5101 4.34184 12.0297C4.11194 12.5492 3.99537 13.1118 3.99988 13.68V25.3333C3.99988 26.3942 4.42131 27.4116 5.17146 28.1618C5.9216 28.9119 6.93902 29.3333 7.99988 29.3333H23.9999C25.0607 29.3333 26.0782 28.9119 26.8283 28.1618C27.5785 27.4116 27.9999 26.3942 27.9999 25.3333V13.6667C28.0025 13.1007 27.885 12.5407 27.6552 12.0236C27.4253 11.5064 27.0884 11.0439 26.6665 10.6667ZM18.6665 26.6667H13.3332V20C13.3332 19.6464 13.4737 19.3072 13.7237 19.0572C13.9738 18.8071 14.3129 18.6667 14.6665 18.6667H17.3332C17.6868 18.6667 18.026 18.8071 18.276 19.0572C18.5261 19.3072 18.6665 19.6464 18.6665 20V26.6667ZM25.3332 25.3333C25.3332 25.6869 25.1927 26.0261 24.9427 26.2761C24.6926 26.5262 24.3535 26.6667 23.9999 26.6667H21.3332V20C21.3332 18.9391 20.9118 17.9217 20.1616 17.1716C19.4115 16.4214 18.3941 16 17.3332 16H14.6665C13.6057 16 12.5883 16.4214 11.8381 17.1716C11.088 17.9217 10.6665 18.9391 10.6665 20V26.6667H7.99988C7.64626 26.6667 7.30712 26.5262 7.05707 26.2761C6.80702 26.0261 6.66655 25.6869 6.66655 25.3333V13.6667C6.66679 13.4773 6.70734 13.2903 6.78551 13.1178C6.86367 12.9454 6.97766 12.7916 7.11988 12.6667L15.1199 5.66666C15.3632 5.4529 15.676 5.33501 15.9999 5.33501C16.3238 5.33501 16.6366 5.4529 16.8799 5.66666L24.8799 12.6667C25.0221 12.7916 25.1361 12.9454 25.2143 13.1178C25.2924 13.2903 25.333 13.4773 25.3332 13.6667V25.3333Z"
                fill="#A30000"
            />
        </svg>
    },
    {
        catName: "Work", bgColor: "#FF9680", color: "#FF9680", svg: <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <path
                d="M12.0033 2.99594C10.3587 2.99594 8.99763 4.35707 8.99763 6.00164V6.99769H4.0018C2.3566 6.99769 1.00391 8.35626 1.00391 10.0014V12.0013C1.00391 13.1372 1.64629 14.1746 2.65812 14.6809C2.77087 14.7373 2.88324 14.7944 2.99599 14.8508V25.9967C2.99599 27.6413 4.35709 29.0024 6.00169 29.0024H25.9967C27.6414 29.0024 29.0024 27.6413 29.0024 25.9967V14.8508C29.1157 14.7941 29.229 14.7375 29.3423 14.6809C30.3542 14.1747 30.9945 13.1372 30.9945 12.0013V10.0014C30.9945 8.35626 29.6438 6.99769 27.9986 6.99769H23.0008V6.00164C23.0008 4.35707 21.6417 2.99594 19.9971 2.99594H12.0033ZM12.0033 4.99584H19.9971C20.5684 4.99584 21.0009 5.43036 21.0009 6.00164V6.99769H10.9975V6.00164C10.9975 5.43036 11.432 4.99584 12.0033 4.99584ZM4.0018 8.99758H27.9986C28.5631 8.99758 29.0024 9.43692 29.0024 10.0014V12.0013C29.0024 12.3795 28.784 12.7247 28.4419 12.8958C24.4437 14.8961 20.4446 16.8942 16.4465 18.8955C16.1623 19.0376 15.8361 19.0376 15.552 18.8955C11.5538 16.8942 7.55667 14.8961 3.55846 12.8958C3.2163 12.7246 2.99599 12.3795 2.99599 12.0013V10.0014C2.99599 9.43692 3.43729 8.99758 4.0018 8.99758ZM15.9992 14.9992C15.447 14.9992 14.9993 15.4469 14.9993 15.9992C14.9993 16.5514 15.447 16.9991 15.9992 16.9991C16.5515 16.9991 16.9992 16.5514 16.9992 15.9992C16.9992 15.4469 16.5515 14.9992 15.9992 14.9992ZM4.99784 15.8507C8.21645 17.4608 11.4337 19.0718 14.6516 20.6825C15.497 21.1057 16.5014 21.1057 17.3468 20.6825C20.5648 19.0717 23.7838 17.4609 27.0026 15.8507V25.9967C27.0026 26.5679 26.568 27.0006 25.9967 27.0006H6.00169C5.43047 27.0006 4.99784 26.5679 4.99784 25.9967V15.8507Z"
                fill="#A31D00"
            />
        </svg>
    },
    {
        catName: "University", bgColor: "#809CFF", color: "#0055A3", svg: <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <path
                d="M28.6533 13.5867L27.32 12.8533L15.32 6.18667H15.1733C15.0916 6.1521 15.0068 6.12532 14.92 6.10667H14.6667H14.4267C14.3356 6.12533 14.2463 6.15211 14.16 6.18667H14.0133L2.01333 12.8533C1.80814 12.9696 1.63746 13.1383 1.51871 13.3421C1.39997 13.5458 1.3374 13.7775 1.3374 14.0133C1.3374 14.2492 1.39997 14.4808 1.51871 14.6846C1.63746 14.8884 1.80814 15.057 2.01333 15.1733L5.33333 17.0133V23.3333C5.33333 24.3942 5.75476 25.4116 6.50491 26.1618C7.25505 26.9119 8.27247 27.3333 9.33333 27.3333H20C21.0609 27.3333 22.0783 26.9119 22.8284 26.1618C23.5786 25.4116 24 24.3942 24 23.3333V17.0133L26.6667 15.52V19.3333C26.6667 19.687 26.8071 20.0261 27.0572 20.2761C27.3072 20.5262 27.6464 20.6667 28 20.6667C28.3536 20.6667 28.6928 20.5262 28.9428 20.2761C29.1929 20.0261 29.3333 19.687 29.3333 19.3333V14.7467C29.3329 14.5104 29.2697 14.2785 29.1503 14.0747C29.0308 13.8708 28.8593 13.7024 28.6533 13.5867ZM21.3333 23.3333C21.3333 23.687 21.1929 24.0261 20.9428 24.2761C20.6928 24.5262 20.3536 24.6667 20 24.6667H9.33333C8.97971 24.6667 8.64057 24.5262 8.39052 24.2761C8.14048 24.0261 8 23.687 8 23.3333V18.4933L14.0133 21.8267L14.2133 21.9067H14.3333C14.444 21.9206 14.556 21.9206 14.6667 21.9067C14.7773 21.9206 14.8893 21.9206 15 21.9067H15.12C15.1908 21.8917 15.2585 21.8647 15.32 21.8267L21.3333 18.4933V23.3333ZM14.6667 19.1467L5.41333 14L14.6667 8.85333L23.92 14L14.6667 19.1467Z"
                fill="#0055A3"
            />
        </svg>
    },
    {
        catName: "Sport", bgColor: "#80FFD9", color: "#00A372", svg: <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <path
                d="M9.2798 27.5996C11.754 27.5996 13.7598 25.5939 13.7598 23.1196C13.7598 20.6454 11.754 18.6396 9.2798 18.6396C6.80557 18.6396 4.7998 20.6454 4.7998 23.1196C4.7998 25.5939 6.80557 27.5996 9.2798 27.5996Z"
                stroke="#00A372"
                strokeWidth={1.7}
                strokeMiterlimit={10}
            />
            <path
                d="M25.7998 13.5998H18.5998C18.1198 13.5998 17.7998 13.2798 17.7998 12.7998V5.5998C17.7998 5.1198 18.1198 4.7998 18.5998 4.7998H25.7998C26.2798 4.7998 26.5998 5.1198 26.5998 5.5998V12.7998C26.5998 13.2798 26.2798 13.5998 25.7998 13.5998Z"
                stroke="#00A372"
                strokeWidth={1.7}
                strokeMiterlimit={10}
            />
            <path
                d="M25.7997 27.5997C25.6397 27.5997 25.4797 27.5997 25.3197 27.4397L17.9597 20.0797C17.6397 19.7597 17.6397 19.2797 17.9597 18.9597C18.2797 18.6397 18.7597 18.6397 19.0797 18.9597L26.4397 26.3197C26.7597 26.6397 26.7597 27.1197 26.4397 27.4397C26.2797 27.5997 26.1197 27.5997 25.7997 27.5997Z"
                fill="#00A372"
            />
            <path
                d="M18.4396 27.5997C18.5996 27.5997 18.7596 27.5997 18.9196 27.4397L26.2796 20.0797C26.5996 19.7597 26.5996 19.2797 26.2796 18.9597C25.9596 18.6397 25.4796 18.6397 25.1596 18.9597L17.7996 26.3197C17.4796 26.6397 17.4796 27.1197 17.7996 27.4397C18.1196 27.5997 18.2796 27.5997 18.4396 27.5997Z"
                fill="#00A372"
            />
            <path
                d="M12.9601 13.6H5.60005C4.96005 13.6 4.64005 13.12 4.80005 12.64L8.48005 5.28C8.80005 4.8 9.60005 4.8 9.76005 5.28L13.4401 12.64C13.7601 13.12 13.4401 13.6 12.9601 13.6Z"
                stroke="#00A372"
                strokeWidth={1.7}
                strokeMiterlimit={10}
            />
        </svg>
    },
    {
        catName: "Social", bgColor: "#FF80EB", color: "#A30089", svg: <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <path
                d="M25.8434 26.722C25.5984 26.722 25.3549 26.641 25.1554 26.4835L17.3349 20.3425C17.0664 20.1315 16.9094 19.809 16.9094 19.4675V9.2685C16.9094 8.9265 17.0659 8.604 17.3344 8.3935L25.1549 2.251C25.4904 1.9885 25.9459 1.939 26.3299 2.1255C26.7129 2.3115 26.9559 2.7 26.9559 3.1265V25.609C26.9559 26.035 26.7129 26.424 26.3299 26.61C26.1749 26.685 26.0084 26.722 25.8434 26.722ZM19.1354 18.926L24.7299 23.3195V5.416L19.1354 9.81V18.926Z"
                fill="#A30089"
            />
            <path
                d="M18.0225 20.5535H6.186C2.775 20.5535 0 17.779 0 14.3675C0 10.957 2.775 8.182 6.186 8.182H18.0225C18.637 8.182 19.1355 8.68 19.1355 9.2955V19.4405C19.1355 20.055 18.637 20.5535 18.0225 20.5535ZM6.186 10.408C4.0025 10.408 2.226 12.184 2.226 14.3675C2.226 16.551 4.0025 18.3275 6.186 18.3275H16.9095V10.408H6.186Z"
                fill="#A30089"
            />
            <path
                d="M8.59191 29.987C7.86591 29.987 7.15491 29.7765 6.53241 29.37C5.68641 28.818 5.10591 27.969 4.89791 26.9815L3.29041 19.3385C3.16391 18.737 3.54891 18.1465 4.15041 18.02C4.75341 17.893 5.34241 18.279 5.46891 18.88L7.07691 26.523C7.16241 26.9295 7.40091 27.2785 7.74991 27.5065C8.09741 27.733 8.51241 27.8125 8.91891 27.726C9.75691 27.5485 10.2959 26.721 10.1194 25.8835L8.81241 19.669C8.68591 19.0675 9.07141 18.4775 9.67291 18.3505C10.2749 18.2245 10.8644 18.6095 10.9909 19.211L12.2979 25.425C12.7264 27.462 11.4174 29.4715 9.37991 29.904C9.11691 29.9595 8.85291 29.987 8.59191 29.987ZM27.5659 18.802H25.8424C25.2279 18.802 24.7294 18.304 24.7294 17.6885C24.7294 17.074 25.2279 16.5755 25.8424 16.5755H27.5659C28.1554 16.5755 28.7094 16.3465 29.1249 15.9305C29.5434 15.5125 29.7739 14.9575 29.7739 14.367C29.7739 13.149 28.7834 12.159 27.5659 12.159H25.8424C25.2279 12.159 24.7294 11.6605 24.7294 11.0455C24.7294 10.4305 25.2279 9.9325 25.8424 9.9325H27.5659C30.0109 9.9325 31.9999 11.9215 31.9999 14.3665C31.9999 15.551 31.5379 16.6655 30.6989 17.5045C29.8629 18.342 28.7499 18.802 27.5659 18.802Z"
                fill="#A30089"
            />
        </svg>
    },
    {
        catName: "Health", bgColor: "#80FFA3", color: "#00A3A3", svg: <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"

        >
            <path
                d="M11.1539 4.0031C7.21935 4.0031 4.00186 7.18907 4.00187 11.1044C4.0394 12.078 4.20149 13.1655 4.40029 14.0067H2.99605C1.6325 13.9764 1.6325 16.0371 2.99605 16.0065H5.02527C6.77765 20.5603 10.6991 25.1134 15.5092 27.8675C15.8156 28.0417 16.1911 28.0417 16.4975 27.8675C19.6775 26.0467 22.5124 23.3153 24.5811 20.3247C25.5509 18.9229 26.3472 17.4641 26.9307 16.0065H29.0028C30.3664 16.0367 30.3664 13.9761 29.0028 14.0067H27.5849C27.8493 12.9983 27.9857 12.0581 27.999 11.1044C27.999 7.18907 24.7795 4.0031 20.845 4.0031C19.0134 4.0031 17.2915 4.69936 15.9936 5.88783C14.6967 4.70231 12.9838 4.0031 11.1539 4.0031ZM11.1539 6.00501C12.7476 6.00501 14.216 6.72453 15.1772 7.915C15.5501 8.37703 16.2411 8.41433 16.6615 7.99516C17.9014 6.90617 19.4474 6.02772 20.845 6.00501C23.6609 6.00501 25.9182 8.20638 25.9912 10.9676C25.9284 12.0378 25.764 13.1411 25.5088 14.0067H21.0012C20.7362 14.0047 20.4812 14.1079 20.2922 14.2939L19.2727 15.3134L17.8939 12.5596C17.5247 11.8251 16.4761 11.8251 16.1069 12.5596L15.103 14.5673L13.9292 11.6299C13.7762 11.2471 13.404 10.9975 12.9917 11.0011C12.6584 11.0044 12.3486 11.1734 12.1656 11.4522L10.4665 14.0068H6.51544C6.22998 12.9423 6.03781 11.8973 6.01156 10.9229C6.10795 8.18284 8.35332 6.00513 11.1539 6.00513V6.00501ZM12.7769 14.1394L14.0698 17.3717C14.3879 18.1732 15.5033 18.2234 15.892 17.4538L16.9994 15.239L18.1068 17.4538C18.4129 18.0635 19.2263 18.1944 19.7083 17.7115L21.4133 16.0065H24.7491C24.2677 17.0663 23.6578 18.1427 22.9347 19.188C21.1565 21.7586 18.6532 24.024 16.0034 25.6682C12.1793 23.2952 8.98009 19.5725 7.30057 16.0065H10.9977C11.3345 16.0065 11.6487 15.8368 11.8336 15.5553L12.7769 14.1394Z"
                fill="#00A3A3"
            />
        </svg>
    },
    {
        catName: "Grocery", bgColor: "#CCFF80", color: "#21A300", svg: <svg
            width={32}
            height={32}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22.9999 6C24.6999 8.3 21.1999 8.3 22.9999 11M15.9999 27C29.4999 27 29.1999 25.2 28.8999 21.4C28.5999 17.2 23.9999 14 15.9999 14C7.99994 14 3.39994 17.2 3.09994 21.4C2.79994 25.2 2.49994 27 15.9999 27ZM15.9999 19C15.9999 17.5 16.0999 15.8 16.9999 14L15.9999 19ZM9.99994 19C9.99994 17.5 10.0999 16.4 10.9999 14.7L9.99994 19ZM21.9999 19C21.9999 17.7 22.0999 16.6 22.7999 15.1L21.9999 19ZM15.9999 5C17.6999 7.3 14.1999 7.3 15.9999 10V5ZM8.99994 6C10.6999 8.3 7.19994 8.3 8.99994 11V6Z"
                stroke="#21A300"
                strokeWidth={2}
                strokeMiterlimit={10}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    },
]