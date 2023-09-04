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

export const deletePlanApi = async (token, planid) => {
    let response = await axios.delete(`http://localhost:8080/insurance-app/insurance-plan/${planid}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response
}