import React, { useEffect, useState } from 'react'
import ViewPlans from '../ViewPlans/ViewPlans'
import SidebarAdmin from '../SidebarAdmin/SidebarAdmin'
import ViewScheme from '../ViewScheme/ViewScheme'
import Navbar from '../../../shared/Navbar'
import ViewEmployees from '../ViewEmployees/ViewEmployees'

const containerStyle={
    minHeight:'91.3vh',
    display: 'flex',
    flexDirection: 'row'
}
const AdminPanel = () => {
    const [moduleName, setModuleName] = useState("view_plan");
    const [planid, setPlanid] = useState()
    useEffect(() => {
      console.log("PLAN IDDDD:",planid);
    }, [planid])
    
    return (
        <div>
            <Navbar role={"admin"}/>
            <div style={containerStyle}>
                <SidebarAdmin moduleName = {moduleName} moduleNameSetter = {setModuleName}/>
                <div className='col align-items-center justify-content-center' >
                    {moduleName === "view_plan" &&
                    <ViewPlans moduleNameSetter = {setModuleName} setSchemePlanid={setPlanid}/>
                    }
                    {moduleName === "view_scheme" && planid != undefined &&
                    <ViewScheme planid = {planid} setPlanid = {setPlanid}/>
                    }
                    {moduleName === "view_employees" &&
                    <ViewEmployees moduleNameSetter = {setModuleName}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
