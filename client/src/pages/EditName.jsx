import axios from "axios";
import { useState, useEffect } from "react";

const EditName = ({ initialName, onSave, onClose }) => {
  const [newName, setNewName] = useState(initialName || "");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
   
    setIsVisible(true);
  }, []);

  const handleSubmit =  async (e) => {
      const token=  localStorage.getItem("token")
       try{
         const response = await axios.put(
  "http://localhost:3001/api/profile/editAdminName",
  {
    name: newName, 
  },
  {
    headers: {
      Authorization: `Bearer ${token}`, 
    },
  }
);
          console.log(response,"this is response while upating Admin name")
       }catch(error){
      console.log(error,"error occured while updation admin name ")
       }
       onSave(newName);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // wait until animation ends
  };
console.log(newName);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all duration-300 ease-out
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <h2 className="text-xl font-bold mb-4">Edit Admin Name</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 mb-4"
            autoFocus
          />

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditName;
