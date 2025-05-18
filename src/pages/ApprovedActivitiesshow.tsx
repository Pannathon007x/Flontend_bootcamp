
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchActivities, type Activity } from "../services/activityService";

// สีฝั่งซ้ายตามประเภทกิจกรรม
const TYPE_COLORS: Record<Activity["type"], string> = {
  อาสา: "bg-pink-300",
  ช่วยงาน: "bg-green-200",
  อบรม: "bg-green-200",
};

export default function ApprovedActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  // สำหรับ Search & Filter & Pagination
  const [searchTerm, setSearchTerm]     = useState("");
  const [filterType, setFilterType]     = useState("");
  const [currentPage, setCurrentPage]   = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    fetchActivities()
      .then(list=> {
        setActivities(list);
      })
      .catch(() => setError("โหลดรายการไม่สำเร็จ"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">กำลังโหลดกิจกรรม...</div>;
  if (error)   return <div className="p-4 text-red-600">{error}</div>;

  // 1. Search by name
  let filtered = activities.filter(a =>
    a.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // 2. Filter by type
  if (filterType) {
    filtered = filtered.filter(a => a.type === filterType);
  }

  // 3. Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="ค้นหาชื่อกิจกรรม…"
          value={searchTerm}
          onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          className="flex-1 border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
        />

        {/* Filter */}
        <select
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setCurrentPage(1); }}
          className="border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
        >
          <option value="">ทุกประเภท</option>
          <option value="อาสา">อาสา</option>
          <option value="ช่วยงาน">ช่วยงาน</option>
          <option value="อบรม">อบรม</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-4">
        {pageItems.map(a => (
          <div
            key={a.id}
            className="flex overflow-hidden rounded-lg shadow bg-gray-100"
          >
            {/* แถบสีฝั่งซ้าย */}
            <div className={`${TYPE_COLORS[a.type]} w-24 flex items-center justify-center`}>
              <span className="font-bold">{a.type}</span>
            </div>
            {/* เนื้อหา */}
            <div className="flex-1 p-4">
              <h3 className="text-xl font-semibold">{a.name}</h3>
              <p className="text-gray-700 italic mb-2">"{a.description}"</p>
              <p className="text-sm text-red-600">
                วันที่ {new Date(a.startDate).toLocaleDateString()} –{" "}
                {new Date(a.endDate).toLocaleDateString()}
              </p>
            </div>
            {/* ปุ่มดูรายละเอียด */}
            <div className="flex items-center pr-4">
              <Link
                to={`/activities/${a.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                ดูรายละเอียด
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`px-3 py-1 border rounded ${
                n === currentPage
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      )}
    </div>
  );
}
