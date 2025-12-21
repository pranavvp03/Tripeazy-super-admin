
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import ProfileDropdown from "../components/ProfileMenu";
import { AgencySearch } from "../../src/Hooks/agencySearch";

function People() {
  const [allAgencies, setAllAgencies] = useState([]);
  const [agencies, setAgencies] = useState([]); 
  const [selectedStatus, setSelectedStatus] = useState("Requested");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);

 
  useEffect(() => {
    const fetchAgencies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3001/api/agency/fetchAgency"
        );
        if (Array.isArray(response.data)) {
          setAllAgencies(response.data);
          setAgencies(response.data);
        } else {
          console.error("Expected an array but got:", response.data);
          toast.error("Unexpected response format from server");
        }
      } catch (error) {
        console.error("Can't get agencies", error);
        toast.error("Can't get agencies");
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  
  const handleSearch = async (value) => {
    const query = value?.trim() ?? "";

    if (!query) {
      setAgencies(allAgencies); 
      return;
    }

    setSearching(true);
    try {
      const result = await AgencySearch(query); 
      console.log(result, "search result array");

      if (Array.isArray(result) && result.length > 0) {
        setAgencies(result);
        // toast.success(
        //   `${result.length} agenc${result.length === 1 ? "y" : "ies"} found`
        // );
      } else {
        setAgencies([]);
        toast.error(`No agency named "${query}" found`);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        if (status === 404) {
          toast.error(`There is no agency named "${query}"`);
        } else if (status) {
          toast.error(`Request failed with status ${status}`);
        } else if (err.request) {
          toast.error("No response from server. Please check your connection.");
        } else {
          toast.error("Unexpected error occurred.");
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setSearching(false);
    }
  };

  
  const handleButton = async (id, value) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/agency/updateStatus/${id}`,
        { status: value }
      );

      const updated = response.data;

     
      setAllAgencies((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: value } : a))
      );
      setAgencies((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: value } : a))
      );

      if (updated.status === "Accepted") {
        toast.success("You accepted the agency");
      } else if (updated.status === "Rejected") {
        toast.error("You rejected the agency");
      } else if (updated.status === "Blocked") {
        toast.error("You blocked the agency");
      } else if (updated.status === "Accepted") {
        toast.success("You unblocked the agency");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  
  const filteredAgencies = useMemo(() => {
    return agencies.filter((a) => a.status === selectedStatus);
  }, [agencies, selectedStatus]);

 
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
        </nav>
      </div>

      <div className="bg-white p-8 rounded-md w-full">
        <div className="flex items-center justify-between pb-6">
        
          <div className="flex items-start">
            <select
              className="w-60 px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="Requested">Requested</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>

       
          <div className="flex items-end">
            <div className="max-w-xl">
              <div className="flex w-full rounded-md overflow-hidden shadow-md">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full px-4 py-3 text-gray-900 border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-l-md"
                  value={searchInput}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchInput(value);
                    if (!value.trim()) {
                      setAgencies(allAgencies);
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch(searchInput);
                    }
                  }}
                />
                <button
                  className="bg-indigo-600 text-white px-6 text-lg font-semibold py-3 rounded-r-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
                  onClick={() => handleSearch(searchInput)}
                  disabled={searching}
                >
                  {searching ? "Searching..." : "Go"}
                </button>
              </div>
            </div>
          </div>
        </div>

       
        {loading ? (
          <p className="text-center text-gray-500">Loading agencies…</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal shadow rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Company Name</th>
                  <th className="px-5 py-3 text-left">Email</th>
                  <th className="px-5 py-3 text-left">Country</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Action</th>
                </tr>
              </thead>

              {filteredAgencies.length > 0 ? (
                filteredAgencies.map((ag) => (
                  <tbody
                    key={ag._id || ag.id}
                    className="divide-y divide-gray-100 border-t border-gray-100"
                  >
                    <tr className="hover:bg-gray-50">
                      <td className="px-5 py-5 bg-white text-sm flex items-center gap-3">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                        />
                        <span className="text-gray-900">{ag.companyName}</span>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm text-gray-900">
                        {ag.email}
                      </td>
                      <td className="px-5 py-5 bg-white text-sm text-gray-900">
                        {ag.country}
                      </td>

                      <td className="px-5 py-5 bg-white text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            ag.status === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : ag.status === "Rejected" ||
                                ag.status === "Blocked"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {ag.status}
                        </span>
                      </td>

                     
                      <td className="px-5 py-5 bg-white text-sm flex items-center gap-3">
                        {(ag.status === "Rejected" ||
                          ag.status === "Requested") && (
                          <button
                            onClick={() => handleButton(ag._id, "Accepted")}
                            className="px-3 py-1 font-semibold text-green-900 bg-green-200 rounded-full"
                          >
                            Accept
                          </button>
                        )}

                        {ag.status === "Requested" && (
                          <button
                            onClick={() => handleButton(ag._id, "Rejected")}
                            className="px-3 py-1 font-semibold text-white bg-red-600 rounded-full"
                          >
                            Reject
                          </button>
                        )}

                        {ag.status === "Accepted" && (
                          <button
                            onClick={() => handleButton(ag._id, "Blocked")}
                            className="px-3 py-1 font-semibold text-white bg-red-600 rounded-full"
                          >
                            Block
                          </button>
                        )}

                        {ag.status === "Blocked" && (
                          <button
                            onClick={() => handleButton(ag._id, "Accepted")}
                            className="px-3 py-1 font-semibold text-white bg-blue-700 rounded-full"
                          >
                            Unblock
                          </button>
                        )}

                        
                        <NavLink
                          to="/profile"
                          state={{
                            agency: allAgencies.find((a) => a._id === ag._id),
                          }}
                          className="px-3 py-1 font-semibold text-blue-600 underline hover:text-blue-800"
                        >
                          View More
                        </NavLink>
                      </td>
                    </tr>
                  </tbody>
                ))
              ) : (
                <tbody>
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 p-6">
                      {`No ${selectedStatus} Agencies found 🤷‍♂️`}
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default People;
