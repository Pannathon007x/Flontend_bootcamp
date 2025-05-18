import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const isLoggedIn = true; // เปลี่ยนเป็น false เพื่อทดสอบตอน logout
    const userName = "ชื่อ-สกุล"; // จะเปลี่ยนเป็น data จริงในภายหลัง
    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("token"); // ลบ token ออกจาก localStorage ด้วย
    navigate("/login");
}

    return (
        <header className="bg-blue-100 shadow h-16 flex items-center px-8">
            {/* Logo */}
            <Link to="/activities" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-sm" />
                <span className="text-xl font-bold">Lorem Ipsum</span>
            </Link>

            {/* Nav links */}
            <nav className="ml-12 flex space-x-8">
                <Link to="/activities" className="text-gray-700 hover:text-gray-900">
                    หน้าหลัก
                </Link>
                <Link to="/myactivity" className="text-gray-700 hover:text-gray-900">กิจกรรมของฉัน</Link>
                <Link to="/history" className="text-gray-700 hover:text-gray-900">ประวัติกิจกรรม</Link>
            </nav>

            {/* Spacer */}
            <div className="flex-1" />

            {/* User menu */}
            <div className="relative">
                <button
                    onClick={() => setOpen(v => !v)}
                    className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-1 bg-white hover:shadow"
                >
                    <UserCircleIcon className="w-6 h-6 text-gray-700" />
                    <span className="text-gray-700">{userName}</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                </button>

                {open && (
                    <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-md">
                        <li>
                            <Link
                                to="/profile"
                                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                            >
                                โปรไฟล์ของฉัน
                            </Link>
                        </li>
                        {/* ปุ่ม Login แสดงตลอด แต่ถ้า login แล้วจะ disabled */}
                        <li>
                            <Link
    to={!localStorage.getItem("token") ? "/login" : "#"}
    className={`block px-4 py-2 hover:bg-gray-100 text-gray-700 ${localStorage.getItem("token") ? "opacity-50 pointer-events-none cursor-not-allowed" : ""}`}
    tabIndex={localStorage.getItem("token") ? -1 : 0}
    aria-disabled={!!localStorage.getItem("token")}
>
    ล็อกอิน
</Link>
                        </li>
                        {/* แสดงปุ่มออกจากระบบเฉพาะถ้า login แล้ว */}
                        {isLoggedIn && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                                >
                                    ออกจากระบบ
                                </button>
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </header>
    );
}