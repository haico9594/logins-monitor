import React, { useState, useEffect } from 'react';
import * as FirestoreService from '../services/firestore';
import { clearLoggedUser, formatDate, getLoggedUser } from '../helpers';
import { useNavigate } from "react-router-dom";
import { BallTriangle } from  'react-loader-spinner'

function LoginsTable() {
  const [logins, setLogins] = useState();
  const [user] = useState(getLoggedUser());
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = FirestoreService.streamLogins(
        (querySnapshot) => {
            const loginsStreamData = 
            querySnapshot.docs.map(docSnapshot => { return {id: docSnapshot.id, ...docSnapshot.data()}});
            setLogins(loginsStreamData);
        },
        (error) => console.error('logins-stream-fail')
    );
    return unsubscribe;
  }, [setLogins]);

  const onLogOut = () => {
    clearLoggedUser();
    navigate("/login");

  }

  return (<div className="m-4 flex flex-col text-center">
  <div className="flex justify-between mb-6">
  <div className="text-xl text-slate-500 font-bold">LOGINS MONITOR</div>
  <div> 
    <div className="flex justify-center">
     <h1 className="text-xs mr-2">Hello {user.name}!</h1>
        <button className="self-center bg-slate-200 m-0 rounded text-xs" onClick={onLogOut}>Log out</button>
    </div>
  </div>
  </div>
    {logins ?
        <table>
            <thead>
                <tr>
                    <td className="text-lg">User</td>
                    <td className="text-lg">Login Date</td>
                </tr>
            </thead>
            <tbody>
            {logins?.map((l) => {
                return <tr className={l.userId === user.id ? "bg-green-200" : "bg-slate-100"} key={l.id}>
                    <td>
                        {l.userId}   
                    </td>
                    <td>
                        {formatDate(l.created.toDate())}   
                    </td>
                </tr>
                })}
            </tbody>
        </table>
    : <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperClass={{}}
        wrapperStyle=""
        visible={true}
    />}
  </div>)
}

export default LoginsTable;