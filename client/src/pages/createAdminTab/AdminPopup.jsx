import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminPopup({ admin, onClose, onRoleUpdate, rolen }) {
  const [selectedAdmin, setSelectedAdmin] = useState(admin.role.roleName);
  const [role, setRole] = useState(rolen);
  const [loading, setLoading] = useState(false);
  const [updateRole, setUpdateRole] = useState('');

  useEffect(() => {
    setSelectedAdmin(admin.role.roleName);
  }, [admin.role.roleName]);

  const handleRoleChange = (e) => {
    setUpdateRole(e.target.value);
  };

  const handleSave = async () => {
    if (!updateRole || updateRole === selectedAdmin) {
      toast.error('Please select a different role!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3001/api/admins/updateRole/${admin._id}`,
        { role: updateRole },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );

      if (response.status === 200) {
        toast.success('Role updated successfully!');
        setSelectedAdmin(updateRole);

        if (onRoleUpdate) {
          onRoleUpdate();
        }

        onClose();
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update role');
    } finally {
      setLoading(false);
    }
  };

   const handleSuspend = async (status)=>{
     try{
      const suspendResponse = await axios.put(
        `http://localhost:3001/api/admins/suspendAdmin/${admin._id}`,
        { status: status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      console.log(suspendResponse)

      if (suspendResponse.status === 200) {
        toast.success(`You Suspened ${admin.name}`);
        setSelectedAdmin(updateRole);

        if (onRoleUpdate) {
          onRoleUpdate();
        }

        onClose();
      }
     }catch(error){
      console.log(error,"errro occured while suspend admin")
     }
   }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Admin Details</h2>
        <p>
          <strong>Name:</strong> {admin.name}
        </p>
        <p>
          <strong>Email:</strong> {admin.email}
        </p>

        <select
          className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-custom-purple focus:outline-none"
          onChange={handleRoleChange}
          value={updateRole}
        >
          <option value={selectedAdmin || ''} className="uppercase text-base">
            {selectedAdmin ? `${selectedAdmin} (current role)` : 'Select a role'}
          </option>

          {role.length > 0 ? (
            role.map((role, index) => (
              <option key={index} value={role.roleName}>
                {role.roleName}
              </option>
            ))
          ) : (
            <option disabled>No roles available</option>
          )}
        </select>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className='px-4 py-2 bg-red-700 text-white rounded mr-2'
          onClick={(e)=>handleSuspend("deActive")}
          >Suspend</button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPopup;