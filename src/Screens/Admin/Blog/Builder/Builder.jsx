import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getBlog, saveBlog } from "../../../../Api/adminBlog.api";
import Button from "../../../../Components/Button/Button";
import Input from "../../../../Components/Input/Input";

const Builder = () => {
    let params = useParams();
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [cover, setCover] = useState(null);
    const [coverUrl, setCoverUrl] = useState(null)
    const [time_to_read, setTimeToRead] = useState("");
    const [content, setContent] = useState([]);

    useEffect(() => {
        getBlog(params.id).then(data=>{
            data?.title && setTitle(data?.title);
            data?.subtitle && setSubtitle(data?.subtitle);
            data?.cover && setCoverUrl(data?.cover);
            data?.content && setContent(data?.content);
            data?.time_to_read && setTimeToRead(data?.time_to_read);        })
       
    }, [params.id]);

    const handleSave = () => {
        saveBlog({ id: params.id, title, subtitle, cover, time_to_read, content });
    };
    const handlePreview = () => {};

    const handleAddElement = (type) => {
        setContent([...content, { type: type, value:"" }]);
    };

    const handleContentChange=(i, v)=>{
        let temp = content;
        temp[i].value = v
        setContent([...temp])
    }

    return (
        <div className="admin-blog-builder-wrapper">
            <div className="actions">
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={handlePreview}>Preview</Button>
            </div>
            <Input label="Blog title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input label="Blog subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
            <Input label="Time to read" type="number" min={1} value={time_to_read} onChange={(e) => setTimeToRead(e.target.value)} />
            <Input label="Cover" type="file" onChange={(e) => setCover(e.target.files[0])} />
            <img alt='' src={`${process.env.REACT_APP_STORAGE}/images/blog/cover/${coverUrl}`}/>
            {content &&
                content.length !== 0 &&
                content?.map((c, i) => {
                    switch (c.type) {
                        case "content":
                            return <Input value={c.value} onChange={(e)=>handleContentChange(i, e.target.value)}/>;
                        case "image":
                            return <div>
                                    <Input type="file" onChange={(e)=>handleContentChange(i, e.target.files[0])}/>
                                    <img alt='' src={`${process.env.REACT_APP_STORAGE}/images/blog/images/${c?.value}`}/>
                                </div>
                        default: 
                            return
                    }
                })}
            <div className="actions">
                <Button onClick={() => handleAddElement("content")}>Add content</Button>
                <Button onClick={() => handleAddElement("image")}>Add Image</Button>
            </div>
        </div>
    );
};
export default Builder;
