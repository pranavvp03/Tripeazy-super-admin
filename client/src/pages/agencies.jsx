import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ProfileDropdown from '../components/ProfileMenu';
import ProfileModal from './profilePop';
import toast from 'react-hot-toast';

function People() {
  
  const [agency, setAgency] = useState([]);
  const [isOpen,setIsOpen] =useState(false)
  const [selectedStatus,setSelectedStatus]=useState("Requested")
  const [searchInput,setSearchInput]=useState("")
  const [firstValue,setFirstValue]=useState([])
  // const [viewAgency,setViewAgency]=useState("")
  // const[status,setStatus]=useState([])
  // const [acceptButton,setAcceptButton]=useState("Accept")
  // const [rejectButton,setRejectButton]=useState("Reject")
  

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/agency/fetchAgency");
        if (Array.isArray(response.data)) {
          setAgency(response.data);
          const requestedAgencies = agency.filter(item => item.status === "Requested");
          
        } else {
          console.error("Expected an array but received:", response.data);
        }
      } catch (error) {
        console.log("Can't get agencies", error);
      }
    };
    fetchAgencies();
  }, []);

  console.log("Agency data fetched successfully",agency);
 console.log(firstValue,"this is requeste")
  const handleButton = async (id,value)=>{
   console.log(id)
   console.log(value)


    try{
       const response= await axios.put(`http://localhost:3001/api/agency/updateStatus/${id}`,{
        status:value

       })
       console.log(response.data)
       setAgency((prev)=>
        prev.map((agency)=>
          agency._id === id ?{...agency,status:value} :agency
        )
       )
       
       const data= response.data

       console.log(data ,"after updation")
       if(data.status === "Accepted"){
        toast.success("You Accepted Agency")
        return
       }  
       if(data.status === "Rejected"){
        toast.error("You Rejected Agency")
        return 
      } 
      if(data.status === "Blocked"){
        toast.error("You Blocked the Agency")
        return 
      }
         
      
     
    }catch(error){
      console.log(error)
    } 

 
   }
   const filteredAgencies= agency.filter((agency)=>agency.status === selectedStatus)
   console.log(filteredAgencies);
   const handleSearch = ()=>{
    
   }
  
  return (
    <>
      <div>
        <nav className="bg-gray-900 border-gray-200 -mr-2 -mt-1 rounded-t-md flex flex-col items-center h-32">
          <div className="flex items-center justify-center w-full">
            <h1 className="text-white text-3xl mt-2">Manage Agencies</h1>
          </div>
          <div className="flex items-center justify-between w-full px-4 mt-2">
            <div className="flex items-center space-x-3">
              <a href="https://flowbite.com/">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
              </a>
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Trippeazy</span>
            </div>
            <div className="align-flex -mt-2">
              <ProfileDropdown />
            </div>
          </div>
          {/* <div className='flex items-center justify-center w-full'>
            <NavLink
              to="/manage-Role"
              className={({ isActive }) =>
                `p-2 rounded-lg ${isActive ? " text-white text-lg underline decoration-blue-400" : "text-gray-600"}`
              }
            >
              Existing Role
            </NavLink>
            <NavLink
              to="/addrole"
              className={({ isActive }) =>
                `p-2 rounded-lg ${isActive ? "bg-blue-500 text-white" : "text-gray-600 font-sans hover:text-white hover:text-lg hover:underline decoration-blue-500 hover:scale-105 transition duration-700"}`
              }
            >
              Create New One
            </NavLink>
          </div> */}
        </nav>
      </div>
      <div className="bg-white p-8 rounded-md w-full">
        <div className="flex items-center justify-between pb-6">
         
          <div className="flex items-start ">
  <select 
    className=" w-60 px-4 py-2 border border-gray-400  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
   defaultValue=""
   onChange={(e)=>setSelectedStatus(e.target.value)}
  >
    <option className='' value="Requested" disabled hidden>Sort Agencies by</option>
    <option value="Requested">Requested</option>
    <option value="Accepted">Accepted</option>
    <option value="Rejected">Rejected</option>
    <option value="Blocked">Blocked</option>

  </select>
</div>

 <div className="flex items-end">
 <div class="">
  <div class="max-w-xl">
    
    <div class="flex space-x-2 items-center mb-4"
    
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-white text-lg font-semibold">Please enter something</p>
    </div>

  
    <div class="flex w-full rounded-md overflow-hidden shadow-md">
      <input type="text" placeholder="Search here..." class="w-full px-4 py-3 text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-md"
      value={searchInput}
      onChange={(e)=>{setSearchInput(e.target.value),handleSearch}}
      />
      <button class="bg-indigo-600 text-white px-6 text-lg font-semibold py-3 rounded-r-md hover:bg-indigo-700 transition duration-300">Go</button>
    </div>
  </div>
</div>

          </div>

        </div>
       
            <div  className="overflow-x-auto">
              <table className="min-w-full leading-normal shadow rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                    <th className="px-5 py-3 text-left">Company Name</th>
                    <th className="px-5 py-3 text-left">Email</th>
                    <th className="px-5 py-3 text-left">Country</th>
                    {/* <th className="px-5 py-3 text-left">Registration Id</th> */}
                    <th className="px-5 py-3 text-left">Status</th>
                  </tr>
                </thead>
                {filteredAgencies.length > 0 ? (
          filteredAgencies.map((agencies) => (
            

                <tbody 
                key={agencies._id || agencies.id}
                className="divide-y divide-gray-100 border-t border-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-5 py-5 bg-white text-sm flex items-center gap-3">
                      <img className="h-10 w-10 rounded-full object-cover" src={agencies.image} alt="" />
                      <span className="text-gray-900">{agencies.companyName}</span>
                    </td>
                    <td className="px-5 py-5 bg-white text-sm text-gray-900">{agencies.email}</td>
                    <td className="px-5 py-5 bg-white text-sm text-gray-900">{agencies.country}</td>
                    {/* <td className="px-5 py-5 bg-white text-sm text-gray-900">{agencies.registrationId}</td> */}
                    <td className="px-5 py-5 bg-white text-sm">
                    { (agencies.status === "Rejected" || agencies.status === "Requested") &&
                       < button 
                      data-id={agency?._id} 
                      value={agencies._id}
                      onClick={(e)=>handleButton(e.target.value,"Accepted")}
                      className=" mr-4 relative inline-block px-3 py-1 font-semibold text-green-900 bg-green-200 rounded-full">Accept</button>
                    }
                     { agencies.status === "Requested"  &&
                      <button 
                      data-id={agency._id}
                      value={agencies._id}
                      onClick={(e)=>handleButton(e.target.value,"Rejected")}

                      className=" ml-5  relative inline-block px-3 py-1 font-semibold text-white bg-red-600 rounded-full">Reject</button>
                     }

                      { agencies.status === "Accepted"  &&
                      <button 
                      data-id={agency._id}
                      value={agencies._id}
                      onClick={(e)=>handleButton(e.target.value,"Blocked")}

                      className=" ml-5  relative inline-block px-3 py-1 font-semibold text-white bg-red-600 rounded-full">Block</button>
                     }

                    { agencies.status === "Blocked"  &&
                      <button 
                      data-id={agency._id}
                      value={agencies._id}
                      onClick={(e)=>handleButton(e.target.value,"Accepted")}

                       className=" ml-5  relative inline-block px-3 py-1 font-semibold text-white bg-blue-700 rounded-full">Un Block</button>
                    }
                    </td>
                    {/* <td className="px-5 py-5 bg-white text-sm">
                      
                    </td> */}
                   <NavLink
                     to="/profile"
                     
                     
                     state={{agency:agency.find((a)=>a._id=== agencies._id)}}
                     className="px-4 py-2 bg-white text-sm text-blue-600 underline hover:text-blue-800 transition duration-300"
                  >
                   View More
                   </NavLink>  
                    
                  </tr>
                  {/* {isOpen && <ProfileModal isOpens={isOpen} />} */}
                </tbody>
                
                 ))
                ) : (
                  <p className="text-center text-gray-500">{`No ${selectedStatus} Agencies found 🤷‍♂️`}</p>
                )}
              </table>
              
            </div>
         
      </div>
    </>
  );
}

export default People;
