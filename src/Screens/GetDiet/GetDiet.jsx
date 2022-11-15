import React, { useState } from "react";
import { useEffect } from "react";
import { loadData, requestDiet } from "../../Api/diet.api";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Input from "../../Components/Input/Input";
import OptionSelect from "../../Components/OptionSelect/OptionSelect";

const GetDiet = () => {
    const [step, setStep] = useState(0);
    const [goal, setGoal] = useState([]);
    const [body_type, setBodyType] = useState("");
    const [weight, setWeight] = useState("")
    const [height, setHeight] = useState("")
    const [activity, setActivity] = useState("");
    const [allergies, setAllergies] = useState([])
    const [diseases, setDiseases] = useState([])
    const [email, setEmail] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [gender, setGender] = useState("")
    const [dob, setDOB] = useState("")
    const [createAccount, setCreateAccount] = useState('no')
    const [password, setPassword] = useState('')
    const [password_confirmed, setPasswordConfirmed] = useState('')

    const [allergiesData, setAllergiesData] = useState({})
    const [diseasesData, setDiseasesData] = useState({})
    const [activitiesData, setActivitiesData] = useState({})
    const [bodyTypesDate, setBodyTypesData] = useState({})
    useEffect(() => {
        loadData('allergies').then(res => {
            setAllergiesData(res.map(r => ({ label: r.title, value: r.id })))
        })
        loadData('diseases').then(res => {
            setDiseasesData(res.map(r => ({ label: r.title, value: r.id })))
        })
        loadData('activities').then(res => {
            setActivitiesData(res.map(r => ({ label: r.title, value: r.id })))
        })
        loadData('body-types').then(res => {
            setBodyTypesData(res.map(r => ({ label: r.title, value: r.id, help: r.help})))
        })
    }, [])
    const steps = [
        {
            title: "Goal",
            properties: [
                {
                    key: "goal",
                    type: "select",
                    value: goal,
                    setValue: (v) => setGoal(v),
                    options: [
                        {
                            label: "Lose Weight",
                            value: "weight",
                        },
                        {
                            label: "Gain Muscle",
                            value: "muscle",
                        },
                        {
                            label: "Increse Testosterone",
                            value: "testosterone",
                        },
                    ],
                },
            ],
        },
        {
            title: "Physical attributes",
            properties: [
                {
                    key: "height",
                    type: "number",
                    label: "Height",
                    value: height,
                    onChange: (v) => setHeight(v.target.value)
                },
                {
                    key: "weight",
                    type: "number",
                    label: "Weight",
                    value: weight,
                    onChange: (v) => setWeight(v.target.value)
                },
                {
                    key: "body_type",
                    type: "dropdown",
                    label: "Body Type",
                    value: body_type,
                    onChange: (v) => setBodyType(v),
                    options: bodyTypesDate,
                },
                {
                    key: "activity",
                    type: "dropdown",
                    label: "Activity",
                    value: activity,
                    onChange: (v) => setActivity(v),
                    options: activitiesData,
                },
            ],
        },
        {
            properties: [
                {
                    label: 'Alergies',
                    key: 'allergies',
                    type: 'select',
                    value: allergies,
                    multiple: true,
                    setValue: (v) => {
                        if (allergies.includes(v)) {
                            setAllergies([...allergies.filter(a => a !== v)])
                        } else {
                            setAllergies([...allergies, v])
                        }
                    },
                    options: allergiesData
                },
                {
                    label: 'Diseases',
                    type: 'select',
                    value: diseases,
                    multiple: true,
                    setValue: (v) => {
                        if (diseases.includes(v)) {
                            setDiseases([...diseases.filter(d => d !== v)])
                        } else {
                            setDiseases([...diseases, v])
                        }
                    },
                    options: diseasesData
                }
            ]
        },
        {
            title: "User info",
            properties: [
                {
                    key: "email",
                    type: "string",
                    label: "Email",
                    value: email,
                    onChange: (v) => setEmail(v.target.value)
                },
                {
                    key: "first_name",
                    type: "string",
                    label: "First Name",
                    value: first_name,
                    onChange: (v) => setFirstName(v.target.value)
                },
                {
                    key: "last_name",
                    type: "string",
                    label: "Last Name",
                    value: last_name,
                    onChange: (v) => setLastName(v.target.value)
                },
                {
                    key: "gender",
                    type: "select",
                    label: "Gender",
                    value: gender,
                    inline: true,
                    setValue: (v) => setGender(v),
                    options: [
                        {
                            label: 'Male',
                            value: 'm'
                        },
                        {
                            label: 'Female',
                            value: 'f'
                        }
                    ]
                },
                {
                    key: "dob",
                    type: "date",
                    label: "Date of Birth",
                    value: dob,
                    onChange: (v) => setDOB(v.target.value)
                },
            ]
        },
        {
            title: 'Do you want to create an account?',
            properties: [
                {
                    key: 'create_account',
                    type: 'select',
                    value: createAccount,
                    inline: true,
                    setValue: (v) => setCreateAccount(v),
                    options: [
                        {
                            label: 'No',
                            value: 'no'
                        },
                        {
                            label: 'Yes',
                            value: 'yes'
                        }
                    ]
                },
                createAccount === 'yes' && {
                    label: 'Password',
                    key: 'password',
                    type: 'password',
                    value: password,
                    onChange: (v) => setPassword(v.target.value)
                },
                createAccount === 'yes' && {
                    label: 'Password confirmation',
                    key: 'password_confirmet',
                    type: 'password',
                    value: password_confirmed,
                    onChange: (v) => setPasswordConfirmed(v.target.value)
                }
            ]
        },
    ];
    useEffect(()=>{
        console.log(body_type);
    },[body_type])

    const handleNext = async () => {
        if (step + 1 < steps.length) {
            setStep(step + 1)
        } else {
            requestDiet({ goal, body_type, weight, height, activity, allergies, diseases, email, first_name, last_name, gender, dob, createAccount, password, password_confirmed })
            console.log("submit form");
        }
    }
    return (
        <div className="get-diet-wrapper">
            <h3>{steps[step].title}</h3>
            {steps[step].properties.map((prop, i) => {
                switch (prop.type) {
                    case "select":
                        return (
                            <div key={'step-' + i} className={`select-wrapper ${prop.inline ? 'inline':''}`}>
                                <h3>{prop.label}</h3>
                                {prop.options.map((opt, j) => {
                                    return <OptionSelect key={opt.value + '-' + '-' + i + '-' + j} selected={prop.value.includes(opt.value)} onClick={() => prop.setValue(opt.value)} {...opt} />;
                                })}
                            </div>
                        );
                    case "number":
                        return <Input key={'step-' + i} inline type="number" {...prop} />;
                    case "string":
                    case "password":
                    case "date":
                        return <Input key={'step-' + i} {...prop} />;
                    case "dropdown":
                        return <Dropdown key={'step-' + i} inline {...prop} />
                    default:
                        break;
                }
            })}
            <Button onClick={handleNext}>{step + 1 < steps.length ? "Next" : "Done"}</Button>
        </div>
    );
};
export default GetDiet;
