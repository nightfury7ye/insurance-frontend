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