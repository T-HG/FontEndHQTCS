import { useState } from 'react'
import {
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaBoxOpen,
  FaUserTie,
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
  LineChart,
  Line,
} from 'recharts'

// --- DỮ LIỆU MẪU (MOCK DATA) ---

// UC06: Dữ liệu doanh thu theo thời gian
const revenueData = [
  { name: 'T2', revenue: 12000000, orders: 45 },
  { name: 'T3', revenue: 15500000, orders: 52 },
  { name: 'T4', revenue: 10200000, orders: 38 },
  { name: 'T5', revenue: 18900000, orders: 65 },
  { name: 'T6', revenue: 21000000, orders: 72 },
  { name: 'T7', revenue: 25400000, orders: 90 },
  { name: 'CN', revenue: 28000000, orders: 110 },
]

// UC06: Top 10 thuốc bán chạy
const topMedicines = [
  { id: 'SP01', name: 'Panadol Extra', qty: 1250, revenue: 18750000 },
  { id: 'SP02', name: 'Telfast BD', qty: 980, revenue: 158760000 },
  { id: 'SP03', name: 'Vitamin C 500mg', qty: 850, revenue: 8500000 },
  { id: 'SP04', name: 'Oresol', qty: 720, revenue: 3600000 },
  { id: 'SP05', name: 'Ibuprofen 400mg', qty: 640, revenue: 5056000 },
]

// UC07: Top nhân viên
const topStaff = [
  { id: 'NV01', name: 'Nguyễn Thị A', sales: 45000000, orders: 150 },
  { id: 'NV02', name: 'Trần Văn B', sales: 38000000, orders: 125 },
  { id: 'NV03', name: 'Lê Hoàng C', sales: 32000000, orders: 110 },
]

// UC07: Thuốc tồn kho thấp / sắp hết hạn
const lowStockAlerts = [
  { id: 'SP08', name: 'Tràng Vị Khang', stock: 5, status: 'Sắp hết hàng' },
  { id: 'SP12', name: 'Augmentin 1g', stock: 12, status: 'Hết hạn: 15/05/2026' },
  { id: 'SP15', name: 'Betadine 10%', stock: 2, status: 'Sắp hết hàng' },
]

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState('UC06') // UC06: Doanh thu, UC07: KPI
  const [dateFilter, setDateFilter] = useState('week')

  return (
    <div className="w-full space-y-4 pt-0">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Báo cáo & Phân tích</h1>
          <p className="mt-1 text-sm text-slate-500">
            Xem báo cáo doanh thu chi tiết và chỉ số KPI toàn hệ thống
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-200">
          <FaFileExport />
          Xuất báo cáo
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('UC06')}
          className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
            activeTab === 'UC06'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FaChartBar />
          Báo cáo doanh thu (UC06)
        </button>
        <button
          onClick={() => setActiveTab('UC07')}
          className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
            activeTab === 'UC07'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FaChartLine />
          Phân tích KPI (UC07)
        </button>
      </div>

      {/* CONTENT UC06: BÁO CÁO DOANH THU */}
      {activeTab === 'UC06' && (
        <div className="animate-in fade-in space-y-6 duration-300">
          {/* Bộ lọc */}
          <div className="flex flex-wrap items-center gap-4 rounded-[22px] bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-slate-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 outline-none"
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
              className="min-w-[250px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none"
            />
          </div>

          {/* Thống kê nhanh */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-[24px] bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg">
              <p className="text-blue-100">Tổng doanh thu</p>
              <h3 className="mt-2 text-3xl font-bold">{formatMoney(131000000)}</h3>
              <p className="mt-2 text-sm text-blue-200">+12% so với tuần trước</p>
            </div>
            <div className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-slate-100">
              <p className="text-slate-500">Tổng số đơn hàng</p>
              <h3 className="mt-2 text-3xl font-bold text-slate-800">
                472 <span className="text-lg font-normal text-slate-500">đơn</span>
              </h3>
              <p className="mt-2 text-sm text-emerald-500">+5% so với tuần trước</p>
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
                    <RechartsTooltip cursor={{ fill: '#f1f5f9' }} formatter={(value) => formatMoney(value)} />
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
                      <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${index < 3 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-500'}`}
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
      )}

      {/* CONTENT UC07: PHÂN TÍCH KPI */}
      {activeTab === 'UC07' && (
        <div className="animate-in fade-in space-y-6 duration-300">
          {/* Note PowerBI (Nếu dùng Iframe thì chèn vào đây) */}
          <div className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <strong>Ghi chú:</strong> Đây là Dashboard nội bộ. Nếu công ty sử dụng Power BI, bạn có thể nhúng
            liên kết Iframe Power BI trực tiếp vào vùng này.
          </div>

          {/* Thống kê KPI */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-500">Doanh thu hôm nay</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">{formatMoney(28000000)}</h3>
              <p className="mt-1 text-xs font-medium text-emerald-500">Đạt 115% KPI ngày</p>
            </div>
            <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-500">Số đơn TB / Ngày</p>
              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                67 <span className="text-sm font-normal text-slate-500">đơn</span>
              </h3>
            </div>
            <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-slate-100">
              <p className="text-sm text-slate-500">Tỷ lệ hoàn thành mục tiêu tháng</p>
              <h3 className="mt-1 text-2xl font-bold text-emerald-600">82.5%</h3>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full bg-emerald-500" style={{ width: '82.5%' }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Biểu đồ xu hướng (Chiếm 2 cột) */}
            <div className="rounded-[24px] bg-white p-6 shadow-lg ring-1 ring-slate-100 xl:col-span-2">
              <h3 className="mb-6 font-bold text-slate-800">Xu hướng doanh thu & Đơn hàng</h3>
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                    <YAxis
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b' }}
                      width={80}
                      tickFormatter={(value) => value.toLocaleString('vi-VN')}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b' }}
                    />
                    <RechartsTooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Doanh thu"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      name="Đơn hàng"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Cột phải: Top Staff & Cảnh báo kho */}
            <div className="flex flex-col gap-6">
              {/* Top nhân viên */}
              <div className="flex-1 rounded-[24px] bg-white p-5 shadow-lg ring-1 ring-slate-100">
                <div className="mb-4 flex items-center gap-2 text-slate-800">
                  <FaUserTie className="text-blue-500" />
                  <h3 className="font-bold">Top nhân viên bán hàng</h3>
                </div>
                <div className="space-y-4">
                  {topStaff.map((staff, i) => (
                    <div key={staff.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                          #{i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-800">{staff.name}</p>
                          <p className="text-xs text-slate-500">{staff.orders} đơn</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-blue-600">{formatMoney(staff.sales)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cảnh báo kho */}
              <div className="flex-1 rounded-[24px] bg-white p-5 shadow-lg ring-1 ring-slate-100">
                <div className="mb-4 flex items-center gap-2 text-slate-800">
                  <FaBoxOpen className="text-red-500" />
                  <h3 className="font-bold">Cần chú ý (Kho & HSD)</h3>
                </div>
                <div className="space-y-3">
                  {lowStockAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between rounded-xl bg-red-50 p-3">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{alert.name}</p>
                        <p className="mt-0.5 text-xs text-red-600">{alert.status}</p>
                      </div>
                      <p className="text-sm font-bold text-slate-700">Còn: {alert.stock}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}