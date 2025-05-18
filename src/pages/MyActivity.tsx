import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// สมมุติ interface Activity ตาม backend
interface Activity {
  id: number;
  title: string;
  description: string;
  activity_type_id: number;
  start_datetime: string;
  end_datetime: string;
  registration_status: string;
}

const TYPE_MAP: Record<number, { name: string; color: string }> = {
  1: { name: "อาสา", color: "bg-red-200" },
  2: { name: "ช่วยงาน", color: "bg-yellow-200" },
  3: { name: "อบรม", color: "bg-green-200" },
};

export default function MyActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}/user/registed?id=${userId}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API ไม่ได้ส่งข้อมูล JSON");
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "เกิดข้อผิดพลาด");
        setActivities(data.activities);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [API_URL, userId]);

  if (loading) return <div className="p-8 text-center">กำลังโหลด...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-orange-300 py-4 px-6 flex items-center space-x-4 shadow-md rounded-b-xl">
        <Link to="/activities" className="text-2xl hover:text-orange-600 transition">←</Link>
        <h1 className="text-2xl font-bold text-gray-800">กิจกรรมของฉัน</h1>
      </div>

      <div className="mx-[80px] my-6 space-y-6">
        {activities.length === 0 && (
          <div className="text-center text-gray-400 py-12">ไม่พบกิจกรรมที่ลงทะเบียน</div>
        )}
        {activities.map((a) => (
          <div
            key={a.id}
            className="flex bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* แถบสีฝั่งซ้าย */}
            <div className={`${TYPE_MAP[a.activity_type_id]?.color || "bg-gray-200"} w-32 flex items-center justify-center`}>
              <span className="text-2xl font-bold text-gray-800">{TYPE_MAP[a.activity_type_id]?.name || a.activity_type_id}</span>
            </div>
            {/* เนื้อหา */}
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{a.title}</h3>
                <p className="text-gray-600 italic mb-2">"{a.description}"</p>
                <p className="text-sm text-gray-600 font-medium">
                  วันที่ {new Date(a.start_datetime).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })} -{" "}
                  {new Date(a.end_datetime).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                </p>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Link
                  to={`/user/${userId}/${a.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow"
                >
                  ดูรายละเอียด
                </Link>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold shadow"
                  onClick={() => handleCancelActivity(a.id)}
                >
                  ยกเลิกกิจกรรม
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function handleCancelActivity(activityId: number) {
    if (!userId) {
      alert("ไม่พบ userId");
      return;
    }
    if (window.confirm("คุณต้องการยกเลิกกิจกรรมนี้ใช่หรือไม่?")) {
      fetch(`${API_URL}/user/cancel/${userId}/${activityId}`, {
        method: "DELETE",
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "เกิดข้อผิดพลาด");
          // ลบกิจกรรมออกจาก state
          setActivities((prev) => prev.filter((a) => a.id !== activityId));
          alert("ยกเลิกกิจกรรมสำเร็จ");
        })
        .catch((err) => {
          alert("เกิดข้อผิดพลาด: " + err.message);
        });
    }
  }
}