import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../../shared/table/Table';
import Pagination from '../../../shared/table/Pagination';
import { addEmployeeApi, deleteEmployeeApi, getEmployeesApi } from '../../../service/CustomerApis';

const ViewEmployees = () => {
  const token = localStorage.getItem("auth");
  const [employeeData, setEmployeeData] = useState([]);
  const [curPageNo, setCurPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(4); 
  const [employeeDto, setEmployeeDto] = useState({
    firstname: "",
    lastname: "",
    salary: 0.0,
    username: "",
    password: ""
  });

  const getEmployees = async () => {
    try {
      const response = await getEmployeesApi(token, curPageNo, size)

      console.log("inside getEmployees", response.data);

      const employeeDtoArray = response.data.content.map((employee) => ({
        employeeid: employee.employeeid,
        firstname: employee.firstname,
        lastname: employee.lastname,
        salary: employee.salary,
        username: employee.user.username,
        status: employee.userStatus.statusname
      }));

      setEmployeeData(employeeDtoArray);

      setCurPageNo(Math.min(curPageNo, response.data.totalPages));
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      getEmployees();
    }
  }, []);

  useEffect(() => {
    getEmployees();
  }, [curPageNo, size]);

  const handlePageChange = async (clickValue) => {
    if (clickValue === "prev" && curPageNo !== 1)
      setCurPageNo(curPageNo - 1);
    if (clickValue === "next" && curPageNo !== totalPages)
      setCurPageNo(curPageNo + 1);
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
  };

  const handleDeleteEmployee = async (employee) => {
    const employeeid = employee.employeeid;
    console.log("handleDeleteEmployee: ", employeeid, employee);
    if(employee.status !== 'active'){
      alert("This Employee is already deleted");
      return;
  }
    try {
      await deleteEmployeeApi(token, employeeid)
      getEmployees();
      alert(`Employee with ID ${employeeid} deleted successfully`);
    } catch (error) {
      console.log(`Error deleting employee with ID ${employeeid}:`, error);
    }
  };

  const addEmployee = async () => {
    if (
      !employeeDto.firstname ||
      !employeeDto.lastname ||
      isNaN(employeeDto.salary) ||
      !employeeDto.username ||
      !employeeDto.password
    ) {
      alert("All fields are required.");
      return;
    }
  
    if (employeeDto.salary <= 0) {
      alert("Salary should be a positive number.");
      return;
    }
    console.log(employeeDto.firstname);
    if (
      /[0-9]/.test(employeeDto.firstname) ||
      /[0-9]/.test(employeeDto.lastname) ||
      !/^[a-zA-Z]+$/.test(employeeDto.firstname) ||
      !/^[a-zA-Z]+$/.test(employeeDto.lastname)){
      alert("Scheme name should contain mixed case letters.");
      return;
    }
  
    try {
      const response = await addEmployeeApi(token, employeeDto);
      getEmployees();
      alert(`Employee added successfully with ID: ${response.data.employeeid}`);
    } catch (error) {
      console.log("Error adding employee:", error);
      alert("Error: Username already exists");
    }
  };

  const tableEmployeeHeaders = [
    "ID",
    "First Name",
    "Last Name",
    "Salary",
    "Username",
    "status"
  ];

   const handleAddEmployeeButton = () => {
        setEmployeeDto({
            firstname: "",
            lastname: "",
            salary: 0.0,
            username: "",
            password: ""
        })
   }

  const onChangeEmployeeDto = (e) => {
    e.preventDefault();
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setEmployeeDto({
        ...employeeDto,[e.target.id]: value
    });

  };

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
        <div className='col-md-4'>
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal" onClick={handleAddEmployeeButton}>
            Add Employee
          </button>
        </div>
      </div>
      <div className='table-container'>
        <Table
          headers={tableEmployeeHeaders}
          data={employeeData}
          enableUpdate={false} 
          enableDelete={true}
          deleteFunction={handleDeleteEmployee}
        />
      </div>

      <div className="modal" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabel">Add Employee</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {Object.keys(employeeDto).map((key, index) => (
                  <div className="mb-3 row" key={index}>
                    <label htmlFor={key} className="col-sm-3 col-form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                    <div className="col-sm-9">
                      <input
                        type={typeof employeeDto[key] === 'number' ? 'number' : 'text'}
                        step={typeof employeeDto[key] === 'number' ? '0.01' : '1'}
                        className="form-control"
                        id={key}
                        placeholder={key.replace(/_/g, ' ').toUpperCase()}
                        onChange={onChangeEmployeeDto}
                        value={employeeDto[key]}
                      />
                    </div>
                  </div>
                ))}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addEmployee}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployees;
