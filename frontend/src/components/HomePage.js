import React from 'react';
import Header from './HeaderComponent';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CampaignsList from './CampaignList';
import CampaignDetail from './CampaignDetail';
import UpdateCampaign from './UpdateCampaign';
import CreateCampaign from './CreateCampaign';


function HomePage() {
  return (

    
      <Router>
      <Header />
      <Routes>
        {/* Main page displaying campaigns */}
        <Route path="/home-campaign" element={<CampaignsList />} />

        <Route path="/create-campaign" element={<CreateCampaign />} />
        
        {/* Route for viewing campaign details */}
        <Route path="/campaign-detail/:id/view" element={<CampaignDetail />} />
        
        {/* Route for updating a campaign */}
        <Route path="/update-campaign/:id" element={<UpdateCampaign />} />
        
        {/* Redirect to homepage if route is not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>


  );
}

export default HomePage;
