import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from '../../../shared/Navbar';
import SidebarCustomer from '../SidebarCustomer/SidebarCustomer';
import CustomerViewPlans from '../CustomerViewPlans/CustomerViewPlans';
import ViewPolicies from '../ViewPolicies/ViewPolicies';
import ViewpolicyDetails from '../ViewpolicyDetails/ViewpolicyDetails';
import CustomerViewSchemes from '../CustomerViewSchemes/CustomerViewSchemes';
import SchemeDetails from '../SchemeDetails/SchemeDetails';
import ConfirmPolicyDetails from '../ConfirmPolicyDetails/ConfirmPolicyDetails';
import Payment from '../../../shared/Payment';
import { getCustomerAPI } from '../../../service/CustomerApis';
import CustomerProfile from '../customerProfile/CustomerProfile';


const containerStyle={
  minHeight:'91.3vh',
  display: 'flex',
  flexDirection: 'row'
}
const CustomerPanel = () => {
  const [moduleName, setModuleName] = useState("view_plan");
  const [planid, setPlanid] = useState()
  const [schemeDto, setSchemeDto] = useState()
  const [policyDetailsGlobal, setPolicyDetailsGlobal] = useState()
  const [customer, setCustomer] = useState({})
  const username = localStorage.getItem('username')

  const getcustomer = async () => {
    try {
      const response = await getCustomerAPI(username);
      setCustomer(response.data);
      console.log("customer data", customer)
      localStorage.setItem("customerid", response.data.customerid)
    } catch (error) {
      console.error("Error fetching schemes:", error);
    }
  }
    
  useEffect(() => {
    console.log("UseEffect");
    if (localStorage.getItem('username')) {
        getcustomer();
    }
  }, []);
    return (
        <div>
            <Navbar role={"customer"}/>
            <div style={containerStyle}>
                <SidebarCustomer moduleName = {moduleName} moduleNameSetter = {setModuleName}/>
                <div className='col align-items-center justify-content-center' >
                    {moduleName === "view_plan" &&
                    <CustomerViewPlans moduleNameSetter = {setModuleName} setSchemePlanid={setPlanid}/>
                    }

                    {moduleName === "view_policies" &&
                    <ViewPolicies moduleNameSetter = {setModuleName} setPolicyDetailsGlobal={setPolicyDetailsGlobal}/>
                    }

                    {moduleName === "view_policy_details" && policyDetailsGlobal != undefined &&
                    <ViewpolicyDetails
                    moduleNameSetter = {setModuleName}
                    policyDetailsGlobal={policyDetailsGlobal}/>
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
                    {moduleName === "view_profile" &&
                    <CustomerProfile
                    moduleNameSetter = {setModuleName}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default CustomerPanel
