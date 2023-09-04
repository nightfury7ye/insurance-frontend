import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './CustomerViewSchemes.css'
import SchemeCard from './SchemeCard';
import { getschemes } from '../../../service/CustomerApis';

const CustomerViewSchemes = ({planid, setSchemeDto, moduleNameSetter}) => {
  const [schemeData, setSchemeData] = useState([]);
  const token = localStorage.getItem('auth')

  const getCustomerSchemes = async () => {
    try {
      const response = await getschemes(token, planid);
      setSchemeData(response.data);
      console.log("schemedata", response.data)
    } catch (error) {
      console.log("Error fetching schemes:", error);
    }
  }

  useEffect(() => {
    console.log("UseEffect");
    if (localStorage.getItem('auth')) {
      getCustomerSchemes();
    }
  }, []);

  const handlePlanClick = (scheme) => {
    console.log("Clicked Plan ID:", scheme);
    setSchemeDto(scheme);
    moduleNameSetter("scheme_details")
  };

  return (
    <div className='main-container'>
      <div className='card-container'>
        <h1 className='title'>Schemes for Plan {planid}</h1>
        {schemeData.length === 0 ? (
          <div className='no-schemes-card'>
            <p>No schemes available for this plan.</p>
          </div>
        ) : (
          schemeData.map(scheme => (
            <SchemeCard key={scheme.schemeid} scheme={scheme} onSchemeClick={handlePlanClick}/>
          ))
        )}
      </div>
    </div>
  )
}

export default CustomerViewSchemes
