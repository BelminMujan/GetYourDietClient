import React, { useState } from "react";
import { useEffect } from "react";
import { requestDiet } from "../../Api/diet.api";
import Button from "../../Components/Button/Button";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Input from "../../Components/Input/Input";
import OptionSelect from "../../Components/OptionSelect/OptionSelect";
import { loadData } from "../../Utils/loadData";

const GetDiet = () => {
    const [step, setStep] = useState(0);
    const [goal, setGoal] = useState('');
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
    const [create_account, setCreateAccount] = useState('no')
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
            setActivity(res?.[0].id)
            setActivitiesData(res.map(r => ({ label: r.title, value: r.id })))
        })
        loadData('body-types').then(res => {
            setBodyType(res?.[0].id)
            setBodyTypesData(res.map(r => ({ label: r.title, value: r.id, help: r.help})))
        })
    }, [])
    const steps = [
        {
            title: "Goal",
            properties: [
                {
                    name: "goal",
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
                    name: "height",
                    type: "number",
                    label: "Height",
                    value: height,
                    onChange: (v) => setHeight(v.target.value)
                },
                {
                    name: "weight",
                    type: "number",
                    label: "Weight",
                    value: weight,
                    onChange: (v) => setWeight(v.target.value)
                },
                {
                    name: "body_type",
                    type: "dropdown",
                    label: "Body Type",
                    value: body_type,
                    onChange: (v) => setBodyType(v),
                    options: bodyTypesDate,
                },
                {
                    name: "activity",
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
                    name: 'allergies',
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
                    name: "email",
                    type: "email",
                    label: "Email",
                    value: email,
                    onChange: (v) => setEmail(v.target.value)
                },
                {
                    name: "first_name",
                    type: "text",
                    label: "First Name",
                    value: first_name,
                    onChange: (v) => setFirstName(v.target.value)
                },
                {
                    name: "last_name",
                    type: "text",
                    label: "Last Name",
                    value: last_name,
                    onChange: (v) => setLastName(v.target.value)
                },
                {
                    name: "gender",
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
                    name: "dob",
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
                    name: 'create_account',
                    type: 'select',
                    value: create_account,
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
                {
                    label: 'Password',
                    name: 'password',
                    type: 'password',
                    hidden: create_account,
                    value: password,
                    onChange: (v) => setPassword(v.target.value)
                },
                {
                    label: 'Password confirmation',
                    name: 'password_confirmet',
                    type: 'password',
                    hidden: create_account,
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
            requestDiet({ goal, body_type, weight, height, activity, allergies, diseases, email, first_name, last_name, gender, dob, create_account, password, password_confirmed })
            console.log("submit form");
        }
    }
    return (
        <div className="get-diet-wrapper">
            <h3>{steps[step].title}</h3>
            {steps[step].properties.map((prop, i) => {
                console.log(create_account);
                if(prop.hidden){
                    return;
                }
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
                    case "dropdown":
                        return <Dropdown key={'step-' + i} inline {...prop} />
                    default:
                        return <Input key={'step-' + i} {...prop} />;
                }
            })}
            <Button onClick={handleNext}>{step + 1 < steps.length ? "Next" : "Done"}</Button>
        </div>
    );
};
export default GetDiet;
