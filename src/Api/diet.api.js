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


export const loadData=async(path)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/load/${path}`, {
            headers:{
                Accept: 'application/json'
            }
        })
        let data = res.json()
        return data
    } catch (e) {
        console.log(e)
    }
   
}