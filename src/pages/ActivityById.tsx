import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchActivityById, type Activity, userJoinActivity } from "../services/activityService";

export default function ActivityById() {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);

  // ดึง userId จาก localStorage ที่ login เก็บไว้
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId ? Number(storedUserId) : null);
  }, []);

  useEffect(() => {
    if (!id) {
      setError("ไม่พบรหัสกิจกรรม");
      setLoading(false);
      return;
    }
    setLoading(true);
    fetchActivityById(Number(id))
      .then((response) => {
        setActivity(response.data.data as Activity);
      })
      .catch(() => {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูลกิจกรรม");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleJoinActivity = async () => {
  if (!activity) return;
  if (!userId) {
    setJoinError("กรุณาเข้าสู่ระบบก่อนสมัครกิจกรรม");
    return;
  }

  // แปลง userId และ activity.id เป็นตัวเลขเสมอ
  const numericUserId = Number(userId);
  const numericActivityId = Number(activity.id);

  if (isNaN(numericUserId) || isNaN(numericActivityId)) {
    setJoinError("ข้อมูลผู้ใช้หรือกิจกรรมไม่ถูกต้อง");
    return;
  }

  setJoinLoading(true);
  setJoinError(null);
  setJoinSuccess(null);

  try {
    // ส่งเลขไปที่ service
    const res = await userJoinActivity(numericUserId, numericActivityId);
    if (res.data?.status === "SUCCESS" || res.data?.success) {
      setJoinSuccess(res.data.message);
    } else {
      setJoinError(res.data?.message || "สมัครกิจกรรมไม่สำเร็จ");
    }
  } catch (err: any) {
    setJoinError(err?.response?.data?.message || "เกิดข้อผิดพลาดในการสมัครกิจกรรม");
  } finally {
    setJoinLoading(false);
  }
};

  if (loading) return <p>กำลังโหลดข้อมูลกิจกรรม...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!activity) return <p>ไม่พบข้อมูลกิจกรรม</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300 p-4">
      <div className="bg-white shadow-lg rounded-xl max-w-3xl w-full p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{activity.title}</h1>
        <p className="mb-6 text-gray-700 whitespace-pre-line">{activity.description}</p>

        <div className="space-y-3 text-gray-600 text-lg">
          <p><strong>เริ่มวันที่:</strong> {activity.start_datetime ? new Date(activity.start_datetime).toLocaleString() : "-"}</p>
          <p><strong>สิ้นสุดวันที่:</strong> {activity.end_datetime ? new Date(activity.end_datetime).toLocaleString() : "-"}</p>
          <p><strong>สถานที่:</strong> {activity.location || "-"}</p>
          <p><strong>รับสมัครสูงสุด:</strong> {activity.max_participants ?? "-"} คน</p>
          <p><strong>สถานะ:</strong> {translateStatus(activity.status ?? "")}</p>
        </div>

        {joinError && <p className="mt-4 text-red-600">{joinError}</p>}
        {joinSuccess && <p className="mt-4 text-green-600">{joinSuccess}</p>}

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-block bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
          >
            ย้อนกลับ
          </button>

          <button
            type="button"
            disabled={joinLoading}
            onClick={handleJoinActivity}
            className={`inline-block px-6 py-3 rounded-lg transition
              ${joinLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
          >
            {joinLoading ? "กำลังสมัคร..." : "สมัครกิจกรรม"}
          </button>
        </div>
      </div>
    </div>
  );
}

function translateStatus(status: string): string {
  switch (status) {
    case "draft": return "ร่าง";
    case "pending": return "รอดำเนินการ";
    case "approved": return "อนุมัติแล้ว";
    case "rejected": return "ถูกปฏิเสธ";
    case "completed": return "เสร็จสมบูรณ์";
    case "cancelled": return "ยกเลิก";
    default: return "ไม่ทราบสถานะ";
  }
}