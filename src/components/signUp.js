import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form"
import * as FirestoreService from '../services/firestore';
import { useNavigate } from "react-router-dom";
import { setLoggedUser } from '../helpers';

function SignUp(props) {
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const [validUsername, setValidUsername ] = useState(true);

    const onSignUp = (values) => {
        // as i understood firebase currently do not support unique fields,
        // and overwrite/merge exists documents with identical ids using setDoc,
        // i currently check for exists user manually, although not 
        // a reliable solutuon
        debugger
        FirestoreService.getUser(values.username).then((user) => {
            if (user.exists()) {
                setValidUsername(false);
            } else {   
                FirestoreService.createUser(values.username,values.fullName).then(
                    () => {
                        let loggedUser = {id: values.username, name: values.fullName};
                        FirestoreService.createLogin(loggedUser.id).then(() => {
                            setLoggedUser(loggedUser);
                            navigate("/loginstable");
                        }).catch(e => {console.error("failed to create login", e)});

                    }
                ).catch((e) => {
                    console.error("failed to create user",e);
                });
            }
        }).catch((e) => {
            console.error("failed to get user",e);
        })
    };

   return (
        <div>
            <h2 onClick={() => props.handleToggle()} className="text-lg text-slate-500 cursor-pointer">Sign up</h2>
            <form className={props.toggle ? "visible" : "hidden"} onSubmit={handleSubmit(onSignUp)}>
                <div className="flex flex-col" >
                    <label className="text-sm">
                        Username:
                        <input className="bg-slate-100 rounded m-2" type="text" {...register("username", {
                            onChange: () => setValidUsername(true)
                        })}/>
                    </label>
                    <label className="text-sm">
                        Full Name:
                        <input className="bg-slate-100 rounded m-2" type="text" {...register("fullName")}/>
                    </label>
                    <button className="text-xs rounded p-0.5 w-10 bg-slate-300" type="submit">Submit</button>
                </div>
            </form>
            <div className={validUsername ? "hidden" : "text-red-400 text-xs"}>Username already taken, please choose another one</div>
        </div>)
}

export default SignUp;