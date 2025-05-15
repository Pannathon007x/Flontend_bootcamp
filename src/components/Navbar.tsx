import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex space-x-4">
      <Link to="/" className="font-semibold">หน้าแรก</Link>
      <Link to="/activities"> กิจกรรม</Link>
      <Link to="/my-activities"> กิจกรรมของฉัน</Link>
      <Link to="/login"> เข้าสู่ระบบ</Link>
      <Link to="/admin-login"> เข้าสู่ระบบ Admin</Link>
      <Link to="/event"> Event Details</Link>
      <Link to="/cancel-activity"> Cancel Activity</Link>
    </nav>
  );
}
