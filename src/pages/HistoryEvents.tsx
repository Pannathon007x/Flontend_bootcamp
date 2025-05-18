// src/pages/HistoryEvents.tsx
import { Link } from "react-router-dom";

interface Profile {
  studentId: string;
  fullName: string;
  faculty: string;
  department: string;
  totalHours: number;
}

interface HistoryItem {
  id: string;
  name: string;
  type: "อาสา" | "ช่วยงาน" | "อบรม";
  date: string;       // ISO date
  hours: number;
}

export default function HistoryEvents() {
  // mock โปรไฟล์
  const profile: Profile = {
    studentId: "63040123",
    fullName: "สมชาย ใจดี",
    faculty: "วิทยาศาสตร์",
    department: "คอมพิวเตอร์",
    totalHours: 42,
  };

  // mock ประวัติกิจกรรม แบ่งตามปีการศึกษา
  const history: Record<string, HistoryItem[]> = {
    "ปีการศึกษา 2565": [
      { id: "e1", name: "อบรมเชิงปฏิบัติการ", type: "อบรม", date: "2025-01-06", hours: 4 },
      { id: "e2", name: "กิจกรรมอาสา",    type: "อาสา", date: "2025-05-07", hours: 3 },
    ],
    "ปีการศึกษา 2564": [
      { id: "e3", name: "การสัมมนา",      type: "อบรม", date: "2024-09-15", hours: 2 },
    ],
  };

  // สีแถวตามประเภทกิจกรรม
  const ROW_COLORS: Record<HistoryItem["type"], string> = {
    อาสา:    "bg-red-100",
    ช่วยงาน: "bg-yellow-100",
    อบรม:    "bg-green-100",
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header back + Title */}
      <div className="bg-orange-200 py-4 px-6 flex items-center space-x-4 shadow">
        <Link to="/" className="text-2xl">←</Link>
        <h1 className="text-2xl font-bold">ประวัติกิจกรรม & ชั่วโมง</h1>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile */}
        <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full" />
          <div>
            <h2 className="text-2xl font-semibold">{profile.fullName}</h2>
            <p className="text-gray-600">รหัสนิสิต: {profile.studentId}</p>
            <p className="text-gray-600">{profile.faculty} / {profile.department}</p>
            <p className="mt-2 text-blue-600 font-medium">
              รวมชั่วโมงทั้งหมด: {profile.totalHours} ชม.
            </p>
          </div>
        </div>

        {/* ประวัติแยกตามปีการศึกษา */}
        {Object.entries(history).map(([year, items]) => (
          <div key={year} className="space-y-4">
            <div className="inline-block bg-gray-300 text-gray-700 rounded-full px-4 py-1 font-medium">
              {year}
            </div>

            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 text-left">ชื่อกิจกรรม</th>
                  <th className="border px-4 py-2 text-left">ประเภท</th>
                  <th className="border px-4 py-2 text-left">วันที่</th>
                  <th className="border px-4 py-2 text-left">ชั่วโมง</th>
                </tr>
              </thead>
              <tbody>
                {items.map(evt => (
                  <tr key={evt.id} className={`${ROW_COLORS[evt.type]} hover:bg-gray-100`}>
                    <td className="border px-4 py-2">{evt.name}</td>
                    <td className="border px-4 py-2">{evt.type}</td>
                    <td className="border px-4 py-2">
                      {new Date(evt.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{evt.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
