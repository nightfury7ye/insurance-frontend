import axios from "axios";

export const getplans = async () => {
    const response = await axios.get('http://localhost:8080/insurance-app/insurance-plans')
    return response
}

export const getschemes = async (token, planid) => {
        const response = await axios.get(`http://localhost:8080/insurance-app/insurance-plan/${planid}/insurance-schemes`)
      return response
}

export const purchasePolicyApi = async (customerid, schemeid, policyDetailsGlobal, premiumType) => {

      if(localStorage.getItem("role") == "ROLE_AGENT"){
        console.log("IN AGENT SIDE OF PURCHASEAPI");
          const response = await axios.post(`http://localhost:8080/insurance-app/agent/customer/${customerid}/policy`, {
          premiumamount: policyDetailsGlobal.installmentAmount,
          sumassured: policyDetailsGlobal.totalAmount
        },
        {
          params: {
              agentid: localStorage.getItem("agentid"),
              schemeid: schemeid,
              investtime: policyDetailsGlobal.years,
              typeid: premiumType,
              statusid: 1
          }
        }
        );
        return response
      }

      const response = await axios.post(`http://localhost:8080/insurance-app/customer/${customerid}/policy`, {
        premiumamount: policyDetailsGlobal.installmentAmount,
        sumassured: policyDetailsGlobal.totalAmount
      },
      {
        params: {
            schemeid: schemeid,
            investtime: policyDetailsGlobal.years,
            typeid: premiumType,
            statusid: 1
        }
      }
      );
      return response
}

export const firstPaymentApi = async (policyno, paymentData) => {
    const response = await axios.post(`http://localhost:8080/insurance-app/policy/${policyno}/payments`, {
        paymenttype: paymentData.paymentType,
        amount: paymentData.totalInvestment,
        tax: 12,
        totalpayment : paymentData.totalAmount,
      });
      return response
}
export const installmentPaymentApi = async (paymentid, paymentType, token) => {
  console.log("Payment data",paymentid, paymentType);
    const response = await axios.post(`http://localhost:8080/insurance-app/policy/payment/${paymentid}`, {
        paymenttype: paymentType
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  return response
}

export const getCustomerAPI = async (username) => {
      const response = await axios.get(`http://localhost:8080/insurance-app/users/customer`,{
        params: {
            username: username,
        }
      });
      return response
  }

export const getPoliciesApi = async (token, customerid, curPageNo, size) => {
    const response = await axios.get(`http://localhost:8080/insurance-app/customer/${customerid}/policies`, {
        params: {
          page: curPageNo - 1,
          size: size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    return response
}
export const getPolicyApi = async (token, policyid) => {
    const response = await axios.get(`http://localhost:8080/insurance-app/customer/policy/${policyid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    return response
}

export const getPaymentsApi = async (token, policyno) => {
    const response = await axios.get(`http://localhost:8080/insurance-app/policy/${policyno}/payments`);
    return response
}

export const getEmployeesApi = async (token, curPageNo, size) => {
    const response = await axios.get(`http://localhost:8080/insurance-app/users/employees`, {
        params: {
          page: curPageNo - 1,
          size: size,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response
}

export const deleteEmployeeApi = async (token,employeeid) => {
    await axios.delete(`http://localhost:8080/insurance-app/users/employee/${employeeid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
}
export const addEmployeeApi = async (token, employeeDto) => {
    const response = await axios.post(`http://localhost:8080/insurance-app/users/employee`, {
        firstname: employeeDto.firstname,
        lastname: employeeDto.lastname,
        salary: employeeDto.salary,
        user: {
          username: employeeDto.username,
          password: employeeDto.password,
        },
      }, {
        params: {
          statusid: 1,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });
    return response
}