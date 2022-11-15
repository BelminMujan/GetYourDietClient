import React, { useState } from "react";
import { useEffect } from "react";
import { requestDiet } from "../../Api/diet.api";
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
    let title = "JavaScript Jeep";


    let body = "It's Your boarding time";

    var notification = new Notification(title, { body });
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
                    setValue: (v) => setBodyType(v),
                    options: [
                        {
                            label: "Ectomorph",
                            value: "ectomorph",
                            help: "Ectomorphs are long and lean, with little body fat, and little muscle. They have a hard time gaining weight. Fashion models and basketball players fit this category. While most of us love to hate these genetically-blessed individuals, some male ectomorphs may not be thrilled with their narrow-chested frames, and some female ectomorphs long for more womanly curves.",
                        },
                        {
                            label: "Endomorph",
                            value: "endomorph",
                            help: "Endomorphs, on the other hand, have lots of body fat, lots of muscle, and gain weight easily.Football lineman tend to be endomorphs -- they're heavier and rounder individuals, says Colby. And they don't have to necessarily be overweight. Both Oprah Winfrey and Marilyn Monroe are classic examples of endomorphs.",
                        },
                        {
                            label: "Mesomorph",
                            value: "mesoporph",
                            help: "Mesomorphs are athletic, solid, and strong. They're not overweight and not underweight, says Colby, and they can eat what they want without worrying too much about it. They both gain and lose weight without too much effort.",
                        },
                    ],
                },
                {
                    key: "activity",
                    type: "dropdown",
                    label: "Activity",
                    value: activity,
                    setValue: (v) => setActivity(v),
                    options: [
                        {
                            label: "Little or no exercise",
                            value: "no",
                        },
                        {
                            label: " Lightly active",
                            value: "lightly",
                        },
                        {
                            label: "Light exercise, sport 1-3 times per week",
                            value: "light",
                        },
                        {
                            label: "Very active, hard exercise, 6-7 days a week",
                            value: "very",
                        },
                        {
                            label: "Extra active (Physical job, or 2 times workout per day",
                            value: "extra",
                        },
                    ],
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
                    options: [
                        {
                            label: 'Peanut butter',
                            value: 'peanut_butter'
                        },
                        {
                            label: 'Gluten',
                            value: 'gluten'
                        },
                        {
                            label: 'Lactose Intolerance',
                            value: 'lactose_intolerance'
                        },
                        {
                            label: 'Eggs',
                            value: 'eggs'
                        },
                        {
                            label: 'Walnuts',
                            value: 'walnuts'
                        },
                        {
                            label: 'Wheat',
                            value: 'wheat'
                        },
                        {
                            label: 'Chocolate',
                            value: 'chocolate'
                        },
                        {
                            label: 'Soj',
                            value: 'soj'
                        },
                    ]
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
                    options: [
                        {
                            label: 'Diabetes',
                            value: 'diabetes'
                        },
                        {
                            label: 'Blood pressure',
                            value: 'blog_pressure'
                        },
                        {
                            label: 'Cholesterol',
                            value: 'cholesterol'
                        },
                        {
                            label: 'Increase HDL or LDL',
                            value: 'hdl_ldl'
                        },
                    ]
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
    useEffect(() => {
        console.log(allergies);
    }, [allergies])
    const handleNext = async () => {
        if (step + 1 < steps.length) {
            setStep(step + 1)
        } else {
            requestDiet({goal,body_type,weight,height,activity,allergies,diseases,email,first_name,last_name,gender,dob,createAccount,password, password_confirmed})
            console.log("submit form");
        }
    }
    return (
        <div className="get-diet-wrapper">
            <h3>{steps[step].title}</h3>
            {steps[step].properties.map((prop) => {
                switch (prop.type) {
                    case "select":
                        return (
                            <div>
                                <h3>{prop.label}</h3>
                                {prop.options.map((opt) => {
                                    return <OptionSelect selected={prop.value.includes(opt.value)} onClick={() => prop.setValue(opt.value)} {...opt} />;
                                })}
                            </div>
                        );
                    case "number":
                        return <Input inline type="number" {...prop} />;
                    case "string":
                    case "password":
                    case "date":
                        return <Input {...prop} />;
                    case "dropdown":
                        return <Dropdown inline {...prop} />
                    default:
                        break;
                }
            })}
            <Button onClick={handleNext}>{step + 1 < steps.length ? "Next" : "Done"}</Button>
        </div>
    );
};
export default GetDiet;
