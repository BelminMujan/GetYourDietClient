import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RowItem from "../../../Components/RowItem/RowItem";
import Button from '../../../Components/Button/Button'
import { useNavigate } from "react-router-dom";
import RowHeader from "../../../Components/RowItem/RowHeader";
import { getAllDietRequests } from "../../../redux/dietRequestsSlice";

const Food=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getAllDietRequests())
    },[])
    let { dietRequests } = useSelector(state => state.dietRequests)
    const customColumns = '30px auto 40% 100px 100px'
    return <div className="admin-diet-request-wrapper">
        <RowHeader customColumns={customColumns} items={['Id','email', 'Date Created', 'Status', '']}/>
        {dietRequests && dietRequests.map(f=>{
            return  <RowItem
            key={"admin-food-item-" + f.id}
            {...f}
            customColumns={customColumns}
            show={["id", 'email', 'created_at', 'status.title']}
            options={[
                <Button onClick={()=>navigate(`${f.id}`)}>Edit</Button>
            ]}
        />
        })}
    </div>
}
export default Food
