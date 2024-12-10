import React, { useState } from "react";
import "./style.css";
import * as api from "../../api/index.js";

export const ModalWindow = ({ title, onClose, onSave}) => {

    const [formData, setFormData] = useState(() => {
        const savedAccount = localStorage.getItem("account");
        if (savedAccount) {
            const parsedAccount = JSON.parse(savedAccount);
            return {
                ...parsedAccount,
                start_date: new Date(parsedAccount.start_date * 1000).toISOString().split("T")[0], 
                expiration_date: new Date(parsedAccount.expiration_date * 1000).toISOString().split("T")[0], 
            };
        }
    
        return {
            name: "",
            account_name: "",
            status: "Pending",
            email: "",
            start_date: "",
            expiration_date: "",
        };
    });
    

    const [errors, setErrors] = useState({
        email: false,
        startDate: false,
        expirationDate: false,
    });

    const today = new Date().toISOString().split("T")[0]; 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "email") {
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            setErrors((prev) => ({ ...prev, email: !emailValid }));
        }

        if (name === "startDate" || name === "expirationDate") {
            const isInvalidDate = value < today;
            setErrors((prev) => ({ ...prev, [name]: isInvalidDate }));
        }
    };

    const handleSubmit = async () => {
        const startDateTimestamp = formData.start_date
            ? Math.floor(new Date(formData.start_date).getTime() / 1000)
            : null;
    
        const expirationDateTimestamp = formData.expiration_date
            ? Math.floor(new Date(formData.expiration_date).getTime() / 1000)
            : null;
    
        const dataToSave = {
            ...formData,
            start_date: startDateTimestamp,
            expiration_date: expirationDateTimestamp,
        };
    
        const savedAccount = localStorage.getItem("account");
    
        try {
            if (savedAccount) {
                const parsedAccount = JSON.parse(savedAccount);
                await api.updateAccount(parsedAccount.id, dataToSave); 
            } else {
                await api.createAccount(dataToSave); 
                onSave(dataToSave);
            }
            console.log("Form submitted:", dataToSave);
            window.location.reload();
        } catch (error) {
            console.error("Error during saving:", error);
        } finally {
            onClose(); 
        }
    };
    

    return (
        <div className="iav-modal">
            <div className="iav-top-cont">
                <h2>{title}</h2>
                <button className="close-btn" onClick={onClose}>
                    &#10006;
                </button>
            </div>
            <form className="iav-form">
                <div className="form-group">
                    <label>Name*</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Account*</label>
                    <input
                        type="text"
                        name="account_name"
                        value={formData.account_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Disable">Disable</option>
                    </select>
                </div>
                    <div className="form-group">
                    <label>Email*</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "invalid" : ""}
                    />
                    {errors.email && <p className="error-message">Invalid email format</p>}
                </div>
                
                <div className="iav-date-cont">
                    <div className="form-group" id="startDate">
                        <label>Start Date</label>
                        <input
                        type="date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleChange}
                        min={formData ? formData.start_date : today} 
                        className={errors.start_date ? "invalid" : ""}
                        />
                        {errors.startDate && (
                        <p className="error-message">Date cannot be in the past</p>
                        )}
                    </div>

                    <div className="form-group" id="expirationDate">
                        <label>Expiration Date</label>
                        <input
                        type="date"
                        name="expiration_date"
                        value={formData.expiration_date}
                        onChange={handleChange}
                        min={formData ? formData.start_date : today}  
                        className={errors.expiration_date ? "invalid" : ""}
                        />
                        {errors.expiration_date && (
                        <p className="error-message">Date cannot be in the past</p>
                        )}
                    </div>
                </div>

                <div className="form-buttons">
                    <button type="button" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="button" onClick={handleSubmit}>
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};
