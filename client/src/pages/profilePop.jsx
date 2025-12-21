import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileDropdown from "../components/ProfileMenu"; // Ensure correct path

const Profiles = () => {
  const location = useLocation();
  const agency = location.state?.agency;
  const [hovered, setHovered] = useState(false);
  console.log(agency);

  return (
    <>
      <nav className="bg-gray-900 border-gray-200 -mr-2 -mt-1 rounded-t-md flex flex-col items-center h-32">
        <a
          href="/agencies"
          type="button"
          className="self-start  bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-blue-500 hover:text-white px-3"
        >
          <div className="flex flex-row">
            <svg
              className="w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <p class="">Prev</p>
          </div>
        </a>
        <div className="flex items-center justify-center w-full">
          <h1 className="text-white text-3xl mt-2"> Agency Profile</h1>
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

      <div className="min-h-screen p-6 bg-white flex flex-col items-center h-screen">
        <div className="bg-white rounded-lg shadow-xl p-8 grid grid-cols-3 gap-6 w-screen max-w-5xl border border-gray-200 ">
          {/* Profile Picture */}
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-blue-500 flex items-center justify-center bg-gray-200 shadow-lg">
              <img src={agency.image} alt="" />
            </div>
            <h3 className="text-xl font-semibold mt-4 text-gray-900">
              {agency?.companyName}
            </h3>
          </div>

          {/* Company and Contact Info */}
          <div className="border-l border-gray-300 pl-6">
            {[{ label: "Company Name", value: agency?.companyName },
              { label: "Email", value: agency?.email },
              { label: "Country", value: agency?.countryname },
              { label: "City", value: agency?.cityName },
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

          {/* State and Other Details */}
          <div className="border-l border-gray-300 pl-6">
            {[{ label: "State", value: agency?.stateName },
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
            ))}
          </div>
        </div>

        {/* Display Document directly */}
        {agency?.document && (
          <div className="mt-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Agency Attached Document</h3>
            {agency.document.endsWith(".pdf") ? (
              <div className="w-full h-96">
                <iframe
                  src={agency.document}
                  title="Agency Document"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                ></iframe>
              </div>
            ) : (
              <img src={agency.document} alt="Document" className="w-full max-w-2xl h-auto" />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Profiles;
