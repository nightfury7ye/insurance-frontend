import React, { useEffect, useState } from 'react'
import { approveCommissionApi, getEmployeeCommissionsApi } from '../../../service/EmployeeApis'

import { Button, Form, Modal } from 'react-bootstrap'
import Pagination from '../../../shared/table/Pagination'

const CommissionWithdrawals = () => {
    const token = localStorage.getItem("auth")
    const role = localStorage.getItem("role")
    const[data,setData] = useState([])
  
    // const [curPageNo, setCurPageNo] = useState(1);
    const [curPageNo, setCurPageNo] = useState(1);
    const [size,setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[commissionid,setCommissionid] = useState()
  
    const handlePageChange = async (clickValue) => {
      if(clickValue == "prev" && curPageNo != 1)
      setCurPageNo(curPageNo - 1)
      if(clickValue == "next" && curPageNo != totalPages)
      setCurPageNo(curPageNo + 1)
    }

    const handleSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setSize(newSize);
      };
  
    // const authenticate = () =>{
    //   if(!(authenticateAdmin(username))){ 
    //     navigation(`/`)
    //   }
    // }
  
    const getWithdrawal = async () =>{
      try {
        let response = await getEmployeeCommissionsApi(curPageNo, size)
        console.log(response.data);
        setData(response.data.content)
        setCurPageNo(Math.min(curPageNo,response.data.totalPages))
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.log(error);
      }
      
    }

    useEffect(() =>{
        getWithdrawal()
    },[])
  
    useEffect(() =>{
      getWithdrawal()
    },[curPageNo,size])
  
    const handleApprove  = (data) =>{
      setShow(true)
      setCommissionid(data.commisionid)
    }
  
    const approve = async () =>{
        try {
            await approveCommissionApi(commissionid, token)
            alert("Withdraw request approved successfully")
            setShow(false)
            getWithdrawal()
        } catch (error) {
            console.log(error);
        }
    }
  
  
    let rowDataElements = data.map((data) =>{
      return(
          <tr>
                <td>{data.customerUsername}</td>
                <td>{data.customerFirstname}</td>
                <td>{data.agentName}</td>
                <td>{data.date}</td>
                <td>{data.policynumber}</td>
                <td>{data.amount}</td>
                {data.requestStatus == "requested"?
                <td>{data.withdrawStatus == "pending" ? <><button onClick={() => handleApprove(data)} className='btn btn-primary'>Approve</button></>:<>{data.withdrawStatus}</>}</td>
                : null}
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
                        <th>Status</th>
                    </tr>
                </thead>
            <tbody >
                {rowDataElements}
            </tbody>
            </table>
        </div>
      <Modal show={show} onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure want to approve the Commision withdrawal?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={approve}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
     </div>
    )
  }

export default CommissionWithdrawals
