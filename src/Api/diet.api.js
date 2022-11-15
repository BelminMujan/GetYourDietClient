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
