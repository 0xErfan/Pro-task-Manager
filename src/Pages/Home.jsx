import React from 'react'
import Intro from '../components/Intro'
import supabase from "../client"

export default function Home() {

    const fetchData = async () => {
        let { data, error } = await supabase.from("users").select()
        console.log(JSON.parse(data[13].todos));
        console.log(error);
    }

    return (
        <>
            {
                "" ? <div>Home</div> : <Intro />
            }

        </>
    )
}
