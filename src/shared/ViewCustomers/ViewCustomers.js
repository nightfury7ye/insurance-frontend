import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../table/Pagination';
import Table from '../table/Table';
import { getCustomersApi } from '../../service/EmployeeApis';

const ViewCustomers = () => {
  const token = localStorage.getItem("auth");
  const [customerData, setCustomerData] = useState([]);
  const [curPageNo, setCurPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(4);

  const getCustomers = async () => {
    try {
      const response = await getCustomersApi(curPageNo, size)

      console.log("inside getCustomers", response.data);

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
    // Check the current status and update accordingly
    if (customer.userstatus.statusid === 1) {
      // If status is active, set it to disabled
      updateCustomerStatus(customer.customerid, 2);
    } else if (customer.userstatus.statusid === 2) {
      // If status is disabled, set it to active
      updateCustomerStatus(customer.customerid, 1);
    }
  };

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
        />
      </div>
    </div>
  );
};

export default ViewCustomers;
