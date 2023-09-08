import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
// import './RegisterCustomer.css'
import { getEmployeeAPI } from '../../../service/EmployeeApis';

const EmployeeProfile = () => {

    const employeeId = localStorage.getItem("employeeid")
    const username = localStorage.getItem("username")
 
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    password: null
  });

  const getEmployee = async () => {
    try {
      console.log(employeeId);
      const response = await getEmployeeAPI(employeeId);
      setFormData({
        ...formData,
        firstname:response.data.firstname,
        lastname:response.data.lastname ,
        username: response.data.user.username,
        // password: response.data.user.password
        
      })
      console.log("Employee data", response.data)
    } catch (error) {
      console.log("Error fetching employees:", error);
    }
  }

  useEffect(() => {
    getEmployee();
  }, [])
  


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
   if(typeof formData.firstname == 'undefined' || formData.firstname == null ||
   typeof formData.lastname == 'undefined' || formData.lastname == null ||
   typeof formData.username == 'undefined' || formData.username == null 
  //  typeof formData.password == 'undefined' || formData.password == null
  )
  {
    alert("Feilds are empty")
    return;  
  }
    const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidfirstName = namePattern.test(formData.firstname);
    if(!isValidfirstName){
        alert("Invalid First Name")
        return;
    }
    const isValidlastName = namePattern.test(formData.lastname);
    if(!isValidlastName){  
        alert("Invalid Last Name")
        return;
    }

   try {
    console.log("employeeId", employeeId);
    let response = await axios.put(`http://localhost:8080/insurance-app/users/employee/${employeeId}`,{
    firstname: formData.firstname,
    lastname: formData.lastname,
    user:{
        username: formData.username,
        password: formData.password
    }
    })
    alert("Customer Updated Successfully")
   } catch (error) { 
    alert("Error in updating")
    console.log(error);
    return;
   }
    
  };


  return (
   <>
    <div className='main-card my-5'>
      <h1 className='text-center'>Employee Profile</h1>
      <div className=''>
      <hr></hr>
      <form  >
        <div  className="name-inputs"> 
         <input type="text" name="firstname" value={formData.firstname}  placeholder="First Name" onChange={handleInputChange} /><br />
        <input type="text" name="lastname" value={formData.lastname}  placeholder="Last Name" onChange={handleInputChange} /><br /> 
        </div>

        <div  className="name-inputs"> 
        <input type="text" name="username" value={formData.username}   placeholder="Username" onChange={handleInputChange}  /><br />

        <input name="password" value={formData.password}   placeholder="Password" onChange={handleInputChange}  /><br />
        </div>
        <div  className="name-inputs"> 

        <textarea name="address" value={formData.address}   placeholder="Address"  onChange={handleInputChange} rows="2" ></textarea><br />
        
        </div>
  
        
      </form>
      <button style={{marginLeft:'40%'}} className='button' type="submit" onClick={handleSubmit}>Save</button>
      </div>
    </div>
    
    </>
  )
}


export default EmployeeProfile