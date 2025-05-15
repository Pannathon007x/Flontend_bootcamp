import React from "react";
import "./CancelActivity.css";

const activities = [
  {
    id: 1,
    category: "อบรม",
    categoryColor: "#C9FF9E",
    title: "Lorem Ipsum",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
    dateRange: "วันที่เริ่มต้น - วันที่สิ้นสุด",
  },
  {
    id: 2,
    category: "อาสา",
    categoryColor: "#F2A8FF",
    title: "Lorem Ipsum",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
    dateRange: "วันที่เริ่มต้น - วันที่สิ้นสุด",
  },
  {
    id: 3,
    category: "อบรม",
    categoryColor: "#C9FF9E",
    title: "Lorem Ipsum",
    description: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet...",
    dateRange: "วันที่เริ่มต้น - วันที่สิ้นสุด",
  },
];

const CancelActivityPage = () => {
  const handleCancel = (id: number) => {
    alert(`ยกเลิกกิจกรรม ID: ${id}`);
    // TODO: call API to cancel the activity
  };

  return (
    <div className="cancel-page">
      <div className="navbar">
        <div className="logo">Lorem Ipsum</div>
        <div className="menu">
          <a href="/">หน้าหลัก</a>
          <a href="#">ฟอร์มข้อมูล</a>
          <a href="#">แก้ไขข้อมูลกิจกรรม</a>
          <a href="#">อนุมัติ</a>
          <select>
            <option>ชื่อ-สกุล</option>
          </select>
        </div>
      </div>

      <div className="page-header">
        <span className="back">&larr;</span> แก้ไขข้อมูลกิจกรรม
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-card" key={activity.id}>
            <div
              className="category"
              style={{ backgroundColor: activity.categoryColor }}
            >
              {activity.category}
            </div>
            <div className="details">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
              <p className="date">{activity.dateRange}</p>
            </div>
            <div className="actions">
              <button onClick={() => handleCancel(activity.id)}>ยกเลิก</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CancelActivityPage;
