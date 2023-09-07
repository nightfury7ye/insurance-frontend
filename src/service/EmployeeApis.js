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

export const getEmployeeAPI = async (employeeid,token) => {
  await axios.get(`http://localhost:8080/insurance-app/users/employee/${employeeid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};