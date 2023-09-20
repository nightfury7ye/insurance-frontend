import axios from "axios";

export const addPlanApi = async (token, planname) => {
    const response = await axios.post(`http://localhost:8080/insurance-app/insurance-plan`,
        {
            plan_name: `${planname}`
        },
        {
            params: {
                statusid: 1
            },
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    return response
}

export const updatePlanApi = async (token, planid, planname) => {
    const response = await axios.put(`http://localhost:8080/insurance-app/insurance-plan/${planid}?statusid=${1}`,
        {
            plan_name: planname
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    return response
}

export const deletePlanApi = async (planid) => {
    let response = await axios.post(`http://localhost:8080/insurance-app/insurance-plan/togglestatus`,{},{
        params: {
            planid: planid,
            statusid: 2
        },
    })
    return response
}

export const addSchemeApi = async (schemeDto, planid, token) => {
    let response = await axios.post(`http://localhost:8080/insurance-app/insurance-plan/${planid}/insurance-scheme`,
        {
            scheme_name: schemeDto.scheme_name,
            schemeDetails: {
                discription: schemeDto.description,
                min_amount: schemeDto.min_amount,
                max_amount: schemeDto.max_amount,
                min_invest_time: schemeDto.min_invest_time,
                max_invest_time: schemeDto.max_invest_time,
                min_age: schemeDto.min_age,
                max_age: schemeDto.max_age,
                profit_ratio: schemeDto.profit_ratio,
                registrationcommratio: schemeDto.registrationcommratio,
            }
        },
        {
            params: {
                statusid: 1
            },
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        return response
}

export const updateSchemeApi = async (schemeid,schemeDto,token) => {
    let response = await axios.put(`http://localhost:8080/insurance-app/insurance-scheme/${schemeid}`,
    {
        scheme_name: schemeDto.scheme_name,
        schemeDetails: {
            discription: schemeDto.description,
            min_amount: schemeDto.min_amount,
            max_amount: schemeDto.max_amount,
            min_invest_time: schemeDto.min_invest_time,
            max_invest_time: schemeDto.max_invest_time,
            min_age: schemeDto.min_age,
            max_age: schemeDto.max_age,
            profit_ratio: schemeDto.profit_ratio,
            registrationcommratio: schemeDto.registration_commission_ratio,
        }
    },
    {   
        params: {
            statusid: 1
        },
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response
}

export const getAdminAPI = async (username) => {
    const response = await axios.get(`http://localhost:8080/insurance-app/users/admin`,{
      params: {
          username: username,
      }
    });
    return response
}