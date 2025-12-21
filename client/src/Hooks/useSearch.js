import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";


const useSearch = () => {
  const [filteredAdmin, setFilteredAdmin] = useState([]);
  const [error, setError] = useState("");
  const[agencySearch,setAgencySearch]=useState()

  const searchAdmin = useSelector((state) => state.role.Admins);
  console.log(searchAdmin, "this is full admin from hook")
  

  const search = (searchQuery) => {
    if (!searchQuery.trim()) {
      setFilteredAdmin([]);
      setError("");
      return;
    }

    const filteredResult = searchAdmin.filter((admin) =>
      admin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredResult.length === 0) {
      setError("No matching admin is found");
      setFilteredAdmin([]);
    } else {
      setError("");
      setFilteredAdmin(filteredResult);
    }
  };

  

  // useEffect(() => {
  //   console.log(searchAdmin,"search admin")
  //   if (searchAdmin.length === 0) {
  //     setFilteredAdmin([]);
  //   }
  // }, [searchAdmin]);

  

  return { search, filteredAdmin, error };
};



export default useSearch;

