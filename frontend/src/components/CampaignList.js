import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CampaignsList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchCampaigns(currentPage);
    }, [currentPage]);

    const fetchCampaigns = async (page) => {
        try {
            const response = await axios.get(`http://localhost:8000/campaigns/home-campaign/?page=${page}`);
            setCampaigns(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));  // Assuming 10 campaigns per page
            console.log(response.data.results);
        } catch (error) {
            setErrorMessage('Failed to fetch campaigns.');
        }
    };

    const truncateDescription = (description) => {
        const words = description.split(' ');
        if (words.length > 30) {
            return words.slice(0, 30).join(' ') + '...';
        }
        return description;
    };

    return (
        <div className="w-full h-screen overflow-auto bg-gray-100">
            <div className="container mx-auto px-4 py-4">
                <h1 className="text-2xl font-bold my-4">All Campaigns</h1>

                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        
                        <div key={campaign.id} className="bg-white p-4 rounded-lg shadow-lg">
                            <img
                                src={campaign.main_image}
                                alt={campaign.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            
                            <h2 className="text-xl font-bold mb-2">{campaign.title}</h2>
                            <p className="text-gray-700 mb-4">{truncateDescription(campaign.description)}</p>
                            <div className="flex justify-between">
                                <Link
                                    to={`/campaign-detail/${campaign.id}/view`}
                                    className="text-blue-500 hover:underline"
                                >
                                    View Details
                                </Link>
                                <div className="flex space-x-2">
                                    <Link
                                        to={`/update-campaign/${campaign.id}`}
                                        className="text-yellow-500 hover:underline"
                                    >
                                        Update
                                    </Link>
                                    {/* <button
                                        className="text-red-500 hover:underline"
                                        onClick={() => handleDelete(campaign.id)}
                                    >
                                        Delete
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center my-6">
                    <button
                        className={`px-4 py-2 mx-2 ${currentPage === 1 ? 'text-gray-400' : 'text-blue-500'}`}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
                    <button
                        className={`px-4 py-2 mx-2 ${currentPage === totalPages ? 'text-gray-400' : 'text-blue-500'}`}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CampaignsList;
