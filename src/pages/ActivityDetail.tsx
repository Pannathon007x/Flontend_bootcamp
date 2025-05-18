import React, { useEffect, useState } from "react";
import { fetchActivitiesByType, type ActivityByType } from "../services/activityService";
import { useParams, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: number;
}

export default function ActivitiesByType() {
  const { activity_type_id } = useParams<{ activity_type_id: string }>();
  const [activities, setActivities] = useState<ActivityByType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // ดึง userId จาก token ใน localStorage
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        setUserId(decoded.userId);
      } catch (e) {
        console.error("Invalid token", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!activity_type_id) {
      setError("ต้องระบุประเภทกิจกรรม");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetchActivitiesByType(Number(activity_type_id))
      .then((res) => {
        if (res.success) {
          setActivities(res.data);
        } else {
          setError("โหลดกิจกรรมไม่สำเร็จ");
        }
      })
      .catch(() => setError("เกิดข้อผิดพลาดในการโหลดข้อมูล"))
      .finally(() => setLoading(false));
  }, [activity_type_id]);

  if (loading) return <div>กำลังโหลดกิจกรรม...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        กิจกรรมประเภท #{activity_type_id}
      </h1>

      {activities.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">ไม่มีข้อมูลกิจกรรมในประเภทนี้</p>
      ) : (
        <ul className="space-y-6">
          {activities.map((a) => (
            <li key={a.id}>
              {userId ? (
                <Link
                  to={`/user/${userId}/${a.id}`}
                  className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200"
                >
                  <h2 className="text-blue-600 font-semibold text-xl mb-2">{a.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{a.description}</p>

                  <div className="mt-4 flex flex-wrap gap-6 text-xs text-gray-500 font-medium">
                    <span>
                      <strong>เริ่ม:</strong> {new Date(a.start_datetime).toLocaleString()}
                    </span>
                    <span>
                      <strong>สิ้นสุด:</strong> {new Date(a.end_datetime).toLocaleString()}
                    </span>
                    <span>
                      รับสูงสุด: <strong>{a.max_participants}</strong> คน
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="block bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h2 className="text-blue-600 font-semibold text-xl mb-2">{a.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{a.description}</p>
                  <div className="mt-4 flex flex-wrap gap-6 text-xs text-gray-500 font-medium">
                    <span>
                      <strong>เริ่ม:</strong> {new Date(a.start_datetime).toLocaleString()}
                    </span>
                    <span>
                      <strong>สิ้นสุด:</strong> {new Date(a.end_datetime).toLocaleString()}
                    </span>
                    <span>
                      รับสูงสุด: <strong>{a.max_participants}</strong> คน
                    </span>
                  </div>
                  <p className="mt-2 text-red-600 text-center">กรุณาเข้าสู่ระบบเพื่อดูรายละเอียด</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
