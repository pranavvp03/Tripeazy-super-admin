import React, { useEffect, useState } from 'react'
import axios from 'axios'
 import { useDispatch } from 'react-redux'
 import { useSelector } from 'react-redux'
 import { getRoles,singleRole } from '../../redux/actions/roleAction'

function CheckBox({onSelect,selectedRole}) {
    const [selectedOption,setSelectedOption]=useState("General manager")
    const [roles,setRoles]=useState([])

    const dispatch=useDispatch()
   
     const Getrole=useSelector(state=>state.role.SingleRole)
     console.log(Getrole ,"this is getRole");
     
   
    useEffect(() => {
      const fetchRoles = async () => {
        const token = localStorage.getItem("token");
        try {
          const response = await axios.get("http://localhost:3001/api/roles/get-role", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
    
          if (!response || !response.data) {
            console.log("No response for getting roles");
            return;
          }
    
          console.log(response.data, "this is role");
          
          if (Array.isArray(response.data)) {
            setRoles(response.data); 
          } else {
            console.log("Unexpected API response structure:", response.data);
          }
    
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };
    
      fetchRoles();
    }, []);
    

    console.log(roles,"this is role form state")
     const handleChange=(e)=>{
      const value=e.target.value
        setSelectedOption(value)
        dispatch(singleRole(value))
      onSelect(value)
      // console.log(value)

     }
  return (
    <div>

<label className="block text-sm font-semibold text-dark">
              Position
            </label>
            <select
  name="Admin"
  value={selectedOption}
  onChange={handleChange}
  className="mt-2 block w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-custom-purple focus:outline-none"
>
  <option value="" disabled>Select a role</option>
  
  {roles.length > 0 ? (
    roles.map((role, index) => (
      <option key={role._id} value={role.roleName}>
        {role.roleName}
      </option>
    ))
  ) : (
    <option disabled>Loading roles...</option>
  )}
</select>

    </div>
  )
}

export default CheckBox