import { NavLink } from 'react-router-dom'
import {
  FaChartPie,
  FaPills,
  FaWarehouse,
  FaUsers,
  FaFileInvoiceDollar,
  FaChartLine,
  FaCashRegister,
  FaCrown,
  FaCog,
  FaUserTie,
} from 'react-icons/fa'
import { FaStaffSnake } from 'react-icons/fa6';

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!user) return null

  const adminMenu = [
    { to: '/admin', label: 'Dashboard', icon: <FaChartPie /> },
    { to: '/sales', label: 'Bán hàng (POS)', icon: <FaCashRegister /> }, // <-- Thêm cho admin dễ test
    { to: '/employees', label: 'Quản lý nhân viên', icon: <FaUserTie /> },
    { to: '/medicines', label: 'Quản lý thuốc', icon: <FaPills /> },
    { to: '/inventory', label: 'Kho hàng', icon: <FaWarehouse /> },
    { to: '/customers', label: 'Khách hàng', icon: <FaUsers /> },
    { to: '/orders', label: 'Đơn hàng', icon: <FaFileInvoiceDollar /> },
    { to: '/reports', label: 'Báo cáo', icon: <FaChartLine /> },
  ]

  const staffMenu = [
    { to: '/staff', label: 'Tổng quan', icon: <FaChartPie /> },
    { to: '/sales', label: 'Bán hàng', icon: <FaCashRegister /> }, // <-- SỬA TỪ '/cashier' THÀNH '/sales'
    { to: '/orders', label: 'Đơn hàng', icon: <FaFileInvoiceDollar /> },
    { to: '/inventory', label: 'Kiểm tra kho', icon: <FaWarehouse /> },
  ]

  const menuItems = user.role === 'admin' ? adminMenu : staffMenu

  return (
    <aside className="hidden w-[280px] shrink-0 rounded-l-[32px] bg-gradient-to-b from-emerald-600 via-green-600 to-teal-500 p-5 text-white lg:flex lg:flex-col">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-xl shadow-lg backdrop-blur">
          <FaStaffSnake />
        </div>

        <div>
          <h1 className="text-xl font-bold">Pharmacy Manager</h1>
          <p className="text-sm text-white/75">
            {user.role === 'admin' ? 'Admin Dashboard' : 'Staff Dashboard'}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin' || item.to === '/staff'}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-white text-emerald-700 shadow-lg' // Mình đổi nhẹ text-indigo-700 thành emerald-700 cho hợp tông màu xanh lá của bạn
                  : 'text-white/85 hover:bg-white/15'
              }`
            }
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 rounded-[28px] bg-white/15 p-4 shadow-lg backdrop-blur">
        <div className="mb-4 flex items-center gap-2 text-white/90">
          <FaCog />
          <span className="font-medium">Trạng thái hệ thống</span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
            <span>Máy chủ</span>
            <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-emerald-100">
              Online
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2">
            <span>Đồng bộ kho</span>
            <span className="rounded-full bg-yellow-300/20 px-2 py-1 text-yellow-100">
              Ổn định
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}