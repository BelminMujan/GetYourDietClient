import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { deleteFood, updateFood } from "../../../Api/adminFood.api";
import Button from "../../../Components/Button/Button";
import Dropdown from "../../../Components/Dropdown/Dropdown";
import Input from "../../../Components/Input/Input";
import { loadData } from "../../../Utils/loadData";
import { options } from "../../../Utils/toastOptions";

const FoodEdit =()=>{
    const navigate = useNavigate()
    const params = useParams()
    const [errors, setErrors] = useState([])
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('')
    const [calories, setCalories] = useState('')
    const [carbs, setCarbs] = useState('')
    const [fats, setFats] = useState('')
    const [proteins, setProteins] = useState('')
    const [category, setCategory] = useState('')
    const [macro, setMacro] = useState('')
    let { food } = useSelector(state => state.food)

 
    useEffect(()=>{
        loadData('food-categories').then(res => {
            setCategories(res.map(r => ({ label: r.title, value: r.id })))
        })
        let item = food.find(f=>f.id === parseInt(params?.id))
        item?.title && setTitle(item.title)
        item?.calories && setCalories(item.calories)
        item?.carbs && setCarbs(item.carbs)
        item?.fats && setFats(item.fats)
        item?.proteins && setProteins(item.proteins)
        item?.food_category?.id && setCategory(item?.food_category?.id)
        item?.macro_category?.id && setMacro(item?.macro_category?.id)
    }, [])
    useEffect(()=>{
            setErrors([])
    },[title,calories,carbs,fats,proteins,category,macro])

    const handleUpdate=()=>{
        setErrors([])
        updateFood({id:params.id,title,calories,carbs,fats,proteins,food_category: category,macro}).then(res=>{
            if(res?.message){
                if(res.errors){
                    toast.error(res.message, options)
                    setErrors(res.errors)
                } else {
                    toast.success(res.message, options)
                }
            }
            
        })
    }
    const handleDelete=()=>{
        deleteFood(params.id).then((res)=>{
            if(res.status === 200){
                navigate('/admin/food')
            }
        })
    }
    if(!food){
        return <Navigate to='/admin/food'/>
    }
    return <div className="admin-food-edit-wrapper">
        <Input error={errors['title']} label='Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <Input error={errors['calories']} label='Calories' value={calories} onChange={(e)=>{setCalories(e.target.value)}}/>
        <Input error={errors['carbs']} label='Carbs' value={carbs} onChange={(e)=>{setCarbs(e.target.value)}}/>
        <Input error={errors['fats']} label='Fats' value={fats} onChange={(e)=>{setFats(e.target.value)}}/>
        <Input error={errors['proteins']} label='Proteins' value={proteins} onChange={(e)=>{setProteins(e.target.value)}}/>
        <Dropdown error={errors['food_category']} label='Category' value={category} onChange={(e)=>{setCategory(e);}} options={[...categories]}/>
        <Input error={errors['macro_category']} label='Macro' value={macro} onChange={(e)=>{setMacro(e)}}/>
        <Button onClick={handleUpdate}>Update</Button>
        <Button onClick={handleDelete}>Delete</Button>
    </div>
}

export default FoodEdit