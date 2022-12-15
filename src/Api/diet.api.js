export const requestDiet=async(data)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/diet-request`, {
            method: 'POST',
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",

            },
            body: JSON.stringify(data)
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

export const generateDiet=async(id)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/generate-diet/${id}`, {
            method: 'GET',
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
}

export const getDiet=async(id)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/get-diet/${id}`, {
            method: 'GET',
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return await res.json()
    } catch (e) {
        console.log(e);
    }
}

export const setDietStatus=async(dietRequestId, newStatusId)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/set-diet-status`,{
            method: 'POST',
            headers: {
                Accept:"application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({dietRequestId, newStatusId})
        });
        return res
    } catch (e) {
        console.log(e);
    }
}
