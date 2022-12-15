import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RowItem from "../../../Components/RowItem/RowItem";
import Button from '../../../Components/Button/Button'
import { useNavigate } from "react-router-dom";
import RowHeader from "../../../Components/RowItem/RowHeader";
import { getAllUsers } from "../../../redux/userSlice";

const Users=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getAllUsers())
    },[])
    let { allUsers } = useSelector(state => state.user)
    const customColumns = '30px 15% 15% auto 15% 100px'
    return <div className="admin-food-wrapper">
        <RowHeader customColumns={customColumns} items={['Id', 'Fist Name','Last Name', 'Email', 'Email verified', '']}/>
        {allUsers && allUsers.map(u=>{
            return  <RowItem
            key={"admin-users-item-" + u.id}
            {...u}
            customColumns={customColumns}
            show={["id", "first_name", "last_name", 'email', 'email_verified_at']}
            options={[
                <Button onClick={()=>navigate(`${u.id}`)}>Update</Button>
            ]}
        />
        })}
    </div>
}
export default Users