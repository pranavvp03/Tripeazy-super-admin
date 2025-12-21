// src/Hooks/agencySearch.js
import axios from "axios";

export const AgencySearch = async (search) => {
  const res = await axios.get(`http://localhost:3001/api/agency/SearchAgency?search=${search}`);
  return res.data.response; // return only data
};
