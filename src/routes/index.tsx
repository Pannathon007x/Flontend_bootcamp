import ActivitiesByType from "../pages/ActivityDetail";
import { type RouteObject, Navigate } from "react-router-dom";
import ActivityList from "../pages/ActivityList";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ActivityById from "../pages/ActivityById";


export const routes: RouteObject[] = [
  { path: "/user/:userId/:id", element: <ActivityById /> },
  { path: "/activities", element: <ActivityList /> },
  { path: "/type/:activity_type_id", element: <ActivitiesByType /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/home", element: <Navigate to="/" replace /> },
  // routes อื่น ๆ ...
];
