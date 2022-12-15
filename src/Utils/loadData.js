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