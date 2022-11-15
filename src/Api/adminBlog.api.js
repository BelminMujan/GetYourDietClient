export const createBlog=async()=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/create-blog`, {
            headers: {
                Accept:"application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        let {id} = await res.json()
        return id
    } catch (e) {
        console.log(e);
    }
}

export const deleteBlog=async(id)=>{
    try {
        await fetch(`${process.env.REACT_APP_API}/delete-blog/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    } catch (e) {
        console.log(e)
    }
}

export const saveBlog=async (blog)=>{
    try {
        let form = new FormData()
        console.log(blog.content);
        form.append("id", blog.id)
        form.append("title", blog.title)
        form.append("subtitle", blog.subtitle)
        form.append("cover", blog.cover)
        form.append("time_to_read", blog.time_to_read)
        if(blog.content){
            blog.content.forEach((cc, i) => {
                if(cc.type === "image"){
                    form.append(`images[]`, cc.value)
                } else {
                    form.append("content[]", cc.value)
                }
            });
        }
        let res = await fetch(`${process.env.REACT_APP_API}/save-blog`, {
            method: "POST",
            headers: {
                Accept:"multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: form,
        });
        let data = await res.json()
        console.log(data);
        return data
    } catch (e) {
       return console.log(e);
    }
}

