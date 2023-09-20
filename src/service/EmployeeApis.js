import axios from "axios";

export const getCustomersApi = async (curPageNo, size) => {
      const response = await axios.get(`http://localhost:8080/insurance-app/users/customers`, {
        params: {
          page: curPageNo >= 1 ? (curPageNo - 1) : curPageNo,
          size: size,
        },
      });
      return response
};

export const getPendingCustomersApi = async (curPageNo, size, token) => {
      const response = await axios.get(`http://localhost:8080/insurance-app/pending-customers`, {
        params: {
          page: curPageNo >= 1 ? (curPageNo - 1) : curPageNo,
          size: size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response
};
export const customerApproveApi = async (customerid, token) => {
  console.log("inside customerApproveApi: ", customerid, token);
      await axios.put(`http://localhost:8080/insurance-app/customer/${customerid}/document-status`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
};

export const getEmployeeCommissionsApi = async (curPageNo, size) => {
  const response = await axios.get(`http://localhost:8080/insurance-app/commissions`, {
    params: {
      page: curPageNo >= 1 ? (curPageNo - 1) : curPageNo,
      size: size,
    },
  });
  return response
};

export const approveCommissionApi = async (commissionid, token) => {
  console.log("inside approveCommissionApi: ", commissionid, token);
  await axios.put(`http://localhost:8080/insurance-app/commission/${commissionid}/approve`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getEmployeeAPI = async (username) => {
  const response = await axios.get(`http://localhost:8080/insurance-app/users/employee`,{
    params: {
        username: username,
    }
  });
  return response
};
export const getClaimsApi = async (curPageNo, size) => {
  const response = await axios.get(`http://localhost:8080/insurance-app/claims`, {
    params: {
      page: curPageNo >= 1 ? (curPageNo - 1) : curPageNo,
      size: size,
    },
  });
  return response
};

export const approveClaimApi = async (claimid, token) => {
  console.log("inside approveClaimApi: ", claimid, token);
  await axios.put(`http://localhost:8080/insurance-app/claim/${claimid}/approve`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};