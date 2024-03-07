import React from 'react'

export default function Button(data) {
    const { text, color, border, active = 1, fn } = data.data

    return (
        <button
            disabled={!active}
            onClick={fn}
            className={`${color ? (border ? "text-white" : "text-milky-dark") : "text-white bg-primary "} ${active ? "opacity-100" : "opacity-30"} ${border && "border-2 border-primary"} w-full transition-all h-14 px-6 font-lato rounded-md`}>{text}
        </button>
    )
}
