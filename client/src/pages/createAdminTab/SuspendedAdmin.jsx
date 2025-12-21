import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function SuspendedAdmin() {
    const [role, setRole] = useState('');
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAdmins = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3001/api/admins/getSuspendedAdmin', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            // Handle the role object properly
            if (response.data.role && typeof response.data.role === 'object') {
                setRole(response.data.role.roleName || 'Unknown Role');
            } else {
                setRole(response.data.role || 'Unknown Role');
            }

            // Ensure admins is always an array
            setAdmins(Array.isArray(response.data.admins) ? response.data.admins : []);
            setError(null);
        } catch (error) {
            console.error('Error fetching admins:', error);
            setError(error.message);
            setAdmins([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (status, id) => {
        console.log(status, id, "this is for")
        try {
            const suspendResponse = await axios.put(
                `http://localhost:3001/api/admins/suspendAdmin/${id}`,
                { status: status },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            console.log(suspendResponse)

            if (suspendResponse.status === 200) {
                toast.success(`You Changed status of ${admins?.name} To Active`);
                fetchAdmins()
            }
        } catch (error) {
            console.log(error, "errro occured while suspend admin")
        }
    }

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-indigo-700">AdminPortal</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 transition-colors">
                                Suspended Admins
                            </button>
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors">
                                Active Admins
                            </button>
                            <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors">
                                Dashboard
                            </button>
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm text-gray-600 bg-indigo-100 px-3 py-1 rounded-full">
                                Role: <span className="font-medium">{role}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-800">Suspended Administrators</h1>
                        <p className="mt-1 text-sm text-gray-500">Manage administrator accounts currently suspended from the system</p>
                    </div>

                    {error && (
                        <div className="mx-6 my-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-red-700">Error: {error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : admins.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No suspended administrators</h3>
                            <p className="mt-2 text-sm text-gray-500">There are currently no suspended administrators in the system.</p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {admins.map(admin => (
                                <li key={admin._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <span className="text-indigo-800 font-medium text-lg">
                                                    {admin.name ? admin.name.charAt(0).toUpperCase() : 'A'}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{admin.name || 'Unknown Admin'}</div>
                                                <div className="text-sm text-gray-500">{admin.email || 'No email provided'}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                Suspended
                                            </span>
                                            <button
                                                onClick={() => handleStatusUpdate("active", admin._id)}
                                                className="inline-flex items-center px-3.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                            >
                                                <svg className="-ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                To Active
                                            </button>
                                            <button
                                                // onClick={() => handleStatusUpdate(admin._id, 'active')}
                                                className="inline-flex items-center px-3.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                            >
                                                <svg className="-ml-0.5 mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

export default SuspendedAdmin;