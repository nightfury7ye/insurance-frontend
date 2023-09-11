import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
// import './RegisterCustomer.css'
import { getAgentAPI } from '../../../service/AgentApis';

const AgentProfile = () => {

    
    const [agentId, setAgentId] = useState(localStorage.getItem("agentid"))
    const username = localStorage.getItem("username")
    const token = localStorage.getItem("auth")
 
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobilenumber: '',
    email: '',
    qualification: '',
    username: '',
    password: null
  });

  const getAgent = async () => {
    try {
      const response = await getAgentAPI(username);
      setFormData({
        ...formData,
        firstname:response.data.firstname,
        lastname:response.data.lastname ,
        mobilenumber:response.data.phoneno,
        email:response.data.email,
        qualification :response.data.qualification,
        username: response.data.user.username,
        // password: response.data.user.password
        
      })
      console.log("Agent data", response.data)
    } catch (error) {
      console.log("Error fetching agent:", error);
    }
  }

  useEffect(() => {
    getAgent();
  }, [])
  


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
   if(typeof formData.firstname == 'undefined' || formData.firstname == null ||
   typeof formData.lastname == 'undefined' || formData.lastname == null ||
   typeof formData.mobilenumber == 'undefined' || formData.mobilenumber == null ||
   typeof formData.email == 'undefined' || formData.email == null ||
   typeof formData.qualification == 'undefined' || formData.qualification == null ||
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
    const isValidMobileNumber = /^[0-9]{10}$/.test(formData.mobilenumber);
    if(! isValidMobileNumber){
    alert("Invalid Phone number")
      return;
    }
    const mailCheck = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    if(!mailCheck){ 
    alert("Invalid Email")
      return;
    }

   try {
    console.log("agentId", agentId);
    let response = await axios.put(`http://localhost:8080/insurance-app/users/agent/${username}`,{
    firstname: formData.firstname,
    lastname: formData.lastname,
    phoneno: formData.mobilenumber,
    email: formData.email,
    qualification: formData.qualification,
    user:{
        username: formData.username,
        password: formData.password
    },
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    )
    alert("Agent Updated Successfully")
   } catch (error) { 
    alert("Error in updating")
    console.log(error);
    return;
   }
    
  };


  return (
   <>
    <div className='main-card my-5'>
      <h1 className='text-center'>Agent Profile</h1>
      <div className=''>
      <hr></hr>
      <form  >
        <div  className="name-inputs"> 
          <input type="text" name="firstname" value={formData.firstname}  placeholder="First Name" onChange={handleInputChange} /><br />
          <input type="text" name="lastname" value={formData.lastname}  placeholder="Last Name" onChange={handleInputChange} /><br /> 
        </div>

        <div  className="name-inputs"> 
          <input type="tel" name="mobilenumber" value={formData.mobilenumber}  placeholder="Contact Number" onChange={handleInputChange}  /><br />
          <input type="email" name="email" value={formData.email}  placeholder="Email" onChange={handleInputChange} /><br />
        </div>

        <div  className="name-inputs"> 
          <input type="text" name="qualification" value={formData.qualification}  placeholder="Qualification" onChange={handleInputChange}  /><br />
        </div>


        <div  className="name-inputs"> 
          <input type="text" name="username" value={formData.username}   placeholder="Username" onChange={handleInputChange}  /><br />
          <input name="password" value={formData.password}   placeholder="Password" onChange={handleInputChange}  /><br />
        </div>
        
      </form>
      <button style={{marginLeft:'40%'}} className='button' type="submit" onClick={handleSubmit}>Save</button>
      </div>
    </div>
    
    </>
  )
}


export default AgentProfile