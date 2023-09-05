import React, { useEffect, useState } from 'react'
import './Payment.css';
import axios from 'axios';
import { firstPaymentApi, purchasePolicyApi } from '../service/CustomerApis';

const Payment = ({policyDetailsGlobal, schemeDto, moduleNameSetter}) => {
    const customerid = localStorage.getItem('customerid')
    const [paymentData, setPaymentData] = useState({
        date: new Date().toLocaleDateString(),
        installmentAmount: policyDetailsGlobal.installmentAmount,
        taxAmount: (policyDetailsGlobal.installmentAmount * 0.12).toFixed(2), 
        totalAmount: (policyDetailsGlobal.installmentAmount * 1.12).toFixed(2),
        paymentType: '',
        cardNumber: '',
        cvv: '',
    });
    const token = localStorage.getItem("auth")
    const [premiumType, setPremiumType] = useState('')

    useEffect(() => {
        console.log(policyDetailsGlobal.months);
        if (policyDetailsGlobal.months == 3) {
            setPremiumType(1);
        } else if (policyDetailsGlobal.months == 6) {
            setPremiumType(2);
        } else if (policyDetailsGlobal.months == 12) {
            setPremiumType(3);
        }
        console.log("what", premiumType); 
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value,
        });
    };

    const firstPayment = async (policyno) => {
        try {
          const response = await firstPaymentApi(policyno, paymentData)
          alert('Policy Bought sccessfully');
          moduleNameSetter("view_plan")
        } catch (error) {
          console.log("Error buying 1st premium:", error);
        }
      }

    const purchasePolicy = async () => {
        try {
            console.log("inside purchase policy");
            // const response = await purchasePolicyApi(customerid, schemeDto.schemeid, policyDetailsGlobal, premiumType)
            console.log("inside purchase policy2");
            // firstPayment(response.data.policyno)
            firstPayment(9)
        } catch (error) {
          console.log("Error purchasing the policy:", error);
        }
      }

    const handlePayButtonClick = () => {
        if (paymentData.paymentType == '' || paymentData.cardNumber == '' || paymentData.cvv == '') {
            alert('Please fill all the fields.');
            return
        }
        purchasePolicy()
        console.log(paymentData);
    };

    return (
        <div className="payment-container">
            <div className='payment-header'>
                <h2>Payment Gateway</h2>
            </div>
            <form>
                <div className="payment-box">
                    <label>Date:</label>
                    <input type="text" value={paymentData.date} disabled />
                </div>
                <div className="payment-box">
                    <label>Installment Amount:</label>
                    <input type="text" value={paymentData.installmentAmount} disabled />
                </div>
                <div className="payment-box">
                    <label>Tax Amount (12%):</label>
                    <input type="text" value={paymentData.taxAmount} disabled />
                </div>
                <div className="payment-box">
                    <label>Total Amount:</label>
                    <input type="text" value={paymentData.totalAmount} disabled />
                </div>

                <div className="payment-box">
                    <label>Payment Type:</label>
                    <select className="form-select" name="paymentType" onChange={handleInputChange} value={paymentData.paymentType}>
                        <option value="">Select Payment Type</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>
                <div className="payment-box">
                    <label>Card Number:</label>
                    <input className="form-control" type="number" name="cardNumber" value={paymentData.cardNumber} onChange={handleInputChange} />
                </div>
                <div className="payment-box">
                    <label>CVV:</label>
                    <input className="form-control" type="number" name="cvv" value={paymentData.cvv} onChange={handleInputChange} />
                </div>
                <button type="button" onClick={handlePayButtonClick} className="pay-button">
                    Pay
                </button>
            </form>
        </div>
    );
}

export default Payment
