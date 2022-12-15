import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import Modal from "../../../Components/Modal/Modal";
import { deleteUser, updateUser } from "../../../redux/userSlice";
import { options } from "../../../Utils/toastOptions";

const UsersEdit =()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const [modal, setModal] = useState()
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [email_verified_at, setEmailVerifiedAt] = useState('')
    let { allUsers, errors } = useSelector(state => state.user)
 
    useEffect(()=>{
        let item = allUsers.find(u=>u.id === parseInt(params?.id))
        item?.first_name && setFirstName(item.first_name)
        item?.last_name && setLastName(item.last_name)
        item?.email && setEmail(item.email)
        item?.email_verified_at && setEmailVerifiedAt(item.email_verified_at)
    }, [])

    const handleUpdate=async()=>{
        let res = await dispatch(updateUser({id:params.id,first_name, last_name, email}))
        if(res === true) {
            toast.success("User updated sucessfully!", options)
        } else {
            toast.error("Error updating user!", options)
        }
    }
   
    const handleDelete= async()=>{
        let res = await deleteUser(params.id)
        if(res && res?.status === 200){
            setModal(false)
            navigate('/admin/users')
        }
    }
    if(!allUsers){
        return <Navigate to='/admin/users'/>
    }
    return <div className="admin-user-edit-wrapper">
        {modal && <Modal close={()=>setModal(false)}>
            <h3>Are you sure you want to delete this user?</h3>
            <div>
                <Button onClick={handleDelete}>Yes</Button>
                <Button onClick={()=>setModal(false)}>No</Button>
            </div>
            </Modal>}
        <Input error={errors?.['first_name']} label='First Name' value={first_name} onChange={(e)=>{setFirstName(e.target.value)}}/>
        <Input error={errors?.['last_name']} label='Last Name' value={last_name} onChange={(e)=>{setLastName(e.target.value)}}/>
        <Input error={errors?.['email']} label='Email' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <Input error={errors?.['email_verified_at']} disabled label='Email Verified At' value={email_verified_at}/>
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={()=>setModal(true)}>Delete</Button>
    </div>
}

export default UsersEdit