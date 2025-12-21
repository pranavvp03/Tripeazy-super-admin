import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { searchAdmins } from '../../redux/actions/roleAction';
import { logout } from '../../redux/actions/authAction';
import useSearch from '../../Hooks/useSearch';
import ProfileMenu from '../../components/ProfileMenu';
import AdminPopup from './AdminPopup';

function CreateAdmin() {
  const { search, filteredAdmin, error } = useSearch();
  const dispatch = useDispatch();
  const adminSearch = useSelector((state) => state.role.Admins);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [admins, setAdmin] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [role, setRole] = useState([]);

  // Fetch admins data
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admins/getAdmin', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = response.data.admins;
      setRole(response.data.role);
      setAdmin(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Dispatch admins to Redux store
  dispatch(searchAdmins(admins));

  // Handle search input
  const handleSearch = (e) => {
    search(searchInput);
  };

  // Handle admin click
  const handleAdminClick = (admin) => {
    setSelectedAdmin(admin);
  };

  // Handle role update callback
  const handleRoleUpdate = () => {
    fetchAdmins(); // Refetch admins data after role update
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
    localStorage.removeItem('token');
  };

  return (
    <>
      <nav className="bg-gray-900 border-gray-200 -mr-1 -mt-2 rounded-t-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
              Trippeazy
            </span>
          </a>
          <div className="flex md:order-2">
            <div className="relative hidden md:block">
              <div className="flex items-center w-full p-4">
                {/* Search Input */}
                <div className="relative flex-grow">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    🔍
                  </span>
                  <input
                    type="text"
                    id="search-navbar"
                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => {
                      setSearchInput(e.target.value);
                      handleSearch(e.target.value);
                    }}
                  />
                </div>
                {/* Profile Menu */}
                <div className="ml-4">
                  <ProfileMenu handleLogout={handleLogout} />
                </div>
              </div>
            </div>
          </div>
          <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
            <div className="flex flex-col items-start">
              <h1 className="text-white text-3xl mb-4">Manage Admin</h1>
              <ul className="flex p-4 md:p-0 space-x-4">
                <li>
                  <NavLink
                    to="/Admin-List"
                    className={({ isActive }) =>
                      `p-2 rounded-lg ${isActive ? 'text-white text-lg underline decoration-blue-400' : 'text-gray-600'}`
                    }
                  >
                    Members
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/suspendedAdmin"
                    className={({ isActive }) =>
                      `p-2 rounded-lg ${isActive ? 'text-white text-lg underline decoration-blue-400' : 'text-gray-600'}`
                    }
                  >
                    Suspended
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/createNewAdmin"
                    className={({ isActive }) =>
                      `p-2 rounded-lg ${isActive ? 'bg-blue-500 text-white' : 'text-gray-600 font-sans hover:text-white hover:text-lg hover:underline decoration-blue-500 hover:scale-105 hover:shadow-lg transition duration-700'}`
                    }
                  >
                    New
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="">
        {error && <p className="text-red-500 text-center text-lg">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-10 mt-5">
          {(filteredAdmin.length > 0 && searchInput.length > 0 ? filteredAdmin : admins).map((admin) => (
            <div
              key={admin._id}
              className="ml-3 flex flex-col items-center p-6 h-full w-96 border rounded-lg shadow-lg bg-white dark:bg-white dark:border-gray-300 hover:bg-gray-50 hover:shadow-xl hover:scale-105 hover:border-blue-500 transition-all duration-300"
              onClick={() => handleAdminClick(admin)}
            >
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
                alt="Admin image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-gray-800">{admin.name}</h5>
              <span className="text-md text-dark dark:text-gray-800">{admin.role.roleName}</span>
              <span className="text-md text-dark dark:text-gray-800">{admin.email}</span>
            </div>
          ))}
        </div>
        {selectedAdmin && (
          <AdminPopup
            rolen={role}
            admin={selectedAdmin}
            onClose={() => setSelectedAdmin(null)}
            onRoleUpdate={handleRoleUpdate} // Pass the callback function
          />
        )}
      </div>
    </>
  );
}

export default CreateAdmin;