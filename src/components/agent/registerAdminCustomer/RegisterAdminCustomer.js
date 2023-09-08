import axios from 'axios';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import './RegisterCustomer.css'

const IndianStates = [

    "Andhra Pradesh", "Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
    "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya", "Mizoram","Nagaland", "Odisha",
    "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana", "Tripura","Uttar Pradesh", "Uttarakhand","West Bengal", 
    "Andaman and Nicobar Islands","Dadra and Nagar Haveli and Daman and Diu","Lakshadweep","Delhi","Puducherry",
  
];

const RegisterAdminCustomer = ({agentid}) => {

    const [aadharCard, setAadharCard] = useState(null);
    const [panCard, setPanCard] = useState(null);
    const [voterCard, setVoterCard] = useState(null);
    const [customerId, setCustomerId] = useState()
 
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobilenumber: '',
    email: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
    nominee: '',
    nomineerelation: '',
    username: '',
    password: ''
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
   if(typeof formData.firstname == 'undefined' || formData.firstname == null ||
   typeof formData.lastname == 'undefined' || formData.lastname == null ||
   typeof formData.mobilenumber == 'undefined' || formData.mobilenumber == null ||
   typeof formData.email == 'undefined' || formData.email == null ||
   typeof formData.address == 'undefined' || formData.address == null ||
   typeof formData.state == 'undefined' || formData.state == '' ||
   typeof formData.city == 'undefined' || formData.city == null ||
   typeof formData.pincode == 'undefined' || formData.pincode == null ||
   typeof formData.nominee == 'undefined' || formData.nominee == null ||
   typeof formData.nomineerelation == 'undefined' || formData.nomineerelation == null ||
   typeof formData.username == 'undefined' || formData.username == null ||
   typeof formData.password == 'undefined' || formData.password == null
  )
  {
    // Swal.fire({  
    //   title: "Fields are empty",
    //   text: "Please fill the fields",
    //   icon: "error",
    //   confirmButtonText: "OK", 
    // });
    alert("Feilds are empty")
    return;  
    }
    if(aadharCard == null || panCard == null || voterCard == null){
    alert("Document Missing")
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

    const cityPattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidcity = cityPattern.test(formData.city);
    if(!isValidcity){
    alert("Invalid City") 
        return;
    }

    const nomineePattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidnominee = nomineePattern .test(formData.nominee);
    if(!isValidnominee){
    alert("Invalid Nominee Name")
        return;
    }

    const nomineeRelationPattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidnomineeRelation = nomineeRelationPattern .test(formData.nomineerelation);
    if(!isValidnomineeRelation){
        alert("Invalid Nominee Relation")
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

    const isValidPincode = /^[0-9]{6}$/.test(formData.pincode);
    if(! isValidPincode){
    alert("Invalid Pin Code")  
      return;
    }
   try {
    let response = await axios.post(`http://localhost:8080/insurance-app/users/customer`,{
    firstname: formData.firstname,
    lastname: formData.lastname,
    user:{
        username: formData.username,
        password: formData.password
    },
    email: formData.email,
    phoneno: formData.mobilenumber,
    documentStatus: "Pending",
    address:{
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
    },
    nominee:{
        nomineename: formData.nominee,
        nomineeRelation: formData.nomineerelation,
    }
    })
    setCustomerId(response.data.customerid)
    let customeridvar = response.data.customerid;

    console.log(response.data)
    await uploadDocuments(aadharCard, customeridvar)
    await uploadDocuments(panCard, customeridvar)
    await uploadDocuments(voterCard, customeridvar)
    alert("Customer Registered Successfully")
   } catch (error) { 
    alert("Error in registering")
    console.log(error);
    return;
   }
    
    
  };

  const handleAadhar = (event) =>{
    setAadharCard(event.target.files[0]);
  }
  const handlePan = (event) =>{
    setPanCard(event.target.files[0]);
  }
  const handleVoter = (event) =>{
    setVoterCard(event.target.files[0]);
  }

  const uploadDocuments = async (file, customeridvariable) =>{
    if(file == null){
    //   Swal.fire({  
    //     title: "Document missing",
    //     text: "Please upload all documents",
    //     icon: "error",
    //     confirmButtonText: "OK", 
    //   });  
    alert("Document Missing")
      return;
    }
    const form = new FormData();
    form.append('file', file);

    try {
      console.log("customer id: ",customerId);
      const response = await fetch(`http://localhost:8080/insurance-app/customer/document/upload/${customeridvariable}`, {
        method: 'POST',
        body: form,
      });

      // Handle the response from the server as needed
      console.log('Upload successful:', response);
     
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    
  }

  return (
   <>
    <div className='main-card my-5'>
      <h1 className='text-center'>Customer Registration Form</h1>
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
        
        <select name="state" value={formData.state}  onChange={handleInputChange} >
          <option value="" disabled>Select Your state</option>
          {IndianStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select><br />
        
        </div>

        <div  className="name-inputs"> 
        <input type="text" name="city" value={formData.city}   placeholder="City" onChange={handleInputChange} /><br />

        {/* <label>Pincode:</label> */}
        <input type="number" name="pincode" value={formData.pincode}   placeholder="Pincode" onChange={handleInputChange}/><br />
        </div>

        
        {/* <label>Nominee:</label> */}
        <div  className="name-inputs"> 
        <input type="text" name="nominee" value={formData.nominee}   placeholder="Nominee" onChange={handleInputChange}  /><br />

        {/* <label>Nominee Relation:</label> */}
        <input type="text" name="nomineerelation" value={formData.nomineerelation}   placeholder="Nominee Relation" onChange={handleInputChange}  /><br />
        </div>


        <div  className="name-inputs"> 
        <input type="text" name="username" value={formData.username}   placeholder="Username" onChange={handleInputChange}  /><br />

        <input name="password" value={formData.password}   placeholder="Password" onChange={handleInputChange}  /><br />
        </div>
        <div  className="name-inputs"> 

        <textarea name="address" value={formData.address}   placeholder="Address"  onChange={handleInputChange} rows="2" ></textarea><br />
        
        </div>
        <hr></hr><br></br>
        <h2>Upload Documents</h2><br></br>
        <div className=''>
          <div className=''>
          <Form.Label>Aadhar Card</Form.Label><br></br>
          <input type="file" onChange={handleAadhar} />
          </div>
          <div className=''>
          <Form.Label>Pan Card</Form.Label><br></br>
          <input type="file" onChange={handlePan} /> 
          </div>
          <div className=''>
          <Form.Label>Voter Card</Form.Label><br></br>
          <input type="file" onChange={handleVoter} /> 
          </div>
          
        </div>
  
        
      </form>
      <button style={{marginLeft:'40%'}} className='button' type="submit" onClick={handleSubmit}>Register</button>
      </div>
    </div>
    
    </>
  )
}

export default RegisterAdminCustomer
