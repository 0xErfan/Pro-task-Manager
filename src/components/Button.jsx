import React from 'react'

export default function Button(data) {
    const { text, color, border, active = 1, fn } = data.data

    return (
        <button
            onKeyDown={e => console.log(e.key)}
            disabled={!active}
            onClick={fn}
            className={`${color ? (border ? "text-white" : "text-milky-dark border border-primary") : "text-white bg-primary "} ${active ? "opacity-100" : "opacity-30"} ${border && "border-2 border-primary"} m-auto w-full transition-all max-w-[460px] mr-2 h-14 px-6 font-lato rounded-md z-40`}>{text}
        </button>
    )
}
