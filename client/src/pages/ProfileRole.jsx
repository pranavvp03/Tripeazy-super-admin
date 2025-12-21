import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // use react-icons

export default function ProfileRoleToggle({ role }) {
  const [showRole, setShowRole] = useState(false);

  return (
    <div className="bg-white shadow-xl rounded-lg w-full h-auto border border-gray-200 p-6">
      <div
        className="flex items-center justify-between cursor-pointer mb-4"
        onClick={() => setShowRole(!showRole)}
      >
        <h1 className="text-black font-semibold text-xl">Your Role</h1>
        {showRole ? (
          <FaChevronUp className="text-gray-700 text-2xl transition-transform duration-300" />
        ) : (
          <FaChevronDown className="text-gray-700 text-2xl transition-transform duration-300" />
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          showRole ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4">
          <div className="grid grid-cols-2 font-semibold text-gray-700 border-b pb-2 mb-2">
            <span>Tabs</span>
            <span>Access</span>
          </div>

          {role?.permissions &&
            Object.entries(role.permissions).map(([tabName, accessList]) => (
              <div key={tabName} className="grid grid-cols-2 text-gray-800 mb-3 border-b pb-2">
                <span className="capitalize">{tabName}</span>
                <span className="capitalize">{accessList.join(", ")}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
