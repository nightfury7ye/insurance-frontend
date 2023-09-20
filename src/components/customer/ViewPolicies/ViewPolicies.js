import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from '../../../shared/table/Table';
import './ViewPolicies.css';
import Pagination from '../../../shared/table/Pagination';
import { getPoliciesApi } from '../../../service/CustomerApis';

const ViewPolicies = ({setPolicyDetailsGlobal, moduleNameSetter}) => {
  const token = localStorage.getItem("auth");
  const customerid = localStorage.getItem("customerid");
  const [policyData, setPolicyData] = useState([]);
  const [curPageNo, setCurPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(4); 

  const getPolicies = async () => {
    try {
      console.log(curPageNo, size);
      const response = await getPoliciesApi(token, customerid, curPageNo, size)

      console.log("inside getPolicies", response, size);

      const policyDtoArray = response.data.content.map((policy) => ({
        policyno: policy.policyno,
        issuedate: policy.issuedate,
        maturitydate: policy.maturitydate,
        premiumamount: policy.premiumamount,
        sumassured: policy.sumassured,
        // installmentType: policy.installmentType.typeid,
        scheme_name: policy.insuranceScheme.scheme_name,
      }));

      setPolicyData(policyDtoArray);

      setCurPageNo(Math.min(curPageNo, response.data.totalPages));
      setTotalPages(response.data.totalPages);
      console.log("SIZE AND PAGE: ", Math.min(curPageNo, response.data.totalPages),response.data.totalPages );
    } catch (error) {
      console.log("Error fetching policies:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      getPolicies();
    }
  }, []);

  useEffect(() => {
    getPolicies();
  }, [curPageNo, size]);

  const handlePageChange = async (clickValue) => {
    if (clickValue === "prev" && curPageNo !== 1)
      setCurPageNo(curPageNo - 1);
    if (clickValue === "next" && curPageNo !== totalPages)
      setCurPageNo(curPageNo + 1);
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    console.log(typeof newSize, newSize);
    setCurPageNo(1)
    setSize(newSize);
  };

  const viewDetails = async (policy) => {
    console.log("viewDetails: ",policy)
    setPolicyDetailsGlobal(policy)
    moduleNameSetter("view_policy_details")
}

  const viewMore = (objectValue) => {
    return(
        <>
        <button className="btn btn-secondary mb-3" onClick={() => {viewDetails(objectValue)}}>View More</button>
        </>
    )
}

  const tablePolicyHeaders = [
    "policyno",
    "issuedate",
    "maturitydate",
    "premium amount",
    "sum assured",
    // "installment Type",
    "scheme"
  ];

  const containerStyle = {
    padding: '2rem',
    height: '715px',
    borderRadius: '10px',
    overflow: 'scroll',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}

  return (
    <div className='main-card' style={containerStyle}>
      <div className='row'>
        <div className='col-md-4'>
          <label htmlFor="pageSizeDropdown">Items per page:</label>
          <select
            id="pageSizeDropdown"
            value={size}
            onChange={handleSizeChange}
            className='form-select'
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
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
          headers={tablePolicyHeaders}
          data={policyData}
          enableUpdate={false}
          enableDelete={false}
          extraFunction={viewMore}
        />
      </div>
    </div>
  );
};



export default ViewPolicies
