import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '../../../shared/table/Table'
import { useHistory, useNavigate } from "react-router-dom"
import { getplans } from '../../../service/CustomerApis'
import { addPlanApi, deletePlanApi, updatePlanApi } from '../../../service/AdminApis'

const ViewPlans = ({moduleNameSetter, setSchemePlanid}) => {
    const [plansData, setPlansData] = useState([])
    const [schemeData, setSchemeData] = useState([])
    const [planname, setPlanname] = useState()
    const [planid, setPlanid] = useState()
    const [statusname, setStatusname]= useState()
    const token = localStorage.getItem("auth")
    const navigate = useNavigate();

    const getplansData = async () => {
        let response = await getplans();
        console.log("inside getplans",response.data);
        setPlansData(response.data)
    }

    useEffect(() => {
        if(localStorage.getItem('auth')){
            getplansData();
        }
    },[])

    const getSchemes = async (plan) => {
        console.log("Hiee ",plan)
        setSchemePlanid(plan.planid)
        moduleNameSetter("view_scheme")
    }

    const viewScheme = (objectValue) => {
        return(
            <>
            <button className="btn btn-secondary mb-3" onClick={() => {getSchemes(objectValue)}}>Veiw Schemes</button>
            </>
        )
    }
    const deletePlan = async (plan) => {
        console.log("plan: ", plan);
        const planid = plan.planid;
        if(plan.status.statusname !== 'active'){
            alert("This Plan is already deleted");
            return;
        }
        try {
            let response = await deletePlanApi(planid)
            getplansData()
            alert(`plan deleted successfully`)
        } catch (error) {
            console.log(error);
        }
    }

    const addPlan = async () => {
        if (!planname) {
            alert("Plan name is required field.");
            return;
        }
        const response = await addPlanApi(token, planname)
            getplansData()
            setPlanname("")
        alert(`Plan added successfully`)
    }

    const updatePlan = async () => {
        if (!planname) {
            alert("Plan name is required field.");
            return;
        }
        let response = await updatePlanApi(token, planid, planname)
        getplansData()
        setPlanid()
        setPlanname("")
        alert(`plan details updated successfully`)
    }

    const refreshPlan = () => {
        setPlanid()
        setPlanname("")
    }
    const onClickUpdateHandler = async (planObject) => {
        console.log(planObject.planid, planObject.plan_name);
        setPlanid(planObject.planid)
        setPlanname(planObject.plan_name)
    }

    const containerStyle = {
        maxHeight: '715px',
        borderRadius: '10px',
        margin: '25px',
        paddingBottom: '25px',
        maxWidth:"90%",
        overflow: 'scroll',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    }
    const tableHeaders = ["ID", "Plan Name","No. of Schemes","Status","View Schemes"]
  return (
      <div className='row align-items-center justify-content-center' style={containerStyle}>
            <div className="modal" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addModalLabel">Add plan</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <label for="planname" className="col-sm-3 col-form-label">Plan Name</label>
                            <input type="text" className="form-control" id="planname" placeholder="plan name"
                            onChange={(e)=>setPlanname(e.target.value)} value={planname}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addPlan}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="updateModal" tabindex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="updateModalLabel">Update plan</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className='row'>
                            <label for="planname" className="col-sm-3 col-form-label">Plan Name</label>
                            <input type="text" className="form-control" id="planname" placeholder="plan name"
                            onChange={(e)=>setPlanname(e.target.value)} value={planname}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updatePlan}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className='col-9' style={{marginTop: '3rem'}}>
            <div className='float-end mx-5'><button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#addModal" onClick={refreshPlan}>Add plan</button></div>
            <Table
            headers={tableHeaders}
            data={plansData}
            enableUpdate={true}
            enableDelete={true}
            updateFunction={onClickUpdateHandler}
            deleteFunction ={deletePlan}
            viewList={viewScheme}/>
            </div>
        </div>
  )
}

export default ViewPlans
