import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function Focus() {

  const isLogin = useSelector(state => state.user.isLogin)

  return (

    <>
      {
        !isLogin ?
          <Navigate to="/" />
          :
          <div className=' font-lato-bold font-bold text-xl text-center pt-24'>Focus feature will add soon!</div>
      }
    </>
  )
}
