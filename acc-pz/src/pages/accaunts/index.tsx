import React from 'react';
import { FaUser, FaEnvelope, FaCalendarAlt, FaRegClock, FaStar } from 'react-icons/fa';  

import "./style.css";

export const AccountPage = () => {

    const choosenUser = localStorage.getItem("selectedRow");
    
    const user = choosenUser ? JSON.parse(choosenUser) : null;

    if (!user) {
        return <p>No user selected.</p>;
    }

    return (
        <main className="iav-main">
            <div className="iav-bg"></div>
            <div className="iav-container">
                <div className="iav-data">
                    <h1>{user.name}</h1>
                    <p><FaUser /> Name: <span>{user.name}</span></p>
                    <p><FaUser /> Account name: <span>{user.account_name}</span></p>
                    <p><FaEnvelope /> E-mail: <span>{user.email}</span></p>
                    <p><FaStar />
                        Status: <span className={user.status === 'active' ? 'iav-status actived' : user.status === 'disable' ? 'iav-status disable' : 'iav-status pending'}>{user.status}</span>
                    </p>
                    <p><FaCalendarAlt /> Start date: <span>{new Date(user.start_date * 1000).toLocaleDateString()}</span></p>
                    <p><FaRegClock /> Expiration date: <span>{new Date(user.expiration_date * 1000).toLocaleDateString()}</span></p>
                </div>
            </div>
        </main>
    );
};
