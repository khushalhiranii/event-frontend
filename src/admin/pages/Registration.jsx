import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRegisteredUsers } from '../context/RegisteredUsersContext';
import DefaultButton from '../DesignSystem/DefaultButton';
import SearchInput from '../DesignSystem/SearchInput';

const Registration = () => {
  const { id } = useParams();
  const { registeredUsers, fetchRegisteredUsers, loading, error } = useRegisteredUsers();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [checkedUsers, setCheckedUsers] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    fetchRegisteredUsers(id);
  }, [id]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  const handleSelectAll = () => {
    const newCheckedUsers = {};
    filteredUsers.forEach((user) => {
      newCheckedUsers[user.id] = !isAllChecked;
    });
    setCheckedUsers(newCheckedUsers);
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckboxChange = (userId) => {
    setCheckedUsers((prevCheckedUsers) => ({
      ...prevCheckedUsers,
      [userId]: !prevCheckedUsers[userId],
    }));
  };

  const filteredUsers = registeredUsers.filter(
    (user) =>
      (filter === 'All' || user.modeOfRegistration === filter) &&
      (user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNo.includes(searchTerm))
  );

  // Calculate counts for each filter option
  const allCount = registeredUsers.length;
  const onlineCount = registeredUsers.filter(user => user.modeOfRegistration === 'ONLINE').length;
  const onsiteCount = registeredUsers.filter(user => user.modeOfRegistration === 'ONSITE').length;

  const selectedUserIds = Object.keys(checkedUsers).filter(id => checkedUsers[id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4 gap-[32px]">
      <div className="flex flex-row justify-between items-center mb-4">
        <div className="text-sm font-semibold">Registered Users</div>
        <DefaultButton title="Create New" onClick={() => navigate(`/form/${id}`)} />
      </div>

      {/* Advanced Search Box */}
      <div className="mb-4 flex flex-row w-full">
        <SearchInput
          img={'/search1.svg'}
          type={"text"}
          placeholder={"Search by name or phone number"}
          value={searchTerm}
          onChange={handleSearchChange}
          title={"Search"}
          onClick={handleSearchChange}
          img1={"/whitesearch.svg"} />
      </div>

      <div className='flex flex-row justify-between'>
        {/* Filter Buttons with Counts */}
        <div className="mb-4 flex space-x-4">
          <span
            className={`cursor-pointer ${filter === 'All' ? 'text-black font-semibold' : 'text-blue-500'}`}
            onClick={() => handleFilterChange('All')}
          >
            All ({allCount})
          </span>
          <span
            className={`cursor-pointer ${filter === 'ONLINE' ? 'text-black font-semibold' : 'text-blue-500'}`}
            onClick={() => handleFilterChange('ONLINE')}
          >
            ONLINE ({onlineCount})
          </span>
          <span
            className={`cursor-pointer ${filter === 'ONSITE' ? 'text-black font-semibold' : 'text-blue-500'}`}
            onClick={() => handleFilterChange('ONSITE')}
          >
            ONSITE ({onsiteCount})
          </span>
        </div>

        <div className="mb-4 flex space-x-4">
          <span
            className={'text-blue-500 flex flex-row gap-[4px] cursor-pointer'}
            onClick={() => navigate(`/edit/${id}`)}
          >
            <img src='/edit.svg' className='w-[16px] h-[16px]' alt="edit" />
            <div className='flex items-center justify-center'>Edit this form</div>
          </span>
          <span
            className={'text-blue-500 flex flex-row gap-[4px] cursor-pointer'}
            onClick={() => navigate(`/form/${id}`)}
          >
            <img src='/view.svg' className='w-[16px] h-[16px]' alt="view" />
            <div className='flex items-center justify-center'>Preview form</div>
          </span>
          <span
            className={'text-blue-500 flex flex-row gap-[4px] cursor-pointer'}
            onClick={() => navigate(`/coming/${id}`)}
          >
            <img src='/export.svg' className='w-[16px] h-[16px]' alt="export" />
            <div className='flex items-center justify-center'>Export All</div>
          </span>
          <span
            className={'text-blue-500 flex flex-row gap-[4px] cursor-pointer'}
            onClick={() => navigate(`/coming/${id}`)}
          >
            <img src='/delete.svg' className='w-[16px] h-[16px]' alt="delete" />
            <div className='flex items-center justify-center'>Delete All</div>
          </span>
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <p>No registered users found.</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="p-4">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" 
                  checked={isAllChecked} 
                  onChange={handleSelectAll} 
                />
              </th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone No.</th>
              <th className="px-6 py-3">Mode</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                <td className="w-4 p-4">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" 
                    checked={checkedUsers[user.id] || false}
                    onChange={() => handleCheckboxChange(user.id)}
                  />
                </td>
                <td className="px-6 py-4">{user.userName}</td>
                <td className="px-6 py-4">{user.phoneNo}</td>
                <td className="px-6 py-4">{user.modeOfRegistration}</td>
                <td className="px-6 py-4">
                  <button onClick={() => navigate(`/registered/${id}/${user.id}`)} className="text-blue-600 bg-white hover:underline">
                    <img src='/view.svg' alt='view'/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Registration;
