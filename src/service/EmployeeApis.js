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

export const approveCommissionApi = async (commissionid) => {
  await axios.put(`http://localhost:8080/insurance-app/commission/${commissionid}/approve`);
};