import React from 'react'
import { AiFillDelete } from "react-icons/ai";

function Navbar() {
  return (
    <div className='searchBar'>
        <input type='search' id='gsearch' placeholder='Enter Value...'></input>
        <AiFillDelete style={{fontSize:'30px'}} />

    </div>
  )
}

export default Navbar