import React, { useEffect, useState } from 'react'
import { approveClaimApi, approveCommissionApi, getClaimsApi, getEmployeeCommissionsApi } from '../../../service/EmployeeApis'

import { Button, Form, Modal } from 'react-bootstrap'
import Pagination from '../../../shared/table/Pagination'

const ViewClaims = () => {
    const token = localStorage.getItem("auth")
    const role = localStorage.getItem("role")
    const[data,setData] = useState([])
  
    // const [curPageNo, setCurPageNo] = useState(1);
    const [curPageNo, setCurPageNo] = useState(1);
    const [size,setSize] = useState(5)
    const [totalPages, setTotalPages] = useState(0)
  
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const[claimid,setClaimid] = useState()
  
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
  
    const getClaims = async () =>{
      try {
        let response = await getClaimsApi(curPageNo, size)
        console.log(response.data);
        setData(response.data.content)
        setCurPageNo(Math.min(curPageNo,response.data.totalPages))
        setTotalPages(response.data.totalPages)
      } catch (error) {
        console.log(error);
      }
      
    }

    useEffect(() =>{
        getClaims()
    },[])
  
    useEffect(() =>{
      getClaims()
    },[curPageNo,size])
  
    const handleApprove  = (data) =>{
      setShow(true)
      setClaimid(data.claimid)
    }
  
    const approve = async () =>{
        try {
            await approveClaimApi(claimid, token)
            alert("Claim request approved successfully")
            setShow(false)
            getClaims()
        } catch (error) {
            console.log(error);
        }
    }
  
  
    let rowDataElements = data.map((data) =>{
      return(
          <tr>
                <td>{data.claim_amount}</td>
                <td>{data.bank_accno}</td>
                <td>{data.bank_ifsc_code}</td>
                <td>{data.date}</td>
                <td>{data.policy.policyno}</td>
                {data.requestStatus == "pending"?
                <td><button onClick={() => handleApprove(data)} className='btn btn-primary'>Approve</button></td>
                : <td>{data.requestStatus} </td>}
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
                        <th>Claim Amount</th>
                        <th>Account no.</th>
                        <th>Ifsc Code</th>
                        <th>Date</th>
                        <th>Policy No.</th>
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
            <Modal.Title>Are you sure want to approve the Claim?</Modal.Title>
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

export default ViewClaims
