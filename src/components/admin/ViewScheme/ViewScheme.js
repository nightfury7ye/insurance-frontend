import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../../../shared/table/Table';
import Pagination from '../../../shared/table/Pagination';
import axios from 'axios';
import { getschemes } from '../../../service/CustomerApis';
import { addSchemeApi, updatePlanApi, updateSchemeApi } from '../../../service/AdminApis';

const ViewScheme = ({planid, setPlanid}) => {
    const location = useLocation();
    const [schemeData, setSchemeData] = useState([])
    const [schemeid, setSchemeid] = useState()
    const navigate = useNavigate();
    const token = localStorage.getItem("auth")
    const [schemeDto, setSchemeDto] = useState({
        scheme_name: "",
        description: "",
        min_amount: 0.0,
        max_amount: 0.0,
        min_invest_time: 0,
        max_invest_time: 0,
        min_age: 0,
        max_age: 0,
        profit_ratio: 0,
        registration_commission_ratio: 0,
        installmentcommratio: 0,
        // status: 1
    })

    const getschemesData = async () => {
        console.log("planid: ",planid);
        try{
        let response = await getschemes(token, planid);
        console.log("inside getschemes",response.data);
        setSchemeData(response.data)
        } catch (error) {
            console.log(`Error loading list ${planid}:`, error);
        }
    }

    useEffect(() => {
        if(localStorage.getItem('auth')){
            getschemesData();
        }
    },[])

    const deleteScheme = async (scheme) => {
        console.log("scheme: ", scheme);
        const schemeid = scheme.schemeid;
        if(scheme.status.statusname !== 'active'){
            alert("This Scheme is already deleted");
            return;
        }
        let response = await axios.post(`http://localhost:8080/insurance-app/insurance-scheme/${schemeid}/${2}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        getschemesData()
        alert(`scheme deleted successfully`)
    }

    const addScheme = async () => {
        if (!schemeDto.scheme_name || !schemeDto.description) {
            alert("Scheme name and description are required fields.");
            return;
        }

        if (schemeDto.min_age >= schemeDto.max_age) {
            alert("Minimum age should be less than Maximum age.");
            return;
        }

        if (schemeDto.min_amount >= schemeDto.max_amount) {
            alert("Minimum amount should be less than Maximum amount.");
            return;
        }

        if (schemeDto.min_invest_time >= schemeDto.max_invest_time) {
            alert("Minimum investment time should be less than Maximum investment time.");
            return;
        }

        if (schemeDto.registration_commission_ratio < 2 || schemeDto.registration_commission_ratio > 15) {
            alert("Registration Commission Ratio should be between 2 and 15.");
            return;
        }
        if (schemeDto.profit_ratio < 0 && schemeDto.profit_ratio > 20) {
            alert("Profit Ratio should be in 0 to 20 range number.");
            return;
          }
        
          if (
            isNaN(schemeDto.min_amount) ||
            isNaN(schemeDto.max_amount) ||
            isNaN(schemeDto.profit_ratio) ||
            schemeDto.min_amount < 0 ||
            schemeDto.max_amount < 0
          ) {
            alert("Amount fields and Profit Ratio should be numeric values.");
            return;
          }
        
          if (
            !Number.isInteger(schemeDto.min_invest_time) ||
            !Number.isInteger(schemeDto.max_invest_time) ||
            schemeDto.min_invest_time < 0 ||
            schemeDto.max_invest_time < 0
          ) {
            alert("Investment time fields should be positive integers.");
            return;
          }
          if (
            !/[a-zA-Z]/.test(schemeDto.scheme_name)) {
            alert("Scheme name should contain mixed case letters.");
            return;
          }

          try {
            let response = await addSchemeApi(schemeDto, planid, token);
            getschemesData();
            alert("Scheme added successfully");
          } catch (error) {
            if(error.response.data){
                alert(error.response.data)
            }
          }
    }
    

    const updateScheme = async () => {
        if (!schemeDto.scheme_name || !schemeDto.description) {
            alert("Scheme name and description are required fields.");
            return;
        }

        if (schemeDto.min_age >= schemeDto.max_age) {
            alert("Minimum age should be less than Maximum age.");
            return;
        }

        if (schemeDto.min_age < 0) {
            alert("Minimum age should be Greater than Zero.");
            return;
        }

        if (schemeDto.min_amount >= schemeDto.max_amount) {
            alert("Minimum amount should be less than Maximum amount.");
            return;
        }

        if (schemeDto.min_invest_time >= schemeDto.max_invest_time) {
            alert("Minimum investment time should be less than Maximum investment time.");
            return;
        }

        if (schemeDto.registration_commission_ratio < 2 || schemeDto.registration_commission_ratio > 15) {
            alert("Registration Commission Ratio should be between 2 and 15.");
            return;
        }
        console.log("profit: ", schemeDto.profit_ratio);
        if (schemeDto.profit_ratio < 0 || schemeDto.profit_ratio > 20) {
            alert("Profit Ratio should be in 0 to 20 range number.");
            return;
          }
        
          if (
            isNaN(schemeDto.min_amount) ||
            isNaN(schemeDto.max_amount) ||
            isNaN(schemeDto.profit_ratio) ||
            schemeDto.min_amount < 0 ||
            schemeDto.max_amount < 0
          ) {
            alert("Amount fields and Profit Ratio should be numeric values.");
            return;
          }
        
          if (
            !Number.isInteger(schemeDto.min_invest_time) ||
            !Number.isInteger(schemeDto.max_invest_time) ||
            schemeDto.min_invest_time < 0 ||
            schemeDto.max_invest_time < 0
          ) {
            alert("Investment time fields should be positive integers.");
            return;
          }
          if (
            !/[a-zA-Z]/.test(schemeDto.scheme_name)) {
            alert("Scheme name should contain Only Letters.");
            return;
          }
        try {
            let response = await updateSchemeApi(schemeid, schemeDto, token)
            alert(`update successfull ${schemeDto.scheme_name}`)
            getschemesData()
            setSchemeid()
        } catch (error) {
            console.log(`Error updating ${schemeDto.scheme_name}:`, error);
            alert(`Error updating ${schemeDto.scheme_name}`)
        }
    }

    const onChangeSchemeDto = (e) => {
        e.preventDefault();
        const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
        setSchemeDto({
            ...schemeDto,[e.target.id]: value
        });
        console.log(e.target.name, e.target.value, value);
    }

    const onClickUpdateHandler = (schemeObject) => {
        console.log(schemeObject.schemeid);
        setSchemeid(schemeObject.schemeid)
        setSchemeDto({
            scheme_name: schemeObject.schemename,
            description: schemeObject.schemeDetails.discription,
            min_amount: schemeObject.schemeDetails.min_amount,
            max_amount: schemeObject.schemeDetails.max_amount,
            min_invest_time: schemeObject.schemeDetails.min_invest_time,
            max_invest_time: schemeObject.schemeDetails.max_invest_time,
            min_age: schemeObject.schemeDetails.min_age,
            max_age: schemeObject.schemeDetails.max_age,
            profit_ratio: schemeObject.schemeDetails.profit_ratio,
            registration_commission_ratio: schemeObject.schemeDetails.registrationcommratio,
            // status: schemeObject.status.statusid
        });
    }
    const refreshScheme = () => {
        setSchemeDto({
            scheme_name: "",
            description: "",
            min_amount: 0.0,
            max_amount: 0.0,
            min_invest_time: 0,
            max_invest_time: 0,
            min_age: 0,
            max_age: 0,
            profit_ratio: 0,
            registration_commission_ratio: 0,
            // status: 1
        })
    }
    const tableAccountHeaders = ["ID", 
                                "scheme name", 
                                "description",
                                "min amount", 
                                "max amount", 
                                "min policy term", 
                                "max policy term", 
                                "min age",
                                "max age",
                                "profit ratio",
                                "commission ratio",
                                // "installment comm ratio",
                                "status"]
    console.log(planid);
    const containerStyle = {
        maxHeight: '715px',
        borderRadius: '10px',
        margin: '25px',
        overflow: 'scroll',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }

  return (
    <div className='row align-items-center justify-content-center' style={containerStyle}>
        <div className="modal" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">Add scheme</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form>
                        {
                        Object.keys(schemeDto).map((key, index) => (
                            <div className="mb-3 row" key={index}>
                                <label htmlFor={key} className="col-sm-3 col-form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                                <div className="col-sm-9">
                                    <input
                                        type={typeof schemeDto[key] === 'number' ? 'number' : 'text'}
                                        step={typeof schemeDto[key] === 'number' && key.includes('_amount') ? '0.01' : '1'}
                                        className="form-control"
                                        id={key}
                                        placeholder={key.replace(/_/g, ' ').toUpperCase()}
                                        onChange={onChangeSchemeDto}
                                        value={schemeDto[key]}
                                    />
                                </div>
                            </div>
                        ))}
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addScheme}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateModalLabel">Update scheme</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    <form>
                        {Object.keys(schemeDto).map((key, index) => (
                            <div className="mb-3 row" key={index}>
                                <label htmlFor={key} className="col-sm-3 col-form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                                <div className="col-sm-9">
                                    <input
                                        type={typeof schemeDto[key] === 'number' ? 'number' : 'text'}
                                        step={typeof schemeDto[key] === 'number' && key.includes('_amount') ? '0.01' : '1'}
                                        className="form-control"
                                        id={key}
                                        placeholder={key.replace(/_/g, ' ').toUpperCase()}
                                        onChange={onChangeSchemeDto}
                                        value={schemeDto[key]}
                                    />
                                </div>
                            </div>
                        ))}
                    </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateScheme}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        <div className='col mx-3' style={{marginTop: '3rem'}}>
            <div className='float-end mx-5'><button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addModal" onClick={refreshScheme}>Add Scheme</button></div>
            <Table
            headers={tableAccountHeaders}
            data={schemeData}
            enableUpdate={true}
            enableDelete={true}
            updateFunction={onClickUpdateHandler}
            deleteFunction ={deleteScheme}
            />
        </div>
    </div>
  )
}

export default ViewScheme
