import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import * as FirestoreService from '../services/firestore';
import { useNavigate } from "react-router-dom";
import { setLoggedUser } from '../helpers';

function Login(props) {
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const [validUsername, setValidUsername ] = useState(true);

    const onLogin = (values) => {
        FirestoreService.getUser(values.username).then((user) => {
            if (!user.exists()) {
                setValidUsername(false);
            } else {  
                let loggedUser = {id: user.id, name: user.data().name};
                FirestoreService.createLogin(loggedUser.id).then(() => {
                    setLoggedUser(loggedUser);
                    navigate("/loginstable");
                }).catch(e => {console.error("failed to create login", e)});
            }
        }).catch((e) => {
            console.error("failed to get user",e);
        })
    };

   return (<div>
        <h2  onClick={() => props.handleToggle()}  className="cursor-pointer text-lg text-slate-500">Login</h2>
        <form className={props.toggle ? "visible" : "hidden"}onSubmit={handleSubmit(onLogin)}>
            <label className="text-sm">
                Username:
                <input className="bg-slate-100 rounded m-2" type="text" {...register("username", {
                    onChange: () => setValidUsername(true)
                })}/>
            </label>
            <button className="text-xs rounded p-0.5 bg-slate-300" type="submit">Submit</button>
        </form>
        <div className={validUsername ? "hidden" : "text-red-400 text-xs"}>Username does not exist</div>
    </div>)
}

export default Login;