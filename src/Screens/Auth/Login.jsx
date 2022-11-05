import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Input from "../../Components/Input/Input";
import { login } from "../../redux/userSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const handleLogin=async ()=>{
        let res = await dispatch(login({ email: email, password: password }))
        if(res){
            console.log(res);
            navigate("/admin/dashboard")
        }
    }
    const {errors, message, loading} = useSelector(state => state.user)
    const fields = [
        { label: "Email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), error: errors?.email },
        { label: "Password", type: "password", value: password, onChange: (e) => setPassword(e.target.value), error: errors?.password },
    ];
    return (
        <div className="login-wrapper">
            {fields &&
                fields.map((f) => {
                    return <Input key={f.label} {...f} />;
                })}
            <Button onClick={handleLogin} loading={loading}>Login</Button>
                {message && <p className="error-message">{message}</p>}
        </div>
    );
};
export default Login;
