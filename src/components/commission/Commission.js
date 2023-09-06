import React, { useEffect, useState } from 'react'
import { getCustomersApi } from '../../service/EmployeeApis';
import Table from '../../shared/table/Table';
import Pagination from '../../shared/table/Pagination';
import { Button, Form, Modal } from 'react-bootstrap'
import axios from 'axios';
import { getCommissionApi, getWithdrawCommissionApi } from '../../service/AgentApis';

const Commission = () => {
    const token = localStorage.getItem("auth");
    const agentid = localStorage.getItem("agentid")
    const role = localStorage.getItem("role")
    const [commissionData, setCommissionData] = useState([]);
    const [commissionid, setCommissionid] = useState([]);
    const [accountNumber, setAccountNumber] = useState()
    const [ifscCode, setIfscCode] = useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [curPageNo, setCurPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(4);
  
    const getCommission = async () => {
      try {
        const response = await getCommissionApi(agentid,curPageNo, size)
  
        console.log("inside getCustomers", response.data);
  
        setCommissionData(response.data.content);
  
        setCurPageNo(Math.min(curPageNo, response.data.totalPages));
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Error fetching customers:", error);
      }
    };
  
    useEffect(() => {
      if (localStorage.getItem('auth')) {
        getCommission();
      }
    }, []);
  
    useEffect(() => {
        getCommission();
    }, [curPageNo, size]);
  
    const handlePageChange = async (clickValue) => {
      if (clickValue === "prev" && curPageNo > 1)
        setCurPageNo(curPageNo - 1);
      if (clickValue === "next" && curPageNo !== totalPages)
        setCurPageNo(curPageNo + 1);
    };
  
    const handleSizeChange = (event) => {
      const newSize = parseInt(event.target.value, 10);
      setSize(newSize);
    };
  
    const handleWithdraw  = (data) =>{
        setShow(true)
        setCommissionid(data.commisionid)
    }

    const withdraw = async () =>{
        if(typeof accountNumber == 'undefined' || accountNumber == ''
        || typeof ifscCode == 'undefined' || ifscCode == ''){ 
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
            await getWithdrawCommissionApi(commissionid);
            alert("Withdraw request sent successfully")
            setShow(false)
            getCommission()
        } catch (error) {
            console.log(error);
        }
      }
  
    const tableCustomerHeaders = [
      "Customers Username",
      "Customers First Name",
      "Agent Name",
      "Date",
      "RequestStatus",
      "WithdrawStatus",
    ];

    let rowDataElements = commissionData.map((data) =>{
        return(
            <tr>
                <td>{data.customerUsername}</td>
                <td>{data.customerFirstname}</td>
                <td>{data.agentName}</td>
                <td>{data.date}</td>
                <td>{data.policynumber}</td>
                <td>{data.amount}</td>
                {role=="ROLE_AGENT"?<><td>{data.requestStatus == "pending" ? <><button onClick={() => handleWithdraw(data)} className='btn btn-primary'>Withdraw</button></>:<>{data.requestStatus}</>}</td>
                <td>{data.withdrawStatus}</td></>:<></>}
                
            </tr>
        )
    })
  
    return (
      <div className='main-card'>
        <div className='row'>
          <div className='col-md-4'>
            <label htmlFor="pageSizeDropdown">Items per page:</label>
            <select
              id="pageSizeDropdown"
              value={size}
              onChange={handleSizeChange}
              className='form-select'
            >
              <option value="1">1</option>
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
          </div>
          <div className='col-md-4'>
            <Pagination
              curPageNo={curPageNo}
              totalPages={totalPages}
              previousLabel="<<<"
              nextLabel=">>>"
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className='table-container'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer Username</th>
                        <th>Customer First Name</th>
                        <th>Agent Name</th>
                        <th>Date</th>
                        <th>Policy No.</th>
                        <th>Amount</th>
                        {role=="ROLE_AGENT"?<><th>Withdraw</th>
                        <th>Withdraw Approval</th></>:<></>}
                    </tr>
                </thead>
            <tbody >
                {rowDataElements}
            </tbody>
            </table>
        </div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Withdrawal payment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group >
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
    );
  };

export default Commission
