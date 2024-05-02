import React from "react";
import ProductionSidebar from "../../components/production/productionSidebar"
import ProductBatchTable from "../../components/production/Inventory/ProductbatchTable"
import ProductBatchForm from "../../components/production/Inventory/ProductBatchForm"
import InventoryReport from "../../components/production/Inventory/InventoryReport"
import { Container,Box,Typography,Button, Paper} from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2";
import SensorDisplay from "../../components/production/Hydroponic/SensorDisplay";

function ProductInventory() {
return (
       
<Container maxWidth="100vw" style={{ margin: 0, padding: 0,overflow:'hidden' }}>
  {/*, height: '100vh', overflow: 'hidden' */}



      <Grid2 container sx={{ width: '100vw', position: 'relative' }}>
        <Grid2 item xs={1}sm={1}><ProductionSidebar/></Grid2>
        <Grid2 item xs={10} sx={{ml:3,mr:3,mt:3,}} ><Typography variant="h4" align="center" fontWeight="bold">Smart Hydroponic System</Typography></Grid2>
      </Grid2>

      
      <Grid2 container sx={{ width: '100vw', position: 'relative',mt:10 }}>
        <Grid2 item xs={1}sm={1}></Grid2>
        <Grid2 item xs={10} sx={{ml:3,mr:3,mt:3,}} >
            
            <SensorDisplay></SensorDisplay>
            </Grid2>
      </Grid2>

    

      </Container>
    
    );
}

export default ProductInventory;