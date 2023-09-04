import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../../../shared/table/Table';
import { getPaymentsApi, getPolicyApi } from '../../../service/CustomerApis';

const ViewpolicyDetails = ({policyDetailsGlobal}) => {
    console.log("inside ViewpolicyDetails: ",policyDetailsGlobal);
    const token = localStorage.getItem("auth");
    const [policyData, setPolicyData] = useState({})
    const [insuranceScheme, setInsuranceScheme] = useState({})
    const [paymentDto, setPaymentDto] = useState([])
    let paymentButton = true

    const getPolicy = async () => {
        try {
          const response = await getPolicyApi(token, policyDetailsGlobal.policyno)
    
          console.log("inside getPolicies", response.data);
          let policy = response.data;
    
          setPolicyData({
            policyno: policy.policyno,
            issuedate: policy.issuedate,
            maturitydate: policy.maturitydate,
            premium_amount: policy.premiumamount,
            sum_assured: policy.sumassured,
            installment_Type: policy.installmentType.type_value,
          });
          let scheme = policy.insuranceScheme;
            setInsuranceScheme({
            schemeid: scheme.schemeid,
            scheme_name: scheme.scheme_name,
            min_amount: scheme.schemeDetails.min_amount,
            max_amount: scheme.schemeDetails.max_amount,
            min_invest_time: scheme.schemeDetails.min_invest_time,
            max_invest_time: scheme.schemeDetails.max_invest_time,
            min_age: scheme.schemeDetails.min_age,
            max_age: scheme.schemeDetails.max_age,
            profit_ratio: scheme.schemeDetails.profit_ratio,
            });
        } catch (error) {
          console.log("Error fetching policies:", error);
        }
      };

      const getPayments = async () => {
        try {
          const response = await getPaymentsApi(token,policyDetailsGlobal.policyno);
          
          console.log("inside getPayments", response.data);
          setPaymentDto(response.data)
        } catch (error) {
          console.log("Error fetching payments:", error);
        }
      };

      useEffect(() => {
        if(localStorage.getItem('auth')) {
          getPolicy();
          getPayments();
        }
      }, []);

      const payment = () => {
        alert(`You have successfully paid the amount of for Policy No :${policyDetailsGlobal?.policyno}`);
      }

    const payButton = (objectValue) => {
      if(objectValue.status.statusname == 'pending' && paymentButton == true){
        console.log(paymentButton);
        paymentButton = false
        return(
          <>
          {/* <button className="btn btn-secondary mb-3" onClick={() => {payment(objectValue)}}>Pay</button> */}
          <td className='text-center'>%</td> 
          </>
      )
      }
      console.log("paybutton comment");
        return(
            <>
            <td className='text-center'>-</td>  
            </>
        )
    }

      const tableAccountHeaders = ["ID",
                                    "Payment Type",
                                    "Amount",
                                    "pay Date",
                                    "Tax",
                                    "Total Payment",
                                    "Payment status"];
    return (
        <div className='main-card'>
            <h3 style={{marginLeft:'10px', textAlign: 'center'}}>Policy No. - {policyData?.policyno}</h3><br/>
            <div className='table-container'>
            <h6 style={{marginLeft:'10px', textAlign: 'center'}}>Policy Details</h6>
                <table class="table table-striped">
                <thead>
                    <tr>
                    {Object.keys(policyData).map((key, index) => (
                        <th scope="col" className='text-center col align-items-center justify-content-center'>{key.replace(/_/g, ' ').toUpperCase()}</th>
                    ))}
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                    {Object.values(policyData).map((value, index) => (
                        <td scope="col" className='text-center col align-items-center justify-content-center'>{value}</td>
                    ))}
                    </tr>
                </tbody>
                </table>
            </div>
            <div className='table-container'>
            <h6 style={{marginLeft:'10px', textAlign: 'center'}}>Scheme Details</h6>
                <table class="table table-striped">
                <thead>
                    <tr>
                    {Object.keys(insuranceScheme).map((key, index) => (
                        <th scope="col" className='text-center col align-items-center justify-content-center'>{key.replace(/_/g, ' ').toUpperCase()}</th>
                    ))}
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr>
                    {Object.values(insuranceScheme).map((value, index) => (
                        <td scope="col" className='text-center col align-items-center justify-content-center'>{value}</td>
                    ))}
                    </tr>
                </tbody>
                </table>
            </div>
            <div className='col' style={{marginTop: '3rem'}}>
                <Table
                headers={tableAccountHeaders}
                data={paymentDto}
                enableUpdate={false}
                enableDelete={false}
                extraFunction={payButton}
                />
            </div>
        </div>
    )
}

export default ViewpolicyDetails
