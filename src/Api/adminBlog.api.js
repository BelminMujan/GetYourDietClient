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

export const getBlog = async(id)=>{
    try {
        let res = await fetch(`${process.env.REACT_APP_API}/get-blog/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return await res.json()
    } catch (e) {
        console.log(e)
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
        form.append("id", blog.id)
        blog.title && form.append("title", blog.title)
        blog.subtitle && form.append("subtitle", blog.subtitle)
        blog.cover && form.append("cover", blog.cover)
        blog.time_to_read && form.append("time_to_read", blog.time_to_read)
        if(blog.content){
            blog.content.forEach((cc, i) => {
                if(cc.type === "image"){
                    form.append(`images[${i}]`, cc.value)
                } else {
                    form.append(`content[${i}]`, cc.value)
                }
            });
        }
        console.log(blog.content);
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

