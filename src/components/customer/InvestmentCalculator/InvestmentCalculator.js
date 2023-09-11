import React, { useEffect, useState } from 'react'
import './InvestmentCalculator.css';
import { getCustomerAPI } from '../../../service/CustomerApis';

const InvestmentCalculator = ({ schemeDto, setPolicyDetailsGlobal, moduleNameSetter }) => {
    const username = localStorage.getItem('username')
    const [customer, setCustomer] = useState({})
    const [approvedCustomer, setApprovedCustomer] = useState(true)
    const [policyDetails, setPolicyDetails] = useState({
        years: '',
        investmentAmount: '',
        months: 3,
        installmentAmount: '',
        interestAmount: '',
        totalInvestment: '',
        totalAmount: '',
      });

      const getcustomer = async () => {
        try {
          const response = await getCustomerAPI(username);
          setCustomer(response.data);
          console.log("customer data", customer)
          if(response.data.documentStatus != "Approved"){
            setApprovedCustomer(false)
          }

        } catch (error) {
          console.error("Error fetching schemes:", error);
        }
      }
      useEffect(() => {
        getcustomer()
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

        function timeout(delay) {
            return new Promise( res => setTimeout(res, delay) );
        }
    
      const handleBuyPlan = async () => {
        let msg = handleCalculate()
        console.log("msg",msg)
        // await timeout(5000);
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
            {approvedCustomer?
            <button onClick={handleBuyPlan}>Buy Plan</button>:
            <p>Sorry Your documents arent verified till now! come again later after approval</p>}
          </div>
        </div>
      );
}

export default InvestmentCalculator
