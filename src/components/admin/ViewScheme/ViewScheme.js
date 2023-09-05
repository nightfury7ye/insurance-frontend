import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Table from '../../../shared/table/Table';
import Pagination from '../../../shared/table/Pagination';
import axios from 'axios';
import { getschemes } from '../../../service/CustomerApis';
import { addSchemeApi, updatePlanApi } from '../../../service/AdminApis';

const ViewScheme = ({planid, setPlanid}) => {
    const location = useLocation();
    const [schemeData, setSchemeData] = useState([])
    const [schemeid, setSchemeid] = useState()
    const navigate = useNavigate();
    const token = localStorage.getItem("auth")
    const [schemeDto, setSchemeDto] = useState({
        scheme_name: "",
        discription: "",
        min_amount: 0.0,
        max_amount: 0.0,
        min_invest_time: 0,
        max_invest_time: 0,
        min_age: 0,
        max_age: 0,
        profit_ratio: 0,
        registrationcommratio: 0,
        installmentcommratio: 0,
        status: 1
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
        let response = await axios.delete(`http://localhost:8080/adminapp/delete_insurance_scheme/${schemeid}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        getschemesData()
        alert(`scheme deleted successfully`)
    }

    const addScheme = async () => {
        let response = await addSchemeApi(schemeDto, planid, token)
            getschemesData()
            // setSchemename("")
        alert(`Scheme added successfully`)
    }

    const updateScheme = async () => {
        try {
            let response = await updatePlanApi(schemeid, schemeDto, token)
            getschemesData()
            setSchemeid()
        } catch (error) {
            console.log(`Error deleting ${schemeDto.scheme_name}:`, error);
            alert(`Error deleting ${schemeDto.scheme_name}:`)
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
            scheme_name: schemeObject.scheme_name,
            discription: schemeObject.schemeDetails.discription,
            min_amount: schemeObject.schemeDetails.min_amount,
            max_amount: schemeObject.schemeDetails.max_amount,
            min_invest_time: schemeObject.schemeDetails.min_invest_time,
            max_invest_time: schemeObject.schemeDetails.max_invest_time,
            min_age: schemeObject.schemeDetails.min_age,
            max_age: schemeObject.schemeDetails.max_age,
            profit_ratio: schemeObject.schemeDetails.profit_ratio,
            registrationcommratio: schemeObject.schemeDetails.registrationcommratio,
            // installmentcommratio: schemeObject.schemeDetails.installmentcommratio,
            status: schemeObject.status.statusid
        });
    }
    const refreshScheme = () => {
        setSchemeDto({
            scheme_name: "",
            discription: "",
            min_amount: 0.0,
            max_amount: 0.0,
            min_invest_time: 0,
            max_invest_time: 0,
            min_age: 0,
            max_age: 0,
            profit_ratio: 0,
            registrationcommratio: 0,
            // installmentcommratio: 0,
            status: 1
        })
    }
    const tableAccountHeaders = ["ID", 
                                "scheme name", 
                                "discription",
                                "min amount", 
                                "max amount", 
                                "min policy term", 
                                "max policy term", 
                                "min age",
                                "max age",
                                "profit ratio",
                                "registration comm ratio",
                                // "installment comm ratio",
                                "status"]
    console.log(planid);
  return (
    <div className='row align-items-center justify-content-center' >
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
        <div className='col' style={{marginTop: '3rem'}}>
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
