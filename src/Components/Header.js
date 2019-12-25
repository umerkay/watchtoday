import React from 'react'

export default function Header({ focus }) {
  return (
    <header className={"App-header" + (focus ? " focus" : "")}>
      <h2 className="title">Watch<span className='primary'>Today</span></h2>
      <span className="details">
        Can not decide which movie to watch today? You are in the right place
        <br></br>
        <span className="info">This application is only a demonstration of Umer's frontend skills with React, a JavaScript framework</span>
      </span>
    </header>
  )
}