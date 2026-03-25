import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import ProtectedRoute from '../components/common/ProtectedRoute'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import AdminHome from '../pages/admin/AdminHome'
import StaffHome from '../pages/staff/StaffHome'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin" replace />} />

        <Route
          path="admin"
          element={
            <ProtectedRoute allowRoles={['admin']}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        <Route
          path="staff"
          element={
            <ProtectedRoute allowRoles={['staff', 'admin']}>
              <StaffHome />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}