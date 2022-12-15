export const updateFood=async (food)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/update-food`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept:"application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(food),
        });
        // console.log(res);
        let data = await res.json()
        console.log(data);
        return data
    } catch (e) {
       return console.log(e);
    }
}


export const deleteFood=async (id)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/delete-food/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return res
    } catch (e) {
       return console.log(e);
    }
}
