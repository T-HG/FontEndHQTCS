import { useState } from 'react'
import {
  FaCalendarAlt,
  FaFileExport,
} from 'react-icons/fa'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'

// --- DỮ LIỆU MẪU (MOCK DATA) ---

// Dữ liệu doanh thu theo thời gian
const revenueData = [
  { name: 'T2', revenue: 12000000, orders: 45 },
  { name: 'T3', revenue: 15500000, orders: 52 },
  { name: 'T4', revenue: 10200000, orders: 38 },
  { name: 'T5', revenue: 18900000, orders: 65 },
  { name: 'T6', revenue: 21000000, orders: 72 },
  { name: 'T7', revenue: 25400000, orders: 90 },
  { name: 'CN', revenue: 28000000, orders: 110 },
]

// Top 10 thuốc bán chạy
const topMedicines = [
  { id: 'SP01', name: 'Panadol Extra', qty: 1250, revenue: 18750000 },
  { id: 'SP02', name: 'Telfast BD', qty: 980, revenue: 158760000 },
  { id: 'SP03', name: 'Vitamin C 500mg', qty: 850, revenue: 8500000 },
  { id: 'SP04', name: 'Oresol', qty: 720, revenue: 3600000 },
  { id: 'SP05', name: 'Ibuprofen 400mg', qty: 640, revenue: 5056000 },
]

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export default function AdminRevenueReport() {
  const [dateFilter, setDateFilter] = useState('week')

  return (
    <section id="bao-cao-doanh-thu" className="scroll-mt-6 space-y-6">
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Báo cáo doanh thu</h2>
          <p className="mt-1 text-sm text-slate-500">
            Xem báo cáo doanh thu chi tiết toàn hệ thống
          </p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
        >
          <FaFileExport />
          Xuất báo cáo
        </button>
      </div>

      {/* CONTENT: BÁO CÁO DOANH THU */}
      <div className="space-y-6">
        {/* Bộ lọc */}
        <div className="flex flex-wrap items-center gap-4 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-slate-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 transition"
            >
              <option value="day">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên thuốc..."
            className="min-w-[250px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-blue-400 transition focus:bg-white"
          />
        </div>

        {/* Thống kê nhanh */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-[24px] bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg shadow-blue-500/20">
            <p className="text-blue-100 font-medium">Tổng doanh thu</p>
            <h3 className="mt-2 text-3xl font-bold">{formatMoney(131000000)}</h3>
            <p className="mt-2 text-sm text-blue-200">+12% so với tuần trước</p>
          </div>
          <div className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition">
            <p className="text-slate-500 font-medium">Tổng số đơn hàng</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-800">
              472 <span className="text-lg font-normal text-slate-500">đơn</span>
            </h3>
            <p className="mt-2 text-sm font-medium text-emerald-500">+5% so với tuần trước</p>
          </div>
        </div>

        {/* Biểu đồ & Top Thuốc */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Biểu đồ cột */}
          <div className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-slate-100">
            <h3 className="mb-6 font-bold text-slate-800">Doanh thu theo thời gian</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748b' }}
                    width={80}
                    tickFormatter={(value) => value.toLocaleString('vi-VN')}
                  />
                  <RechartsTooltip cursor={{ fill: '#f8fafc' }} formatter={(value) => formatMoney(value)} />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Doanh thu" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Thuốc */}
          <div className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-slate-100">
            <h3 className="mb-4 font-bold text-slate-800">Top 5 thuốc bán chạy nhất</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-slate-500">
                    <th className="pb-3 font-medium">Tên thuốc</th>
                    <th className="pb-3 text-right font-medium">Đã bán</th>
                    <th className="pb-3 text-right font-medium">Doanh thu</th>
                  </tr>
                </thead>
                <tbody>
                  {topMedicines.map((item, index) => (
                    <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                              index < 3 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className="font-medium text-slate-700">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-600">{item.qty}</td>
                      <td className="py-3 text-right font-medium text-slate-800">
                        {formatMoney(item.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}