// src/pages/AdminLogin.tsx

import React, { useState } from "react";
import axios from "axios";
import "./AdminLogin.css";
import api from "../utils/api";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    acceptedTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptedTerms) {
      alert("You must accept the terms and conditions.");
      return;
    }

    try {
      const response = await api.post("/auth/loginadmin", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login successful:", response.data);

      // ตัวอย่าง: บันทึก token ลง localStorage
      localStorage.setItem("token", response.data.token);

      alert("Login successful");

      // เปลี่ยนเส้นทางหลัง login สำเร็จ
      window.location.href = "/admin/dashboard";

    } catch (error: any) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="wrapper">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="policy">
          <input
            type="checkbox"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
          />
          <h3>I accept all terms & conditions</h3>
        </div>
        <div className="input-box button">
          <input type="submit" value="Login" />
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
