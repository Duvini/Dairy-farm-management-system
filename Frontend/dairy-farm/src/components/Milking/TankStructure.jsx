import { Box, Typography } from '@mui/material';
import React from 'react';

function TankStructure({ percentage }) {
    const height = 152.5 * percentage;
    let roundedPercentage = (percentage * 100).toFixed(1);

    if (roundedPercentage.split('.')[1] === '0') {
        roundedPercentage = Math.round(percentage * 100).toString();
    }

    const percentageString = `${roundedPercentage}%`;

    return (
        <Box position="relative" style={{width:'338px', display: 'flex', justifyContent: 'center'}}>
            <Typography className="milk-percentage" variant='h4' fontFamily={'Poppins'}>{percentageString}</Typography>
            <img src='../../../src/assets/tank-structure-transparent.png' width={'300px'} />
            <div className='tank-fill' style={{ height: `${height}px` }}></div>
        </Box>
    );
}

export default TankStructure;
