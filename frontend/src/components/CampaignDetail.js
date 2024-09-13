import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CampaignDetail = () => {
    const { id } = useParams(); // Extract campaign ID from URL
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch campaign details from the server
        axios.get(`http://localhost:8000/campaigns/campaign-detail/${id}/`)
            .then(response => {
                setCampaign(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch campaign details.');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!campaign) return <p>No campaign found.</p>;

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-4">{campaign.title}</h1>
            {campaign.main_image && (
                <img
                    src={campaign.main_image}
                    alt={campaign.title}
                    className="w-full h-80 object-cover rounded-md mb-4"
                />
            )}
            <p className="text-lg mb-4">{campaign.description}</p>
            <p className="text-sm text-gray-500 mb-4">
                Start Date: {new Date(campaign.start_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-4">
                End Date: {new Date(campaign.end_date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mb-4">Status: {campaign.status}</p>
            {/* <a href={`/campaigns/campaign-detail/${campaign.id}`} className="text-yellow-500 hover:underline">
                Update Campaign
            </a> */}
        </div>
    );
};

export default CampaignDetail;
