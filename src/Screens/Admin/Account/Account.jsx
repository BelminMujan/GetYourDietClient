import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../Components/Button/Button";
import Input from "../../../Components/Input/Input";
import { updateUser } from "../../../redux/userSlice";
import { options } from "../../../Utils/toastOptions";

const Account = () => {
    const dispatch = useDispatch();
    let { user, errors, message} = useSelector((state) => state.user);
    const [editing, setEditing] = useState(false);
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmed] = useState("");

    const items = [
        {
            label: "Id",
            value: user.id,
            disabled: true,
            readOnly: true,
        },
        {
            label: "First Name",
            value: first_name,
            disabled: !editing,
            onChange: (e) => setFirstName(e.target.value),
            error: errors?.first_name
        },
        {
            label: "Last Name",
            value: last_name,
            disabled: !editing,
            onChange: (e) => setLastName(e.target.value),
            error: errors?.last_name
        },
        {
            label: "Email",
            value: email,
            disabled: !editing,
            onChange: (e) => setEmail(e.target.value),
            error: errors?.email
        },
        {
            label: "User created",
            value: user.created_at,
            disabled: true,
            readOnly: true,
        },
        {
            label: "User updated",
            value: user.updated_at,
            disabled: true,
            readOnly: true,
        },
    ];
    const passwordFields = [
        {
            label: "Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            error: errors?.password
        },
        {
            label: "Password confirmation",
            value: password_confirmation,
            onChange: (e) => setPasswordConfirmed(e.target.value),
            error: errors?.password_confirmation
        },
    ];

    const handleEdit = async () => {
        if (editing) {
            let pd = {};
            if (user.first_name !== first_name) pd.first_name = first_name;
            if (user.last_name !== last_name) pd.last_name = last_name;
            if (user.email !== email) pd.email = email;
            if (password !== "") pd.password = password;
            if (password_confirmation !== "") pd.password_confirmation = password_confirmation;
            let res = await dispatch(updateUser(pd));
            if(res === true) {
                setEditing(false);
                toast.success("User updated sucessfully!", options)
            }
        } else {
            setEditing(true);
        }
    };
    return (
        <div className="admin-account-wrapper">
            <Button onClick={handleEdit}>{editing ? "Save" : "Edit"}</Button>
            {items &&
                items.map((i) => {
                    return <Input key={i.label} {...i} />;
                })}
            {passwordFields &&
                editing &&
                passwordFields.map((i) => {
                    return <Input key={i.label} {...i} />;
                })}
        </div>
    );
};

export default Account;
