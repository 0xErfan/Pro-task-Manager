import React from 'react'
import Intro from '../components/Intro'

export default function Home() {
    return (
        <>
            {
                "" ? <div>Home</div> : <Intro />
            }

        </>
    )
}
