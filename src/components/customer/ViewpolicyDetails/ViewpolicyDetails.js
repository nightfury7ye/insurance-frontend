import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from '../../../shared/table/Table';
import { getPaymentsApi, getPolicyApi, installmentPaymentApi } from '../../../service/CustomerApis';
import { Button, Form, Modal } from 'react-bootstrap'

const ViewpolicyDetails = ({policyDetailsGlobal, moduleNameSetter,setPayment}) => {
    console.log("inside ViewpolicyDetails: ",policyDetailsGlobal);
    const token = localStorage.getItem("auth");
    const [policyData, setPolicyData] = useState({})
    const [insuranceScheme, setInsuranceScheme] = useState({})
    const [paymentDto, setPaymentDto] = useState([])
    const [accountNumber, setAccountNumber] = useState()
    const [paymentType, setPaymentType] = useState('')
    const [ifscCode, setIfscCode] = useState()
    const [paymentid, setPaymentid] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    // let paymentButton = true
    const [paymentButton, setPaymentButton] = useState(true)

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

      const payment = (data) => {
        // alert(`You have successfully paid the amount of for Policy No :${policyDetailsGlobal?.policyno}`);
        setPaymentid(data.paymentid)
        // moduleNameSetter("payment_page")
        setShow(true)
        console.log(data.paymentid, data.paymenttype);
        console.log(policyDetailsGlobal);
      }

    let i = 0
    const payButton = (objectValue) => {
      if(objectValue.status.statusname == 'pending'){
        console.log(paymentButton);
        return(
          <>
          <button className="btn btn-secondary mb-3" onClick={() => {payment(objectValue)}}>Pay</button>
          </>
        )
      }
      console.log(i);
      return(
            <>
            <td className='text-center'>-</td>
            </>
        )
      }

      const withdraw = async () =>{
        if(typeof accountNumber == 'undefined' || accountNumber == ''
        || typeof ifscCode == 'undefined' || ifscCode == '' || typeof paymentType == 'undefined' || paymentType == ''){ 
          alert("Please fill all the fields")
          return
        }
        const isValidAccountNumber = /^[1-9]\d*$/.test(accountNumber);
        if(!isValidAccountNumber){
          alert("Incorrect Account Number")
          return
        }
    
        const isValidIFSCCode = /^[a-zA-Z0-9]+$/.test(ifscCode);
        if(!isValidIFSCCode){
          alert("Incorrect Ifsc code") 
          return
        }
        try {
            await installmentPaymentApi(paymentid, paymentType, token);
            alert("Withdraw request sent successfully")
            setShow(false)
            getPayments()
        } catch (error) {
            console.log(error);
        }
      }

      let rowDataElements = paymentDto.map((data, index) =>{
        return(
            <tr>
                <td>{index}</td>
                <td>{data.paymenttype != null ? data.paymenttype: "-" }</td>
                <td>{data.amount}</td>
                <td>{data.date}</td>
                <td>{data.tax}</td>
                <td>{data.totalpayment}</td>
                <td>{data.status.statusname == "pending" && paymentDto[index - 1].status.statusname == 
                "paid" ? <><button onClick={() => payment(data)} className='btn btn-primary'>Pay</button></>
                :<>{data.status.statusname}</>}</td>                
            </tr>
        )
    })

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
            <h6 style={{marginLeft:'10px',marginTop: '3rem', textAlign: 'center'}}>Scheme Details</h6>
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
            <h6 style={{marginLeft:'10px', textAlign: 'center'}}>Payment Details</h6>

                {/* <Table
                headers={tableAccountHeaders}
                data={paymentDto}
                enableUpdate={false}
                enableDelete={false}
                extraFunction={payButton}
                /> */}

                <div className='table-container'>
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Payment Type</th>
                            <th>Amount</th>
                            <th>pay Date</th>
                            <th>Tax</th>
                            <th>Total Payment</th>
                            <th>Payment status</th>
                        </tr>
                      </thead>
                    <tbody >
                    {rowDataElements}
                  </tbody>
                </table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Withdrawal payment Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form.Group >
                  <div className="payment-box">
                      <label>Payment Type:</label>
                      <select className="form-select" name="paymentType" onChange={(e) => setPaymentType(e.target.value)} value={paymentType}>
                          <option value="">Select Payment Type</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                      </select>
                  </div> 
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control type="text" onChange={(e) => setAccountNumber(e.target.value)}
                  />
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control type="text" onChange={(e) => setIfscCode(e.target.value)}
                  />       
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={withdraw}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
    )
}

export default ViewpolicyDetails
