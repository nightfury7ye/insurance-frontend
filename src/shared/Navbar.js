import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = ({role}) => {
    let navigation = useNavigate()
    
  if(role == "admin"){
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light px-4">
            <div className="container-fluid">
                <h1>E-INSURANCE</h1> 
                {/* <a className="navbar-brand" >{role}</a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0"></ul>
                <form className="d-flex">
                    <button className="btn btn-outline-success" onClick={() => {
                    localStorage.clear()
                    navigation('/')
                    }}>Logout</button>
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-light px-4">
        <div className="container-fluid">
                <h1>E-INSURANCE</h1>
                {/* <a className="navbar-brand" >{role}</a> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-5 me-auto mb-2 mb-lg-0"></ul>
                <form className="d-flex">
                    <button className="btn btn-outline-success" onClick={() => {
                    localStorage.clear()
                    navigation('/')
                    }}>Logout</button>
                </form>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
