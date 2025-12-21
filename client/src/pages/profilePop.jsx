import React, { useEffect, useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import ProfileDropdown from "../components/ProfileMenu"; 
import ProfileRole from "./ProfileRole";
import EditName from "./EditName";
import axios from "axios";

const Profiles = () => {
  const location = useLocation()
  const agency = location.state?.agency;
  const [hovered, setHovered] = useState(false);
  const [editname, setEditName]= useState(false)
  const [data,setData]= useState()
  console.log(agency)
  useEffect(()=>{
     const fetchPersoDetail= async ()=>{
      const token = localStorage.getItem("token")
       try{
         const response = await axios.get ("http://localhost:3001/api/profile/getProfile",
        {
          headers:{
            'Authorization': `Bearer ${token}`
          }
        }
         )
         setData(response.data.response)
        
       }catch(error){
        cosnole.log(error)
       }
     }
     fetchPersoDetail()
  },[])
 console.log(data,"this is personl data")
  return (
    <>
      
      <nav className="bg-gray-900 border-gray-200 -mr-2 -mt-1 rounded-t-md flex flex-col items-center h-32">

      <a   href ="/agencies" type="button" class="self-start  bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-500 hover:text-white px-3">
      <div class="flex flex-row  ">
        <svg class="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
        </svg>
        <p class="">Prev</p>
      </div>
    </a>
        <div className="flex items-center justify-center w-full">
          <h1 className="text-white text-3xl mt-2"> Admin Profile</h1>
        </div>
        <div>
       
        </div>
        <div className="flex items-center justify-between w-full px-4 mt-2">
          <div className="flex items-center space-x-3">
            <a href="https://flowbite.com/">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8"
                alt="Flowbite Logo"
              />
            </a>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Trippeazy
            </span>
          </div>
          <div className="align-flex -mt-2">
            <ProfileDropdown />
          </div>
        </div>
        {/* <div className="flex items-center justify-center w-full">
          <NavLink
            to="/manage-Role"
            className={({ isActive }) =>
              `p-2 rounded-lg ${
                isActive
                  ? "text-white text-lg underline decoration-blue-400"
                  : "text-gray-600"
              }`
            }
          >
            Existing Role
          </NavLink>
          <NavLink
            to="/addrole"
            className={({ isActive }) =>
              `p-2 rounded-lg ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 font-sans hover:text-white hover:text-lg hover:underline decoration-blue-500 hover:scale-105 transition duration-700"
              }`
            }
          >
            Create New One
          </NavLink>
        </div> */}
      </nav>

      
<div className="min-h-80% p-4 bg-white flex flex-row items-center">

        
       {/* <h2 className="text-3xl font-bold text-gray-800 mb-6">
       Agency Profile
        </h2> */}

      <div className="bg-white rounded-lg shadow-xl w-2/5 h-3/4 p-20 mr-3 flex flex-row items-center justify-center flex-wrap  max-w-5xl border ">
        <div className="flex flex-col ">
           <h1 className="text-3xl text-black flex mb-2">{data?.name}</h1> 

         <h2 className="text-lg flex text-blue-900 ml-5 ">{data?.role.roleName}</h2>
        </div>

          <div
              className="relative h-64 w-64 rounded-full overflow-hidden border-4  border-blue-500 flex items-center justify-center bg-gray-200 shadow-lg"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              {/* <span className="text-6xl font-bold uppercase text-blue-600">
                {agency?.companyName ? agency.companyName[0] : "?"}
              </span> */}
              <img src="profilephoto.jpg" alt="" />
              {hovered && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                  <FaPlus className="text-white text-4xl" />
                </div>
              )}
            </div>
        </div>
        <div className="bg-white rounded-lg shadow-xl p-8 grid grid-cols-3 gap-6 w-50%  max-w-5xl border border-gray-200 ">
          
         

          
          <div className=" border-gray-300 pl-6">
            {[
              { label: "Admin Name", value: data?.name },
              { label: "Email", value: data?.email },
              { label: "Password", value: "*****"},
              { label: "Phone No", value: data?.phoneNumber },
              { label: "Gender", value: data?.gender },
              { label: "Status", value: data?.status },
            ].map((item) => (
              <div key={item.label} className="mb-5">
                <p className="text-sm font-semibold text-gray-500">
                  {item.label}:
                </p>
                <p className="mt-1 text-lg text-gray-900 font-medium">
                  {item.value || "N/A"}
                </p>
               
              </div>
            ))}
          </div>
 
          
          <div className=" border-gray-300 pl-6 text-right">
            <h1 className="mt-1 text-base text-gray-900 font-medium end-0 mb-32 hover:text-blue-700 hover:underline"><button onClick={()=>setEditName(true)}>edit</button></h1>
           
            <h1 className="mt-1 text-base text-gray-900 font-medium end-0 ml-40   hover:text-blue-700 hover:underline"> <button >Update</button> </h1>
           
            

            {/* {[ hover:text-blue-700 hover:underline
              { label: "State", value: agency?.stateName },
              { label: "Phone", value: agency?.contactNO },
              { label: "Registration Id", value: agency?.registrationId },
            ].map((item) => (
              <div key={item.label} className="mb-5">
                <p className="text-sm font-semibold text-gray-500">
                  {item.label}:
                </p>
                <p className="mt-1 text-lg text-gray-900 font-medium">
                  {item.value || "N/A"}
                </p>
              </div>
            ))} */}
          </div>
          
        </div>
       
      </div>
       <div className="mb-10">
          <ProfileRole role={data?.role}/>

         { editname&&<EditName initialName={data?.name} onClose={()=>setEditName(false)}/>}
        </div>
        
    </>
  );
};

export default Profiles;
