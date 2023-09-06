import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../table/Pagination';
import Table from '../table/Table';
import { getCustomersApi } from '../../service/EmployeeApis';
import { Button, Modal } from 'react-bootstrap';

const ViewCustomers = () => {
  const token = localStorage.getItem("auth");
  const [customerData, setCustomerData] = useState([]);
  const [customerFullData, setCustomerFullData] = useState([]);
  const [curPageNo, setCurPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(4);
  const [doc1, setDoc1] = useState()
  const [doc2, setDoc2] = useState()
  const [doc3, setDoc3] = useState()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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

  const handleDownload = async (d) => {
    try {
      console.log("handleDownload d: ",d);
      const response = await axios.get(`http://localhost:8080/insurance-app/customer/document/download/${d}`, {
        responseType: 'blob',// Set the response type to 'blob' for binary data
        
      });

      console.log(response.data)

      // Create a blob URL from the response data
      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      // Create a link element and simulate a click to trigger the download
      const link = document.createElement('a');
      link.href = blobUrl;
      let filename
      if(d == 0){
        filename = "Aadhar.pdf"
      }
      if(d == 1){
        filename = "Pan.pdf"
      }
      if(d == 2){
        filename = "Voter.pdf"
      }
      
      link.download = filename; // Use the original file name
      link.click();

      // Clean up the blob URL after the download
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.log('Error downloading file:', error);
    }
}

  const viewDocuments = (index) => {
    console.log("index from viewDocuments: ", index);
    let customer = customerFullData.content[index]
    console.log("customer from viewDocuments: ", customer, customerFullData);
    if(customer.documents){
    setDoc1(customer?.documents[0]?.documentid)
    setDoc2(customer?.documents[1]?.documentid)
    setDoc3(customer?.documents[2]?.documentid)
    setShow(true)
    }
  }

  const viewDocumentButton = (index) => {
      console.log("objectValue", index);
      return(
        <>
        <button className="btn btn-secondary mb-3" onClick={() => {viewDocuments(index)}}>View Documents</button>
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
        <Table
          headers={tableCustomerHeaders}
          data={customerData}
          enableUpdate={false}
          enableDelete={true}
          deleteFunction={handleDeleteCustomer}
          viewDoc={viewDocumentButton}
        />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>View Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
          <Button className='my-1' variant="secondary" onClick={() => handleDownload(doc1)}>
            Download Adhaar Card
          </Button>
          <Button className='my-1' variant="secondary" onClick={() => handleDownload(doc2)}>
              Download Pan Card
          </Button>
          <Button className='my-1' variant="secondary" onClick={() => handleDownload(doc3)}>
              Download Voter Card
          </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewCustomers;
