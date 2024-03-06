import React from 'react'

export default function Button(data) {
    const { text, color, border, fn } = data.data
    return (
        <button onClick={fn} className={`${color ? (border ? "text-milky" : "text-milky-dark") : "text-milky bg-primary "} ${border && "border-2 border-primary"} w-full h-12 px-6 font-lato rounded-md`}>{text}</button>
    )
}
