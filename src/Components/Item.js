import React, { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';

function Item({ name, email, role, onDelete, id, isSelected, onSelect }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedRole, setEditedRole] = useState(role);


  // in this component I rendered user info structure and set all user for same in allItem 
  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleCheckboxChange = () => {
    onSelect(id);
  };

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setEditedRole(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Exit editing mode
      setIsEditing(false);
    }
  };

  return (
    <div className={`oneBox ${isSelected ? 'selected' : ''} ${isEditing ? 'editing' : ''}`}>
      <input type='checkbox' checked={isSelected} onChange={handleCheckboxChange} />
      <h3>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
          />
        ) : (
          editedName
        )}
      </h3> 
          {/* editing section is here  */}
      <h3>
        
        {isEditing ? (
          <input
            type="text"
            value={editedEmail}
            onChange={handleEmailChange}
            onKeyPress={handleKeyPress}
          />
        ) : (
          editedEmail
        )}
      </h3>
      <h3>
        {isEditing ? (
          <input
            type="text"
            value={editedRole}
            onChange={handleRoleChange}
            onKeyPress={handleKeyPress}
          />
        ) : (
          editedRole
        )}
      </h3>
      <h3 style={{ cursor: 'pointer' }}>
        <MdOutlineDeleteOutline onClick={handleDelete} style={{ fontSize: 25 }} />
        <FaEdit onClick={handleEdit} style={{ fontSize: 25 }} />
      </h3>
    </div>
  );
}

export default Item;
