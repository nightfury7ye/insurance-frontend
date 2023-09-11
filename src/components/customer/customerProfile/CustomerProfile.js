import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
// import './RegisterCustomer.css'
import { getCustomerAPI } from '../../../service/CustomerApis';

const IndianStates = [

    "Andhra Pradesh", "Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
    "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya", "Mizoram","Nagaland", "Odisha",
    "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana", "Tripura","Uttar Pradesh", "Uttarakhand","West Bengal", 
    "Andaman and Nicobar Islands","Dadra and Nagar Haveli and Daman and Diu","Lakshadweep","Delhi","Puducherry",
  
];

const CustomerProfile = () => {

    const [aadharCard, setAadharCard] = useState(null);
    const [panCard, setPanCard] = useState(null);
    const [voterCard, setVoterCard] = useState(null);
    const [customerId, setCustomerId] = useState(localStorage.getItem("customerid"))
    const username = localStorage.getItem("username")
 
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mobilenumber: '',
    email: '',
    address: '',
    state: '',
    dob:'',
    city: '',
    pincode: '',
    nominee: '',
    nomineerelation: '',
    username: '',
    password: null
  });

  const getcustomer = async () => {
    try {
      const response = await getCustomerAPI(username);
      setFormData({
        ...formData,
        firstname:response.data.firstname,
        lastname:response.data.lastname ,
        mobilenumber :response.data.phoneno,
        email:response.data.email,
        address:response.data.address.address,
        state:response.data.address.state,
        dob:response.data.dob,
        city :response.data.address.city,
        pincode:response.data.address.pincode,
        nominee :response.data.nominee.nomineename,
        nomineerelation :response.data.nominee.nomineeRelation,
        username: response.data.user.username,
        // password: response.data.user.password
        
      })
      console.log("customer data", response.data)
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  }

  useEffect(() => {
    getcustomer();
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
   typeof formData.address == 'undefined' || formData.address == null ||
   typeof formData.state == 'undefined' || formData.state == '' ||
   typeof formData.dob == 'undefined' || formData.dob == '' ||
   typeof formData.city == 'undefined' || formData.city == null ||
   typeof formData.pincode == 'undefined' || formData.pincode == null ||
   typeof formData.nominee == 'undefined' || formData.nominee == null ||
   typeof formData.nomineerelation == 'undefined' || formData.nomineerelation == null ||
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

    const cityPattern = /^[A-Za-z][A-Za-z\s]*$/;
    const isValidcity = cityPattern.test(formData.city);
    if(!isValidcity){
    alert("Invalid City") 
        return;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const isValidDate = datePattern.test(formData.dob);
    if(!isValidDate){
      alert('Please Enter Valid Date');
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
    console.log("customerId", customerId);
    let response = await axios.put(`http://localhost:8080/insurance-app/users/customer/${customerId}`,{
    firstname: formData.firstname,
    lastname: formData.lastname,
    user:{
        username: formData.username,
        password: formData.password
    },
    email: formData.email,
    phoneno: formData.mobilenumber,
    dob: formData.dob,
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
    alert("Customer Updated Successfully")
   } catch (error) { 
    alert("Error in updating")
    console.log(error);
    return;
   }
    
  };

  const containerStyle = {
    padding: '2rem',
    paddingBottom: '5rem',
    height: '715px',
    borderRadius: '10px',
    overflow: 'scroll',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}


  return (
   <>
    <div className='main-card my-5' style={containerStyle}>
      <h1 className='text-center'>Customer Profile</h1>
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
        
        <select name="state" value={formData.state}  onChange={handleInputChange}>
          <option value="" disabled>Select Your state</option>
          {IndianStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select><br />
        
        <input type="text" name="DOB" value={formData.dob}   placeholder="DOB" onChange={handleInputChange} /><br />
        </div>

        <div  className="name-inputs"> 
          <input type="text" name="city" value={formData.city}   placeholder="City" onChange={handleInputChange} /><br />
          <input type="number" name="pincode" value={formData.pincode}   placeholder="Pincode" onChange={handleInputChange}/><br />
        </div>

        <div  className="name-inputs"> 
          <input type="text" name="nominee" value={formData.nominee}   placeholder="Nominee" onChange={handleInputChange}  /><br />
          <input type="text" name="nomineerelation" value={formData.nomineerelation}   placeholder="Nominee Relation" onChange={handleInputChange}  /><br />
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


export default CustomerProfile