import React from 'react'

export default function Input(data) {
    const { placeholder, title, id, value, onChange, type } = data.data

    return (
        <label className='flex flex-col gap-2' htmlFor={id}>
            {title}
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                className='h-12 rounded-sm pl-2 bg-dark-light border border-border text-milky-dark'
                placeholder={placeholder}
                type={type || "text"}
                id={id}
            />
        </label>
    )
}
