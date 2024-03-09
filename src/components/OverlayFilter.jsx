import React from 'react'

const OverlayFilter = ({ visible }) => <div className={`${visible ? "hidden" : "fixed"} h-screen transition-all size-full inset-0 z-30 opacity-60 bg-black`}></div>

export default OverlayFilter
