import React from 'react';
import HomePage from './HomePage';
import CreateCampaign from './CreateCampaign';
import UpdateCampaign from './UpdateCampaign';
import CampaignDetail from './CampaignDetail';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <HomePage />
    </div>
   
  );
}

export default App;
