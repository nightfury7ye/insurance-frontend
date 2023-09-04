import React, { useEffect, useState } from 'react'
import './ConfirmPolicyDetails.css';

const ConfirmPolicyDetails = ({policyDetailsGlobal, schemeDto, moduleNameSetter}) => {
    console.log("ConfirmPolicyDetails: ",policyDetailsGlobal);
    console.log(schemeDto);
    const today = new Date();
    const maturityDate = new Date(today);
    maturityDate.setFullYear(today.getFullYear() + parseInt(policyDetailsGlobal.years, 10));
    const [premiumType, setPremiumType] = useState('')

    useEffect(() => {
        console.log(policyDetailsGlobal.months);
        if (policyDetailsGlobal.months == 3) {
            setPremiumType('3 Months');
        } else if (policyDetailsGlobal.months == 6) {
            setPremiumType('6 Months');
        } else if (policyDetailsGlobal.months == 12) {
            setPremiumType('1 Year');
        }
        console.log("what", premiumType); 
    }, [])
    
    const handleProceed = () => {
        console.log("handle confirm buy")
        moduleNameSetter("payment_page")
      };


    return (
        <div className="form-container">
            <div className='policy-details-header'>
                <h2>Policy Details</h2>
                <p>Kindly confirm before making payment...</p>
            </div>
            <form>
                <div className="form-box">
                    <label>Scheme Name:</label>
                    <input type="text" value={schemeDto.scheme_name} disabled />
                </div>
                <div className="form-box">
                    <label>No. of Years:</label>
                    <input type="text" value={policyDetailsGlobal.years} disabled />
                </div>
                <div className="form-box">
                    <label>Profit Ratio:</label>
                    <input type="number" value={schemeDto.schemeDetails.profit_ratio} disabled />
                </div>
                <div className="form-box">
                    <label>Total Investment Amount:</label>
                    <input type="number" value={policyDetailsGlobal.totalInvestment} disabled />
                </div>
                <div className="form-box">
                    <label>Premium Type:</label>
                    <input type="text" value={premiumType} disabled />
                </div>
                <div className="form-box">
                    <label>Installment Amount:</label>
                    <input type="number" value={policyDetailsGlobal.installmentAmount} disabled />
                </div>
                <div className="form-box">
                    <label>Interest Amount:</label>
                    <input type="number" value={policyDetailsGlobal.interestAmount} disabled />
                </div>
                <div className="form-box">
                    <label>Total Amount:</label>
                    <input type="text" value={policyDetailsGlobal.totalAmount} disabled />
                </div>
                <div className="form-box">
                    <label>Issue Date:</label>
                    <input type="text" value={today.toDateString()} disabled />
                </div>
                <div className="form-box">
                    <label>Maturity Date:</label>
                    <input type="text" value={maturityDate.toDateString()} disabled />
                </div>
            </form>
            <div className='buy-plan-button'>
                <button className='btn' onClick={handleProceed}>Click here to Proceed</button>
            </div>
        </div>
    );
}

export default ConfirmPolicyDetails
