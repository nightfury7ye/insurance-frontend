import React, { useEffect, useState } from 'react'
import SidebarEmployee from '../SidebarEmployee/SidebarEmployee';
import ViewAgents from '../ViewAgents/ViewAgents';
import Navbar from '../../../shared/Navbar';
import ViewCustomers from '../../../shared/ViewCustomers/ViewCustomers';
import ViewNonApprovedCustomers from '../ViewNonApprovedCustomers/ViewNonApprovedCustomers';
import CommissionWithdrawals from '../commissionWithdrawals/CommissionWithdrawals';
import EmployeeProfile from '../employeeProfile/EmployeeProfile';
import ViewClaims from '../viewClaims/ViewClaims';

const containerStyle={
    minHeight:'91.3vh',
    display: 'flex',
    flexDirection: 'row'
}
const EmployeePanel = () => {
    const [moduleName, setModuleName] = useState("view_agents");
    const [id, setId] = useState()
    useEffect(() => {
      console.log("PLAN IDDDD:",id);
    }, [id])
    
    return (
        <div>
            <Navbar role={"admin"}/>
            <div style={containerStyle}>
                <SidebarEmployee moduleName = {moduleName} moduleNameSetter = {setModuleName}/>
                <div className='col align-items-center justify-content-center' >
                    {moduleName === "view_agents" &&
                    <ViewAgents moduleNameSetter = {setModuleName} />
                    }
                    {moduleName === "view_customers" &&
                    <ViewCustomers moduleNameSetter = {setModuleName} />
                    }
                    {moduleName === "view_pending_customers" &&
                    <ViewNonApprovedCustomers moduleNameSetter = {setModuleName} />
                    }
                    {moduleName === "view_commission" &&
                    <CommissionWithdrawals moduleNameSetter = {setModuleName} />
                    }
                    {moduleName === "view_claims" &&
                    <ViewClaims moduleNameSetter = {setModuleName} />
                    }
                    {moduleName === "view_profile" &&
                    <EmployeeProfile
                    moduleNameSetter = {setModuleName}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default EmployeePanel
