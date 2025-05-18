
import api from "../utils/api";
import type { AxiosResponse } from "axios";



export interface RegisterPayload {
  student_id: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  faculty: string;
  department: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}


// สมมติว่าฝั่ง Backend จะคืนแบบนี้
export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}

// POST /register
export function register(
  data: RegisterPayload
): Promise<AxiosResponse<AuthResponse>> {
  return api.post<AuthResponse>("/register", data);
}

// POST /login
export function loginStudent(
  data: LoginPayload
): Promise<AxiosResponse<AuthResponse>> {
  // เรียกไป /auth/login-student ตามที่ backend กำหนด
  return api.post<AuthResponse>("/auth/loginstudent", data);
}
