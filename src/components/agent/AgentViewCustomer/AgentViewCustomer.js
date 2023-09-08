import React, { useEffect, useState } from 'react'
import { getAgentCustomersApi } from '../../../service/AgentApis';
import Table from '../../../shared/table/Table';
import Pagination from '../../../shared/table/Pagination';
import axios from 'axios';

const AgentViewCustomer = ({moduleNameSetter}) => {
    const token = localStorage.getItem("auth");
    const [customerData, setCustomerData] = useState([]);
    const [curPageNo, setCurPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(4);
    let agentid = localStorage.getItem("agentid")
  
    const getAgentCustomers = async () => {
      try {
        const response = await getAgentCustomersApi(agentid, token, curPageNo, size)
  
        console.log("inside getAgentCustomers", response.data);
  
        const customerDtoArray = response.data.content.map((customer) => ({
          customerid: customer.customerid,
          firstname: customer.firstname,
          lastname: customer.lastname,
          email: customer.email,
          phoneno: customer.phoneno,
          documentStatus: customer.documentStatus,
          userstatus: customer.userstatus,
        }));
  
        setCustomerData(customerDtoArray);
  
        setCurPageNo(Math.min(curPageNo, response.data.totalPages));
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log("Error fetching customers:", error);
      }
    };
  
    useEffect(() => {
      if (localStorage.getItem('auth')) {
        getAgentCustomers();
      }
    }, []);
  
    useEffect(() => {
        getAgentCustomers();
    }, [curPageNo, size]);
  
    const addCustomer = () => {
      moduleNameSetter("add_customer")
    }

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
  
    const handleDeleteCustomer = async (customer) => {
      if (customer.userstatus.statusid === 1) {

      }
    };

    const getSchemes = async (customer) => {
        console.log("Hiee ",customer)
        if(customer.documentStatus === "Pending"){
            localStorage.setItem("customerid", customer.customerid)
            // navigate("/viewscheme", { state: plan.planid })
            moduleNameSetter("view_plan")
        }else{
            alert("Document Status Pending: Please wait till the documents gets approved.")
        }
    }

    const buyPolicy = (objectValue) => {
        return(
            <>
            <button className="btn btn-secondary mb-3" onClick={() => {getSchemes(objectValue)}}>Buy Policy</button>
            </>
        )
    }
  
    const tableCustomerHeaders = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Phone No",
      "Document Status",
      "User Status",
    ];
  
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
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="12">12</option>
            </select>
            <div className='col-md-4'>
                <button className="btn btn-primary" onClick={() => addCustomer()}>
                Add Customer
                </button>
            </div>
          </div>
          <div className='col-md-4'>
            <Pagination
              curPageNo={curPageNo}
              totalPages={totalPages}
              previousLabel="<<"
              nextLabel=">>"
              onPageChange={handlePageChange}
            />
          </div>
        </div>
        <div className='table-container'>
          <Table
            headers={tableCustomerHeaders}
            data={customerData}
            enableUpdate={false}
            enableDelete={false}
            extraFunction={buyPolicy}
          />
        </div>
      </div>
    );
  };

export default AgentViewCustomer