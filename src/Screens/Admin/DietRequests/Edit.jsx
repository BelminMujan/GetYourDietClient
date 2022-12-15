import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Modal from "../../../Components/Modal/Modal";
import { deleteUser, updateUser } from "../../../redux/userSlice";
import { titleFromKey } from "../../../Utils/titleFromKey";
import { options } from "../../../Utils/toastOptions";
import {deleteDietRequest} from "../../../redux/dietRequestsSlice";
import {generateDiet, getDiet, setDietStatus} from "../../../Api/diet.api";
import Diet from "./Diet";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import {loadData} from "../../../Utils/loadData";

const DietRequestsEdit =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const [modal, setModal] = useState()
    const [dietRequest, setDietRequest]= useState()
    const [diet, setDiet]= useState()
    const [dietStatuses, setDietStatues] = useState([])
    let { dietRequests, errors } = useSelector(state => state.dietRequests)

    useEffect(()=>{
        let item = dietRequests.find(dr=>dr.id === parseInt(params?.id))
        setDietRequest(item)
        loadData('diet-statuses').then(res => {
            setDietStatues(res.map(r => ({ label: r.title, value: r.id })))
        })
        getDiet(params.id).then(data=>{
            console.log('Diet data')
            console.log(data)
            setDiet(data?.diet?.diet)
        })
    }, [])

    const handleUpdate=async()=>{
        // let res = await dispatch(updateUser({id:params.id,first_name, last_name, email}))
        // if(res === true) {
        //     toast.success("User updated sucessfully!", options)
        // } else {
        //     toast.error("Error updating user!", options)
        // }
    }

    const handleDelete= async()=>{
        let res = await deleteDietRequest(params.id)
        if(res && res?.status === 200){
            setModal(false)
            navigate('/admin/diet-requests')
        }
    }
    const handleStatusChange=async(status)=>{
        let res = await setDietStatus(params.id, status)
        if(res.status === 200){
            let data =await res.json()
            console.log(data)
            toast.success(data?.message, options)
        }
    }
    const handleGenerateDiet = ()=>{
        let res = generateDiet(params.id)
    }
    if(!dietRequests){
        return <Navigate to='/admin/diet-requests'/>
    }
    console.log(dietStatuses)
    return <div className="admin-diet-request-edit-wrapper">
        <div className={'controls'}>
            <Button onClick={()=>setModal(true)}>Delete</Button>
            <Button onClick={()=>handleGenerateDiet()}>Generate diet</Button>
            <Dropdown inline label='Status' options={dietStatuses} onChange={(v)=>handleStatusChange(v)}/>
        </div>

        {modal && <Modal close={()=>setModal(false)}>
            <h3>Are you sure you want to delete this diet request <br/>({dietRequest['email']})?</h3>
            <div>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={()=>setModal(false)}>No</Button>
            </div>
            </Modal>}
        <div className={'form'}>
            {dietRequest && Object.keys(dietRequest).map(key=>{
                return <Input className='input-item' disabled error={errors?.[key]} inline label={titleFromKey(key)} value={dietRequest[key]?.title || dietRequest[key]} />
            })}
        </div>

        <Diet diet={diet} />
    </div>
}

export default DietRequestsEdit
