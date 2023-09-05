import axios from "axios";

export const getAgentCustomersApi = async (agentid, token, curPageNo, size) => {
    console.log("agentid:", agentid, token, curPageNo, size);
      const response = await axios.get(`http://localhost:8080/insurance-app/users/customers/${agentid}`, {
        params: {
          page: curPageNo >= 1 ? (curPageNo - 1) : curPageNo,
          size: size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response
}

export const getAgentAPI = async (username) => {
    const response = await axios.get(`http://localhost:8080/insurance-app/users/agent/${username}`,{
      params: {
          username: username,
      }
    });
    return response
}

export const getAgentsApi = async (curPageNo, size,token) => {
  const response = await axios.get(`http://localhost:8080/insurance-app/users/agents`, {
    params: {
      page: curPageNo >= 1 ? (curPageNo - 1) : curPageNo,
      size: size,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
}
export const DeleteAgentApi = async (agentid,token) => {
  await axios.delete(`http://localhost:8080/insurance-app/users/agent/${agentid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const addAgentApi = async (agentDto) => {
    const response = await axios.post(`http://localhost:8080/insurance-app/users/agent`, {
      firstname: agentDto.firstname,
      lastname: agentDto.lastname,
      qualification: agentDto.qualification,
      commision: agentDto.commision,
      user: {
        username: agentDto.username,
        password: agentDto.password,
      }
    }, {
      params: {
        statusid: 1,
      },
    });
    return response
};