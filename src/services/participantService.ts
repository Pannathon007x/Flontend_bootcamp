import api from "../utils/api";
import type { AxiosResponse } from "axios";

export interface Participant {
  id: string;
  studentId: string;
  name: string;
  status: "รออนุมัติ" | "อนุมัติ" | "ปฏิเสธ";
}

// ดึงรายชื่อนิสิตทั้งหมด
export function fetchParticipantsByActivityId(
  activityId: string
): Promise<AxiosResponse<Participant[]>> {
  return api.get<Participant[]>(
    `/activities/${activityId}/participants`
  );
}

// ดึงเฉพาะที่รออนุมัติ
export function fetchPendingParticipants(
  activityId: string
): Promise<AxiosResponse<Participant[]>> {
  return api.get<Participant[]>(`/activities/${activityId}/participants`, {
    params: { status: "รออนุมัติ" }
  });
}

// อนุมัติผู้สมัคร
export function approveParticipant(
  activityId: string,
  participantId: string
): Promise<AxiosResponse<void>> {
  return api.patch<void>(
    `/activities/${activityId}/participants/${participantId}/approve`
  );
}

// ปฏิเสธผู้สมัคร
export function rejectParticipant(
  activityId: string,
  participantId: string
): Promise<AxiosResponse<void>> {
  return api.patch<void>(
    `/activities/${activityId}/participants/${participantId}/reject`
  );
}
