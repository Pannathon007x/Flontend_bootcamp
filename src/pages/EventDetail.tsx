import React from "react";
import "./EventDetail.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserFriends } from "react-icons/fa";

const EventDetail = () => {
  return (
    <div className="event-page">
      {/* Navbar (mockup) */}
      <nav className="navbar">
        <div className="logo">Lorem Ipsum</div>
        <div className="nav-links">
          <a href="/">หน้าแรก</a>
          <a href="#">กิจกรรมของฉัน</a>
          <a href="#">ประวัติกิจกรรม</a>
          <a href="#">ทะเบียนนิสิต</a>
          <button className="login-btn">เข้าสู่ระบบ</button>
        </div>
      </nav>

      {/* Content */}
      <div className="event-detail-container">
        <div className="event-header">
          <h1>Lorem Ipsum</h1>
          <div className="tags-actions">
            <span className="tag">อบรม</span>
            <button className="score-btn">+ คะแนน</button>
          </div>
          <div className="tag-bar" />
        </div>

        <div className="event-description">
          <p>
            <strong>What is Lorem Ipsum?</strong><br />
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry...<br /><br />
            <strong>Where does it come from?</strong><br />
            Contrary to popular belief, Lorem Ipsum is not simply random text...
          </p>
        </div>

        <div className="event-info">
          <div className="info-item"><FaMapMarkerAlt /> สถานที่</div>
          <div className="info-item"><FaCalendarAlt /> วันที่เริ่มต้น - วันที่สิ้นสุด</div>
          <div className="info-item"><FaUserFriends /> จำนวน/เต็ม</div>
        </div>

        <div className="register-btn-wrapper">
          <button className="register-btn">สมัคร</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
