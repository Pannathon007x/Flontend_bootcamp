import { useEffect, useState } from "react";

interface Activity {
  id: number;
  activity_type_id: number;
  hours_earned: number | null;
  hour_value: number | null;
  registration_status: string;
}

interface UserProfile {
  student_id: string;
  first_name: string;
  last_name: string;
  faculty: string;
  major: string;
  year: string;
}

const TYPE_MAP: Record<number, { name: string; color: string }> = {
  1: { name: "อาสา", color: "bg-pink-200" },
  2: { name: "ช่วยงาน", color: "bg-yellow-100" },
  3: { name: "อบรม", color: "bg-green-200" },
};

export default function UserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // ดึงข้อมูล user จาก userId
    if (userId) {
      fetch(`${API_URL}/user/profile/${userId}`)
        .then((res) => res.json())
        .then((data) => setUser(data.profile))
        .catch(() => setUser(null));
    }

    // ดึงกิจกรรมที่เสร็จสิ้น
    fetch(`${API_URL}/user/registed?id=${userId}`)
      .then((res) => res.json())
      .then((data) => setActivities(data.activities || []))
      .finally(() => setLoading(false));
  }, [API_URL, userId]);

  // รวมชั่วโมงกิจกรรมที่เสร็จสิ้น
  const completed = activities.filter((a) => a.registration_status === "completed");
  const totalHours = completed.reduce((sum, a) => sum + (a.hours_earned ?? a.hour_value ?? 0), 0);
  const hoursByType = [1, 2, 3].map((typeId) =>
    completed
      .filter((a) => a.activity_type_id === typeId)
      .reduce((sum, a) => sum + (a.hours_earned ?? a.hour_value ?? 0), 0)
  );

  if (loading) return <div className="p-8 text-center">กำลังโหลด...</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
  <div className="max-w-3xl mx-auto">
    {/* User Info Card */}
    <div className="bg-blue-100 rounded-xl shadow px-8 py-6 mb-8">
  <div className="flex flex-col gap-2">
    <div className="text-2xl font-bold tracking-widest">{user?.student_id || ""}</div>
    <div className="text-xl font-semibold">{user?.first_name || "ชื่อ"}-{user?.last_name || "สกุล"}</div>
    <div className="text-gray-700">{user?.faculty || "คณะ"}</div>
    <div className="text-gray-700">{user?.email || ""}</div>
  </div>
</div>

    {/* ชั่วโมงรวมกิจกรรม */}
    <div className="mt-8">
      <div className="text-xl font-semibold mb-2">ชั่วโมงรวมกิจกรรมที่ได้</div>
      <div className="border rounded-xl flex justify-between items-center px-8 py-4 mb-4 bg-white">
        <span className="text-lg w-24 text-left">รวม</span>
        <span className="text-2xl font-bold tracking-widest w-24 text-center">{totalHours.toString().padStart(4, "0")}</span>
        <span className="text-lg w-24 text-right">ชั่วโมง</span>
      </div>
      <div className="space-y-4">
        <div className="rounded-xl flex justify-between items-center px-8 py-4" style={{ background: "#f9d6fa" }}>
          <span className="text-lg w-24 text-left">อาสา</span>
          <span className="text-2xl font-bold tracking-widest w-24 text-center">{hoursByType[0].toString().padStart(4, "0")}</span>
          <span className="text-lg w-24 text-right">ชั่วโมง</span>
        </div>
        <div className="rounded-xl flex justify-between items-center px-8 py-4" style={{ background: "#f7fbc6" }}>
          <span className="text-lg w-24 text-left">ช่วยงาน</span>
          <span className="text-2xl font-bold tracking-widest w-24 text-center">{hoursByType[1].toString().padStart(4, "0")}</span>
          <span className="text-lg w-24 text-right">ชั่วโมง</span>
        </div>
        <div className="rounded-xl flex justify-between items-center px-8 py-4" style={{ background: "#b8fbb8" }}>
          <span className="text-lg w-24 text-left">อบรม</span>
          <span className="text-2xl font-bold tracking-widest w-24 text-center">{hoursByType[2].toString().padStart(4, "0")}</span>
          <span className="text-lg w-24 text-right">ชั่วโมง</span>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}