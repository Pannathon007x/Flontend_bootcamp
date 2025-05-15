// src/pages/ActivityList.tsx
import { useEffect, useState } from "react";
import { fetchActivities } from "../utils/activityService";

interface Activity {
  id: number;
  title: string;
  body: string;
}

export default function ActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities()
      .then(res => {
        // ถ้าใช้ axios
        const data = res.data as Activity[];
        // ถ้าใช้ fetch ให้ใช้: const data = res as Activity[];
        console.log("กิจกรรมที่ดึงมา:", data);
        setActivities(data.slice(0, 10));  // เอาแค่ 10 รายการแรก
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">กำลังโหลดกิจกรรม...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">รายการกิจกรรม (Mock)</h2>
      <ul className="space-y-2">
        {activities.map(a => (
          <li key={a.id} className="border p-2 rounded hover:shadow">
            <h3 className="font-bold">{a.title}</h3>
            <p className="text-sm text-gray-700">{a.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
