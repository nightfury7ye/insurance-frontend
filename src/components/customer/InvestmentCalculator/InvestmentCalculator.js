import React, { useEffect, useState } from 'react'
import './InvestmentCalculator.css';
import { getCustomerAPI, getCustomerByIdAPI } from '../../../service/CustomerApis';

const InvestmentCalculator = ({ schemeDto, setPolicyDetailsGlobal, moduleNameSetter }) => {
    const username = localStorage.getItem('username')
    const customerid = localStorage.getItem('customerid')
    const [customer, setCustomer] = useState({})
    const [approvedCustomer, setApprovedCustomer] = useState(true)
    const [ageRangeCustomer, setageRangeCustomer] = useState(true)
    const [login, setLogin] = useState(true)
    const [policyDetails, setPolicyDetails] = useState({
        years: '',
        investmentAmount: '',
        months: 3,
        installmentAmount: '',
        interestAmount: '',
        totalInvestment: '',
        totalAmount: '',
      });

      function calculateAge(dateOfBirth) {
        const dobParts = dateOfBirth.split('-');
        const dobYear = parseInt(dobParts[0], 10);
        const dobMonth = parseInt(dobParts[1], 10);
        const dobDay = parseInt(dobParts[2], 10);
        const currentDate = new Date();
      
        let age = currentDate.getFullYear() - dobYear;
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        if (currentMonth < dobMonth || (currentMonth === dobMonth && currentDay < dobDay)) {
          age--;
        }
        return age;
      }

      const getcustomer = async () => {
        try {
          console.log("here custid: ", customerid);
          const response = await getCustomerByIdAPI(customerid);
          setCustomer(response.data);
          console.log("customer data in calculator", response.data)
          if(response.data.documentStatus != "Approved"){
            setApprovedCustomer(false)
          }
          let min_age = schemeDto.schemeDetails.min_age;
          let max_age = schemeDto.schemeDetails.max_age
          let dob = response.data.dob;
          const age = calculateAge(dob);
          console.log('Age:', age);
          if (age < min_age || age > max_age) {
            console.log("age not valid ", min_age, max_age);
            setageRangeCustomer(false)
          }

        } catch (error) {
          console.log("Error fetching schemes:", error);
        }
      }
      useEffect(() => {
        if(localStorage.getItem('auth')){
          getcustomer()
        }else{
          setLogin(false)
        }
      }, [])
      
    
      const handleCalculate = () => {
        const { years, investmentAmount, months } = policyDetails;
        console.log("months: ", months);
        const minInvestTime = schemeDto.schemeDetails.min_invest_time;
        const maxInvestTime = schemeDto.schemeDetails.max_invest_time;
        const minAmount = schemeDto.schemeDetails.min_amount;
        const maxAmount = schemeDto.schemeDetails.max_amount;
    
        if (years < minInvestTime || years > maxInvestTime || investmentAmount < minAmount || investmentAmount > maxAmount) {
          alert('Please enter valid values within the specified range.');
          return "invalid";
        }
    
        const interest = (parseFloat(investmentAmount) * parseFloat(schemeDto.schemeDetails.profit_ratio)) / 100;
        const totalAmountValue = parseFloat(investmentAmount);
        let numberOfIntervals = parseInt(years);
    
        if(months == 6) {
          console.log("monthsss: 6");
          numberOfIntervals *= 2;
        } else if (months == 3) {
          numberOfIntervals *= 4;
        }
        console.log(numberOfIntervals);
        const installmentValue = totalAmountValue / numberOfIntervals;
    
        setPolicyDetails({
          ...policyDetails,
          installmentAmount: installmentValue.toFixed(2),
          interestAmount: interest.toFixed(2),
          totalInvestment: totalAmountValue.toFixed(2),
          totalAmount: (totalAmountValue + interest).toFixed(2),
        });
        return "valid";
      };
    
      const handleBuyPlan = async () => {
        let msg = handleCalculate()
        console.log("msg",msg)
        if(msg === "valid"){
            console.log('schemeDto:', schemeDto);
            console.log('policyDetails:', policyDetails);
            setPolicyDetailsGlobal(policyDetails)
            moduleNameSetter("confirm_policy_details")
        }
      };
    
      return (
        <div className='investment-calculator'>
          <h2>Investment Calculator</h2>
          <div className='calculator-inputs'>
            <div className='input-group'>
              <label>Number of Years:</label>
              <input
                type='number'
                value={policyDetails.years}
                onChange={(e) => setPolicyDetails({ ...policyDetails, years: e.target.value })}
                min={schemeDto.schemeDetails.min_invest_time}
                max={schemeDto.schemeDetails.max_invest_time}
              />
            </div>
            <div className='input-group'>
              <label>Total Investment Amount:</label>
              <input
                type='number'
                value={policyDetails.investmentAmount}
                onChange={(e) => setPolicyDetails({ ...policyDetails, investmentAmount: e.target.value })}
                min={schemeDto.schemeDetails.min_amount}
                max={schemeDto.schemeDetails.max_amount}
              />
            </div>
            <div className='input-group'>
              <label>Months:</label>
              <select
                value={policyDetails.months}
                onChange={(e) => setPolicyDetails({ ...policyDetails, months: e.target.value })}
              >
                <option value={3}>3 months</option>
                <option value={6}>6 months</option>
                <option value={12}>12 months</option>
              </select>
            </div>
            <button onClick={handleCalculate}>Calculate</button>
          </div>
          <div className='calculator-output'>
            <div className='output-group'>
              <div className='output-group left'>
                <label>Installment Amount:</label>
                <p>{policyDetails.installmentAmount}</p>
              </div>
              <div className='output-group left'>
                <label>Interest Amount:</label>
                <p>{policyDetails.interestAmount}</p>
              </div>
            </div>
            <div className='output-group'>
              <div className='output-group right'>
                <label>Total Investment:</label>
                <p>{policyDetails.totalInvestment}</p>
              </div>
              <div className='output-group right'>
                <label>Total Amount (Sum Assured):</label>
                <p>{policyDetails.totalAmount}</p>
              </div>
            </div>
          </div>
          <div className='buy-plan-button'>
            {login ?
            approvedCustomer?
            ageRangeCustomer? <button onClick={handleBuyPlan}>Buy Plan</button>:
            <h4 style={{color:'red'}}><b>*Age Range is not valid for this plan*</b></h4>
            :<h5 style={{color:"#0987f5" }}>*Sorry Your documents arent verified till now! come again later after approval*</h5>
            :<h5 style={{color:"#0987f5" }}>*Login to Buy policy*</h5>}
          </div>
        </div>
      );
}

export default InvestmentCalculator
