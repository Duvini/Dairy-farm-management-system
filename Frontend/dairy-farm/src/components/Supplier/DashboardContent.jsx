import { Box } from '@mui/material';
import React from 'react';
import Welcome from './Welcome'
import MainStatistics from './MainStatistics';
import SupplierTable from './suppliertable';

function DashboardContent() {
    return (
        <Box className="dashboard-content">
            <Welcome/>
            <MainStatistics/>
            <Box className="dashboard-below-container">

                <SupplierTable/>


            </Box>
        </Box>
    );
  }
  
  export default DashboardContent;