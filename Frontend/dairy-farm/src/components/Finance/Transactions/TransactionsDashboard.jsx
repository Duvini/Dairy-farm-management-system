import { Box } from '@mui/material';
import React from 'react';
import WelcomeCard from '../../../components/Finance/DashboardContent/Welcome/WelcomeCard'
import '../../../styles/Finance/MainDashboard/DashboardContent.css'

function TransactionsDashboard() {
    return (
        <Box className="dashboard-content">
            <WelcomeCard/>
        <div className="graph-container">

      </div>
        </Box>
    );
  }
  
  export default TransactionsDashboard;