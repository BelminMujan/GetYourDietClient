import React from "react";

const Diet = ({diet})=>{
    return <div className={'admin-diet-wrapper'}>
        {diet && Object.keys(diet).map(week=>{
            return <div className={'week'} key={week}>
                <h3>{week}</h3>
                <div className={'days'}>
                    {Object.keys(diet[week]).map(day=>{
                        return <div className={'day'} key={week+'-'+day}>
                            <h4>{day}</h4>
                            <div className={'meals'}>
                                {Object.keys(diet[week][day]).map(meal=>{
                                    return <div className={'meal'} key={week+'-'+day+'-'+meal}>
                                        <h5>{meal}</h5>
                                        <div className={'food'}>
                                            {diet[week][day][meal].map(f=>{
                                                return <div>
                                                    {f?.food?.title}, {f?.quantity}gr
                                                </div>
                                            })}

                                        </div>
                                    </div>
                                })}
                            </div>

                        </div>
                    })}
                </div>

            </div>
        })}
    </div>
}

export default Diet
