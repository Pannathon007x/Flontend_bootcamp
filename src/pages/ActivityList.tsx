import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchActivityTypes, type ActivityType } from "../services/activityService";

export default function ActivityList() {
  const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
  fetchActivityTypes()
    .then(activityTypes => {
      setActivityTypes(activityTypes);
    })
    .catch(err => {
      console.error("Error loading activity types:", err);
    })
    .finally(() => setLoading(false));
}, []);



  if (loading) {
    return <div className="p-4">กำลังโหลดประเภทกิจกรรม...</div>;
  }

  return (
    <div className="p-4 space-y-4">
      {activityTypes.map(type => (
        <div
          key={type.id}
          className="flex items-center justify-between border p-4 rounded hover:shadow"
        >
          <div>
            <h3 className="text-lg font-bold">{type.name}</h3>
            <p className="text-sm text-gray-600 line-clamp-3">{type.description}</p>
          </div>

          <Link
            to={`/type/${type.id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            ดูกิจกรรม
          </Link>
        </div>
      ))}
    </div>
  );
}
