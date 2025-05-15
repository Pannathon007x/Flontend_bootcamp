import api from "./api";

// แทนที่จะเรียก `/activities` บน backend จริง
// ให้ตรงไปดึงจาก JSONPlaceholder แทน
export const fetchActivities = () =>
  api.get("https://jsonplaceholder.typicode.com/posts");
