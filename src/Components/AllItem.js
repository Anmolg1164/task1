

import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import Item from './Item';
import SearchBar from './SearchBar';

function AllItem() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false); // Added state for "Select All"
  const itemsPerPage = 10; //we can hit number of page in a page as we want 

  const getUsers = useCallback(async () => {
    try {
      // fetching data with axios
      const { data } = await axios.get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      //for we have to change in one case letter
      const filteredUsers = data.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [searchQuery]);

  useEffect(() => {
    getUsers();
  }, [getUsers, searchQuery]);

  //for pagination the simple logic here 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSelect = (itemId) => {
    const updatedSelectedItems = [...selectedItems];
    const index = updatedSelectedItems.indexOf(itemId);

    if (index !== -1) {
      // Item is already selected, so unselect it
      updatedSelectedItems.splice(index, 1);
    } else {
      // Item is not selected, so select it
      updatedSelectedItems.push(itemId);
    }

    setSelectedItems(updatedSelectedItems);
  };

  const handleSelectAll = () => {
    // Toggle the "Select All" state
    setSelectAll(!selectAll);

    // If "Select All" is true, select all items on the current page; otherwise, clear the selection
    if (!selectAll) {
      const allItemsOnPage = currentUsers.map((user) => user.id);
      setSelectedItems(allItemsOnPage);
    } else {
      setSelectedItems([]);
    }
  };

  const handleDeleteSelected = () => {
    // Filter out the selected items from the users array
    const updatedUsers = users.filter((user) => !selectedItems.includes(user.id));
    setUsers(updatedUsers);
    setSelectedItems([]);
    setSelectAll(false);
  };

  return (
    <div className='totalItem'>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} handleDeleteSelected={handleDeleteSelected} />

      <div className='mainHead'>
        <input type='checkbox' checked={selectAll} onChange={handleSelectAll} />
        <h3>Name</h3>
        <h3>Email</h3>
        <h3 style={{ marginLeft: 110 }}>Role</h3>
        <h3>Actions</h3>
      </div>
      {currentUsers.map((user) => (
        <Item
          key={user.id}
          name={user.name}
          email={user.email}
          role={user.role}
          id={user.id}
          isSelected={selectedItems.includes(user.id)}
          onSelect={handleSelect}
          onDelete={handleDelete}
        />
      ))}

      <div className='pageNavigate'>
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} id="btnAll">
            {index + 1}
          </button>
        ))}
      </div>
      <div className='pageDec' > {`You are on page ${currentPage}`} </div>

      
    </div>
  );
}

export default AllItem;
