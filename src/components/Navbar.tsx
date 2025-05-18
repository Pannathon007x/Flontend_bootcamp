import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const userName = "ชื่อ-สกุล"; // จะเปลี่ยนเป็น data จริงในภายหลัง

    return (
        <header className="bg-blue-100 shadow h-16 flex items-center px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-sm" />
                <span className="text-xl font-bold">Lorem Ipsum</span>
            </Link>

            {/* Nav links */}
            <nav className="ml-12 flex space-x-8">
                <Link to="/" className="text-gray-700 hover:text-gray-900">
                    หน้าหลัก
                </Link>
                <Link to="/login" className="text-gray-700 hover:underline">
                    ล็อกอิน
                </Link>
                <Link to="/my-activities" className="text-gray-700 hover:text-gray-900">กิจกรรมของฉัน</Link>
                <Link to="/history">ประวัติกิจกรรม</Link>

                {/* <Link to={`/activities/${a.id}/close`} className="text-red-500">
                    ปิดกิจกรรม
                </Link> */}

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
                        <li>
                            <button
                                onClick={() => console.log("Logout")}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                            >
                                ออกจากระบบ
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
}
