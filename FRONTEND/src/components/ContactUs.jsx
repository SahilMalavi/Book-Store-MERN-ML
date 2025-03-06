import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from "react";

function ContactUs() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Here, you could send the form data to a backend or API
        alert("Thank you for reaching out!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Navbar />
         
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                margin: '20px auto'
            }}>
                <div style={{
                    maxWidth: "400px",
                    width: "100%",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
                }}>
                    <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    display: "block",
                                    width: "100%",
                                    marginBottom: "10px",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </label>
                        <label>
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    display: "block",
                                    width: "100%",
                                    marginBottom: "10px",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </label>
                        <label>
                            Message:
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                style={{
                                    display: "block",
                                    width: "100%",
                                    marginBottom: "10px",
                                    padding: "8px",
                                    borderRadius: "4px",
                                    border: "1px solid #ccc"
                                }}
                            />
                        </label>
                        <button
                            type="submit"
                            style={{
                                width: "100%",
                                padding: "10px",
                                borderRadius: "4px",
                                backgroundColor: "#4CAF50",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease"
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = "#45a049"}
                            onMouseOut={(e) => e.target.style.backgroundColor = "#4CAF50"}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
      </>
    )
}

export default ContactUs
