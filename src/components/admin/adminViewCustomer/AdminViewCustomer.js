import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import { getCustomersApi } from '../../../service/EmployeeApis';
import Pagination from '../../../shared/table/Pagination';
import Table from '../../../shared/table/Table';

const AdminViewCustomer = ({moduleNameSetter, setCustomerid}) => {
  const token = localStorage.getItem("auth");
  const [customerData, setCustomerData] = useState([]);
  const [customerFullData, setCustomerFullData] = useState([]);
  const [curPageNo, setCurPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(4);

  const getCustomers = async () => {
    try {
      const response = await getCustomersApi(curPageNo, size)

      console.log("inside getCustomers", response.data);

      setCustomerFullData(response.data)

      const customerDtoArray = response.data.content.map((customer) => ({
        customerid: customer.customerid,
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        phoneno: customer.phoneno,
        documentStatus: customer.documentStatus,
        userstatus: customer.userStatus.statusname,
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
      getCustomers();
    }
  }, []);

  useEffect(() => {
    getCustomers();
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

  const handleDeleteCustomer = async (customer) => {
    if (customer.userstatus.statusid === 1) {
      updateCustomerStatus(customer.customerid, 2);
    } else if (customer.userstatus.statusid === 2) {
      updateCustomerStatus(customer.customerid, 1);
    }
  };

  const viewPolicies = (objectValue) => {
    console.log("index from viewDocuments: ", objectValue);
    setCustomerid(objectValue.customerid)
    moduleNameSetter("view_policies")
    // let customer = customerFullData.content[index]
    }

  const viewPoliciesBtn = (objectValue) => {
      console.log("objectValue", objectValue);
      return(
        <>
        <button className="btn btn-secondary mb-3" onClick={() => {viewPolicies(objectValue)}}>View Policies</button>
        </>
      )
  }

  const updateCustomerStatus = async (customerId, statusId) => {
    try {
      await axios.put(`http://localhost:8080/employeeapp/update_customer_status/${customerId}/${statusId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getCustomers();

      alert(`Customer status updated successfully`);
    } catch (error) {
      console.log("Error updating customer status:", error);
    }
  };

  const tableCustomerHeaders = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Phone No",
    "Document Status",
    "User Status",
    "View policies"
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
        <Table
          headers={tableCustomerHeaders}
          data={customerData}
          enableUpdate={false}
          enableDelete={true}
          deleteFunction={handleDeleteCustomer}
          viewList={viewPoliciesBtn}
        />
      </div>
    </div>
  );
};

export default AdminViewCustomer
