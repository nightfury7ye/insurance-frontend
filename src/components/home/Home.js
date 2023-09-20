import React, { useEffect, useState } from 'react';
import './HomePage.css';
import LifeInsuranceImage from '../../assets/images/life_insurance1.jpg';
import HealthInsuranceImage from '../../assets/images/health_insurance1.jpg';
import LongTermInsuranceImage from '../../assets/images/long_term.jpg';
import Person1 from '../../assets/images/person1.jpg';
import Person2 from '../../assets/images/person2.jpg';
import Person3 from '../../assets/images/person3.jpg';
import { useNavigate } from 'react-router-dom';
import CustomerViewPlans from '../customer/CustomerViewPlans/CustomerViewPlans';
import CustomerViewSchemes from '../customer/CustomerViewSchemes/CustomerViewSchemes';
import SchemeDetails from '../customer/SchemeDetails/SchemeDetails';

function Home() {  
  let navigation = useNavigate()
  
const [moduleName, setModuleName] = useState("home");
const [planid, setPlanid] = useState()
const [schemeDto, setSchemeDto] = useState()
const [policyDetailsGlobal, setPolicyDetailsGlobal] = useState()

const handleNav = (value) => {
  // navigation(`/${value}`)
  setModuleName(value)
}

useEffect(() => {
  if(localStorage.getItem('auth')){
    localStorage.clear()
  }
  console.log("Outside effect");
},[])

  return (
    <div className="home-page">
      <div>
          <nav className="navbar navbar-expand-lg bg-light px-4">
              <div className="container-fluid">
                  <h1>E-INSURANCE</h1> 
                  {/* <a className="navbar-brand" >{role}</a> */}
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                      <button className="btn" type="button" onClick={() => handleNav('home')}>Home</button>                      
                      </li>
                      <li className="nav-item">
                          <button className="btn" type="button" onClick={() => handleNav('view_plan')}>View Plans</button>
                      </li>
                  </ul>
                  <form className="d-flex">
                      <button className="btn btn-outline-success" onClick={() => {
                      localStorage.clear()
                      navigation('/login')
                      }}>Login</button>
                  </form>
                  </div>
              </div>
          </nav>
      </div>
      {moduleName === "home" &&
      <div>
      <section className="hero">
        <div className="hero-content">
          <h2>Protecting Your Loved Ones</h2>
          <p>Ensure a secure future with our life insurance plans.</p>
        </div>
      </section>
      <section className="services">
        <h2>Our Services</h2>
        <div className="service">
        <div>
          <img src={LifeInsuranceImage} alt="Life Insurance" />
          <h3>Term Insurance Plans</h3>
          <p>"Term insurance protects your family’s financial future if something were to happen to you."</p>
        </div>
        <div>
          <img src={LongTermInsuranceImage} alt="Life Insurance" />
          <h3>Whole Life Insurance Plans</h3>
          <p>"A whole life insurance plan is a life insurance policy that gives you life coverage for 99 years."</p>
        </div>
        <div>
          <img src={HealthInsuranceImage} alt="Life Insurance" />
          <h3>Health Insurance Plan</h3>
          <p>"Secure your well-being with our comprehensive Health Insurance coverage, because your health matters."</p>
        </div>
        </div>
      </section>
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className='testimonial-container'>
            <div className="testimonial">
            <img src={Person1} alt="Customer 1" />
            <p>"This Life Insurance has given me peace of mind knowing my family is protected."</p>
            <p className="testimonial-author">- Sarah Johnson</p>
            </div>
            <div className="testimonial">
            <img src={Person2} alt="Customer 2" />
            <p>"I highly recommend this Insurance for their excellent service and support."</p>
            <p className="testimonial-author">- John Doe</p>
            </div>
            <div className="testimonial">
            <img src={Person3} alt="Customer 3" />
            <p>"By far the most hassle free insurance service"</p>
            <p className="testimonial-author">- Priyanka Khadse</p>
            </div>
        </div>
      </section>
      </div>
      }
        {moduleName === "view_plan" &&
        <CustomerViewPlans moduleNameSetter = {setModuleName} setSchemePlanid={setPlanid}/>
        }

        {moduleName === "view_scheme" && planid != undefined &&
        <CustomerViewSchemes planid = {planid} moduleNameSetter = {setModuleName} setSchemeDto = {setSchemeDto}/>
        }

        {moduleName === "scheme_details" && schemeDto != undefined &&
        <SchemeDetails
        schemeDto = {schemeDto} 
        setSchemeDto = {setSchemeDto} 
        moduleNameSetter = {setModuleName}
        setPolicyDetailsGlobal={setPolicyDetailsGlobal}/>
        }
    </div>
  );
}

export default Home
