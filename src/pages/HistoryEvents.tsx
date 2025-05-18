import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface Activity {
  id: number;
  title: string;
  description: string;
  activity_type_id: number;
  start_datetime: string;
  end_datetime: string;
  location: string;
  max_participants: number;
  hour_value: number;
  creator_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  registration_status: string;
  attendance: string | null;
  hours_earned: number | null;
}

const TYPE_MAP: Record<number, { name: string; color: string }> = {
  1: { name: "อาสา", color: "bg-red-100" },
  2: { name: "ช่วยงาน", color: "bg-yellow-100" },
  3: { name: "อบรม", color: "bg-green-100" },
};

export default function HistoryEvents() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ดึง userId จาก localStorage (หรือจะใช้ query string ก็ได้)
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
          const text = await res.text();
          throw new Error(
            "API ไม่ได้ส่งข้อมูล JSON (อาจเป็น HTML หรือเกิดข้อผิดพลาดที่ฝั่ง server):\n" +
              text.slice(0, 200)
          );
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

  // รวมชั่วโมงกิจกรรม volunteer_hours ของ userId นั้นๆ (เฉพาะ completed)
  const totalVolunteerHours = activities
    .filter(evt => evt.registration_status === "completed")
    .reduce((sum, evt) => sum + (evt.hours_earned ?? evt.hour_value ?? 0), 0);

  if (loading) return <div className="p-8 text-center">กำลังโหลด...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500 whitespace-pre-wrap">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-blue-100">
      {/* Header back + Title */}
      <div className="bg-orange-300 py-4 px-6 flex items-center space-x-4 shadow-md rounded-b-xl">
        <Link to="/" className="text-2xl hover:text-orange-600 transition">←</Link>
        <h1 className="text-2xl font-bold text-gray-800">ประวัติกิจกรรม & ชั่วโมง</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* รวมชั่วโมงกิจกรรม */}
        <div className="bg-white rounded-xl shadow p-4 mb-2 flex items-center gap-4">
          <span className="text-lg font-semibold text-blue-700">รวมชั่วโมงกิจกรรมที่เสร็จสิ้น:</span>
          <span className="text-2xl font-bold text-green-600">{totalVolunteerHours}</span>
          <span className="text-lg text-gray-600">ชั่วโมง</span>
        </div>
        {/* Card ตารางกิจกรรม */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
            <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            รายการกิจกรรมที่เคยลงทะเบียน
          </h2>
          <div className="overflow-x-auto rounded-xl">
            <table className="w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="border px-4 py-2 text-left">ชื่อกิจกรรม</th>
                  <th className="border px-4 py-2 text-left">ประเภท</th>
                  <th className="border px-4 py-2 text-left">วันที่</th>
                  <th className="border px-4 py-2 text-left">ชั่วโมง</th>
                  <th className="border px-4 py-2 text-left">สถานะลงทะเบียน</th>
                </tr>
              </thead>
              <tbody>
                {activities.filter(evt => evt.registration_status === "completed").length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      ไม่พบกิจกรรมที่เสร็จสิ้น
                    </td>
                  </tr>
                )}
                {activities
                  .filter(evt => evt.registration_status === "completed")
                  .map((evt) => (
                    <tr
                      key={evt.id}
                      className={`${TYPE_MAP[evt.activity_type_id]?.color || ""} hover:bg-blue-50 transition`}
                    >
                      <td className="border px-4 py-2 font-medium">{evt.title}</td>
                      <td className="border px-4 py-2">
                        <span className="inline-block px-2 py-1 rounded bg-opacity-60 font-semibold"
                          style={{ background: TYPE_MAP[evt.activity_type_id]?.color ? undefined : "#eee" }}>
                          {TYPE_MAP[evt.activity_type_id]?.name || evt.activity_type_id}
                        </span>
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(evt.start_datetime).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {evt.hours_earned ?? evt.hour_value}
                      </td>
                      <td className="border px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold
                          bg-green-200 text-green-700`}>
                          {translateStatus(evt.registration_status)}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function translateStatus(status: string) {
  switch (status) {
    case "draft":
      return "ฉบับร่าง";
    case "pending":
      return "รอดำเนินการ";
    case "approved":
      return "อนุมัติ";
    case "rejected":
      return "ไม่อนุมัติ";
    case "completed":
      return "เสร็จสิ้น";
    case "cancelled":
      return "ยกเลิก";
    default:
      return status;
  }
}