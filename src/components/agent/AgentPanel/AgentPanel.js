import React, { useEffect, useState } from 'react'
import AgentViewCustomer from '../AgentViewCustomer/AgentViewCustomer';
import { getCustomerAPI } from '../../../service/CustomerApis';
import Navbar from '../../../shared/Navbar';
import SidebarAgent from '../SidebarAgent/SidebarAgent';
import { getAgentAPI } from '../../../service/AgentApis';
import CustomerViewPlans from '../../customer/CustomerViewPlans/CustomerViewPlans';
import CustomerViewSchemes from '../../customer/CustomerViewSchemes/CustomerViewSchemes';
import SchemeDetails from '../../customer/SchemeDetails/SchemeDetails';
import ConfirmPolicyDetails from '../../customer/ConfirmPolicyDetails/ConfirmPolicyDetails';
import Payment from '../../../shared/Payment';
import Commission from '../../commission/Commission';
import AgentProfile from '../agentProfile/AgentProfile';

const containerStyle={
    minHeight:'91.3vh',
    display: 'flex',
    flexDirection: 'row'
  }
const AgentPanel = () => {
    const [moduleName, setModuleName] = useState("view_customers");
    const [agent, setAgent] = useState({})
    const username = localStorage.getItem('username')
    const [planid, setPlanid] = useState()
    const [schemeDto, setSchemeDto] = useState()
    const [policyDetailsGlobal, setPolicyDetailsGlobal] = useState()

    const getagent = async () => {
        try {
          const response = await getAgentAPI(username);
          setAgent(response.data);
          console.log("agent data", response)
          localStorage.setItem("agentid", response.data.agentid)
        } catch (error) {
          console.error("Error fetching agent:", error);
        }
      }
        
      useEffect(() => {
        console.log("UseEffect");
        if (localStorage.getItem('username')) {
            getagent();
        }
      }, []);
    return (
        <div>
            <Navbar role={"admin"}/>
            <div style={containerStyle}>
                <SidebarAgent moduleName = {moduleName} moduleNameSetter = {setModuleName}/>
                <div className='col align-items-center justify-content-center' >
                    {moduleName === "view_customers" &&
                    <AgentViewCustomer moduleNameSetter = {setModuleName}/>
                    }
                    {moduleName === "view_plan" &&
                    <CustomerViewPlans moduleNameSetter = {setModuleName} setSchemePlanid={setPlanid}/>
                    }

                    {moduleName === "view_scheme" && planid != undefined &&
                    <CustomerViewSchemes planid = {planid} moduleNameSetter = {setModuleName} setSchemeDto = {setSchemeDto}/>
                    }

                    {moduleName === "scheme_details" && schemeDto != undefined &&
                    <SchemeDetails
                    schemeDto = {schemeDto} 
                    setSchemeDto = {setSchemeDto} 
                    moduleNameSetter = {setModuleName}
                    setPolicyDetailsGlobal={setPolicyDetailsGlobal}/>
                    }

                    {moduleName === "confirm_policy_details" && policyDetailsGlobal != undefined &&
                    <ConfirmPolicyDetails
                    schemeDto = {schemeDto} 
                    policyDetailsGlobal={policyDetailsGlobal}
                    moduleNameSetter = {setModuleName}/>
                    }

                    {moduleName === "payment_page" && policyDetailsGlobal != undefined &&
                    <Payment
                    schemeDto = {schemeDto}
                    policyDetailsGlobal={policyDetailsGlobal}
                    moduleNameSetter = {setModuleName}/>
                    }
                    {moduleName === "view_commisions" &&
                    <Commission
                    schemeDto = {schemeDto}
                    policyDetailsGlobal={policyDetailsGlobal}
                    moduleNameSetter = {setModuleName}/>
                    }
                    {moduleName === "view_profile" &&
                    <AgentProfile
                    moduleNameSetter = {setModuleName}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default AgentPanel