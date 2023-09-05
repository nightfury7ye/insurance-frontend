import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../../../shared/table/Table';
import Pagination from '../../../shared/table/Pagination';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { DeleteAgentApi, addAgentApi, getAgentsApi } from '../../../service/AgentApis';

const ViewAgents = () => {
  const token = localStorage.getItem("auth");
  const [agentData, setAgentData] = useState([]);
  const [curPageNo, setCurPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(4);
  const [agentDto, setAgentDto] = useState({
    firstname: "",
    lastname: "",
    qualification: "",
    commision: 0.0,
    username: "",
    password: "",
  });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState(null);

  const getAgents = async () => {
    try {
      const response = await getAgentsApi(curPageNo, size, token)

      console.log("inside getAgents", response.data);

      const agentDtoArray = response.data.content.map((agent) => ({
        agentid: agent.agentid,
        firstname: agent.firstname,
        lastname: agent.lastname,
        qualification: agent.qualification,
        commision: agent.totalcommision,
        username: agent.user.username,
      }));

      setAgentData(agentDtoArray);

      setCurPageNo(Math.min(curPageNo, response.data.totalPages));
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log("Error fetching agents:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      getAgents();
    }
  }, []);

  useEffect(() => {
    getAgents();
  }, [curPageNo, size]);

  const handlePageChange = async (clickValue) => {
    if (clickValue === "prev" && curPageNo > 1)
      setCurPageNo(curPageNo - 1);
    if (clickValue === "next" && curPageNo !== totalPages)
      setCurPageNo(curPageNo + 1);
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSize(newSize);
  };

  const handleDeleteAgent = async (agent) => {
    setAgentToDelete(agent);
    setShowConfirmationModal(true);
  };

  const confirmDeleteAgent = async () => {
    if (agentToDelete) {
      const agentid = agentToDelete.agentid;
      console.log("handleDeleteAgent: ", agentid, agentToDelete);
      try {
        await DeleteAgentApi(agentid, token)
        getAgents();

        alert(`Agent with ID ${agentid} deleted successfully`);
      } catch (error) {
        console.log(`Error deleting agent with ID ${agentid}:`, error);
      }
    }
    setShowConfirmationModal(false);
  };

  const addAgent = async () => {
    try {
      const response = await addAgentApi(agentDto)

      getAgents();

      alert(`Agent added successfully with ID: ${response.data.agentid}`);
    } catch (error) {
      console.log("Error adding agent:", error);
    }
  };

  const tableAgentHeaders = [
    "ID",
    "First Name",
    "Last Name",
    "Qualification",
    "Commision(Rs)",
    "Username",
  ];

  const handleAddAgentButton = () => {
    setAgentDto({
      firstname: "",
      lastname: "",
      qualification: "",
      commision: 0.0,
      username: "",
      password: "",
    });
  };

  const onChangeAgentDto = (e) => {
    e.preventDefault();
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setAgentDto({
      ...agentDto,
      [e.target.id]: value,
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
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal" onClick={handleAddAgentButton}>
            Add Agent
          </button>
        </div>
      </div>
      <div className='table-container'>
        <Table
          headers={tableAgentHeaders}
          data={agentData}
          enableUpdate={false}
          enableDelete={true}
          deleteFunction={handleDeleteAgent}
        />
      </div>

      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this agent?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={confirmDeleteAgent}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="modal" id="addModal" tabIndex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabel">Add Agent</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                {Object.keys(agentDto).map((key, index) => (
                  <div className="mb-3 row" key={index}>
                    <label htmlFor={key} className="col-sm-3 col-form-label">{key.replace(/_/g, ' ').toUpperCase()}</label>
                    <div className="col-sm-9">
                      <input
                        type={typeof agentDto[key] === 'number' ? 'number' : 'text'}
                        step={typeof agentDto[key] === 'number' ? '0.01' : '1'}
                        className="form-control"
                        id={key}
                        placeholder={key.replace(/_/g, ' ').toUpperCase()}
                        onChange={onChangeAgentDto}
                        value={agentDto[key]}
                      />
                    </div>
                  </div>
                ))}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={addAgent}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAgents;
