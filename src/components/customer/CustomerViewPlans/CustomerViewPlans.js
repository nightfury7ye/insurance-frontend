import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import './CustomerViewPlans.css';
import PlanCard from './PlanCard';
import { getplans } from '../../../service/CustomerApis';

const CustomerViewPlans = ({moduleNameSetter, setSchemePlanid}) => {
  const token = localStorage.getItem("auth")
  const [plansData, setPlansData] = useState([])

const getCustomerPlans = async () => {
    let response = await getplans();
    console.log("inside getplans",response.data);
    setPlansData(response.data)
}

const handlePlanClick = (planId) => {
  console.log("Clicked Plan ID:", planId);
  setSchemePlanid(planId)
  moduleNameSetter("view_scheme")
};

useEffect(() => {
    if(localStorage.getItem('auth')){
      getCustomerPlans();
    }
},[])
  return (
    <div className='main-container'>
      <div className='card-container'>
        <h1 className='title'>Available Plans</h1>
        {plansData.map(plan => (
          <PlanCard key={plan.planid} plan={plan} onPlanClick={handlePlanClick} />
        ))}
      </div>
    </div>
  )
}

export default CustomerViewPlans
