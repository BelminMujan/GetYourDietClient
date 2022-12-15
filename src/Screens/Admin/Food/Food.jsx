import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RowItem from "../../../Components/RowItem/RowItem";
import { getAllFood } from "../../../redux/foodSlice";
import Button from '../../../Components/Button/Button'
import { useNavigate } from "react-router-dom";
import RowHeader from "../../../Components/RowItem/RowHeader";

const Food=()=>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getAllFood())
    },[])
    let { food } = useSelector(state => state.food)
    return <div className="admin-food-wrapper">
        <RowHeader items={['Id', 'Title','Calories', 'Carbs', 'Fats', 'Proteins', 'Food Type', '']}/>
        {food && food.map(f=>{
            return  <RowItem
            key={"admin-food-item-" + f.id}
            {...f}
            show={["id", "title", "calories", 'carbs', 'fats', 'proteins', 'food_category.title']}
            options={[
                <Button onClick={()=>navigate(`${f.id}`)}>Update</Button>
            ]}
        />
        })}
    </div>
}
export default Food