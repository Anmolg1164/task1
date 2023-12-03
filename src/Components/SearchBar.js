import React from 'react';
import { AiFillDelete } from "react-icons/ai";

function SearchBar({ searchQuery, onSearch,handleDeleteSelected }) {
  return (
    <div className='searchBar'>

      <input
        type='text'
        placeholder='Search...'
        value={searchQuery}
        onChange={onSearch}
        id='gsearch'

      />
               <AiFillDelete style={{fontSize:'30px', marginRight:"15px",cursor:"pointer"}} onClick={handleDeleteSelected} />


    </div>
  );
}

export default SearchBar;
