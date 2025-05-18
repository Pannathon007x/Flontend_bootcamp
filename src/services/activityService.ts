import api from "../utils/api";
import type { AxiosResponse } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface ActivityByType {
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
}

// ฟังก์ชันเรียก API ดึงกิจกรรมตามประเภท
export async function fetchActivitiesByType(
  activity_type_id: number
): Promise<{ success: boolean; data: ActivityByType[] }> {
  try {
    const response = await api.get(`/activity/type/${activity_type_id}`);
    return response.data;
  } catch (error) {
    console.error("fetchActivitiesByType error:", error);
    return { success: false, data: [] };
  }
}

export interface ActivityType {
  id: number;
  name: string;
  description: string;
}

export interface ActivityPayload {
  name: string;
  description: string;
  type: "อาสา" | "ช่วยงาน" | "อบรม";
  startDate: string;
  endDate: string;
  maxParticipants: number;
}

export interface Activity extends ActivityPayload {
  activity_type_id: number;
  id: string;
  start_datetime?: string;
  end_datetime?: string;
  location?: string;
  max_participants?: number;
  hour_value?: number;
  creator_id?: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export async function fetchActivityTypes(): Promise<ActivityType[]> {
  const res = await api.get("/user/activity/types");
  return res.data;
}

export function fetchActivityById(id: number): Promise<AxiosResponse<{ data: Activity }>> {
  return api.get<{ data: Activity }>(`/activity/${id}`);
}

export function fetchPendingActivities(): Promise<AxiosResponse<Activity[]>> {
  return api.get<Activity[]>("/activities", {
    params: { status: "pending" },
  });
}

export function userJoinActivity(userId: number, activityId: number): Promise<AxiosResponse> {
  return api.post(`/user/join/${userId}/${activityId}`);
}

