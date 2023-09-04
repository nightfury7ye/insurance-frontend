import React from 'react'
import './SchemeDetails.css'
import InvestmentCalculator from '../InvestmentCalculator/InvestmentCalculator';

const SchemeDetails = ({schemeDto, setPolicyDetailsGlobal, moduleNameSetter}) => {
    console.log(schemeDto);
    return (
        <div className='scheme-details-container'>
          <div className='scheme-header'>
            <h2>Scheme Details</h2>
          </div>
          <div className='scheme-content'>
            <div className='scheme-field'>
              <label>Scheme Name:</label>
              <p>{schemeDto.scheme_name}</p>
            </div>
            <div className='scheme-field'>
              <label>Description:</label>
              <p>{schemeDto.schemeDetails.discription}</p>
            </div>
            <div className='scheme-card-group'>
              <div className='scheme-card'>
                <h3>Investment Amount</h3>
                <p>Min: {schemeDto.schemeDetails.min_amount}</p>
                <p>Max: {schemeDto.schemeDetails.max_amount}</p>
              </div>
              <div className='scheme-card'>
                <h3>Investment Time</h3>
                <p>Min: {schemeDto.schemeDetails.min_invest_time} Years</p>
                <p>Max: {schemeDto.schemeDetails.max_invest_time} Years</p>
              </div>
            </div>
            <div className='scheme-card-group'>
              <div className='scheme-card'>
                <h3>Age Range</h3>
                <p>Min: {schemeDto.schemeDetails.min_age}</p>
                <p>Max: {schemeDto.schemeDetails.max_age}</p>
              </div>
              <div className='scheme-card'>
                <h3>Profit Ratio</h3>
                <p>{schemeDto.schemeDetails.profit_ratio}%</p>
              </div>
            </div>
            <InvestmentCalculator
            schemeDto={schemeDto} 
            setPolicyDetailsGlobal={setPolicyDetailsGlobal} 
            moduleNameSetter={moduleNameSetter}/>
          </div>
        </div>
      );
}

export default SchemeDetails
