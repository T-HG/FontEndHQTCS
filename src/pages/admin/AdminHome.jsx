import {
  FaArrowUp,
  FaArrowDown,
  FaCapsules,
  FaUserFriends,
  FaFileInvoiceDollar,
  FaWarehouse,
  FaArrowRight,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const stats = [
  {
    title: 'Doanh thu tháng',
    value: '285.400.000đ',
    change: '+12.5%',
    up: true,
    icon: <FaFileInvoiceDollar size={20} />,
  },
  {
    title: 'Đơn hàng',
    value: '1.248',
    change: '+8.2%',
    up: true,
    icon: <FaCapsules size={20} />,
  },
  {
    title: 'Khách hàng',
    value: '2.680',
    change: '+5.1%',
    up: true,
    icon: <FaUserFriends size={20} />,
  },
  {
    title: 'Tồn kho cảnh báo',
    value: '24',
    change: '-3.4%',
    up: false,
    icon: <FaWarehouse size={20} />,
  },
]

const recentOrders = [
  { id: 'HD001', customer: 'Nguyễn Văn A', total: '320.000đ', status: 'Đã thanh toán' },
  { id: 'HD002', customer: 'Trần Thị B', total: '185.000đ', status: 'Chờ thanh toán' },
  { id: 'HD003', customer: 'Lê Minh C', total: '560.000đ', status: 'Đã thanh toán' },
  { id: 'HD004', customer: 'Phạm Thị D', total: '240.000đ', status: 'Đã thanh toán' },
]

const lowStock = [
  { name: 'Paracetamol 500mg', stock: 12, expire: '12/2026' },
  { name: 'Amoxicillin 500mg', stock: 8, expire: '09/2025' },
  { name: 'Cetirizine 10mg', stock: 6, expire: '11/2025' },
  { name: 'Vitamin C 1000mg', stock: 15, expire: '03/2026' },
]

const topProducts = [
  { name: 'Paracetamol', sold: 120, percent: '82%' },
  { name: 'Vitamin C', sold: 98, percent: '74%' },
  { name: 'Panadol Extra', sold: 85, percent: '68%' },
  { name: 'Amoxicillin', sold: 75, percent: '61%' },
]

export default function AdminHome() {
  return (
    <div className="w-full space-y-6 pt-0 animate-in fade-in duration-300">
      {/* SECTION 1: HERO BANNER & QUICK ALERTS */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="overflow-hidden rounded-[28px] bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-8 text-white shadow-xl shadow-emerald-600/20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-100">
                  Hệ thống quản lý nhà thuốc
                </p>
                <h1 className="mt-3 text-4xl font-bold leading-tight">
                  Xin chào, Quản trị viên
                </h1>
                <p className="mt-4 max-w-xl text-emerald-50 leading-relaxed">
                  Theo dõi doanh thu, tồn kho, đơn hàng và hiệu suất hoạt động trong
                  một giao diện tập trung và trực quan.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  {/* Link chuyển đến trang báo cáo */}
                  <Link 
                    to="/reports"
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-bold text-emerald-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Xem báo cáo <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-medium text-emerald-100">Doanh thu hôm nay</p>
                  <h3 className="mt-2 text-2xl font-bold">12.500.000đ</h3>
                </div>

                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-medium text-emerald-100">Đơn hôm nay</p>
                  <h3 className="mt-2 text-2xl font-bold">28</h3>
                </div>

                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-medium text-emerald-100">Khách mới</p>
                  <h3 className="mt-2 text-2xl font-bold">24</h3>
                </div>

                <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm border border-white/10">
                  <p className="text-sm font-medium text-emerald-100">Cảnh báo kho</p>
                  <h3 className="mt-2 text-2xl font-bold">14</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Thông báo nhanh</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider">
              Hôm nay
            </span>
          </div>

          <div className="mt-6 flex-1 space-y-4 flex flex-col justify-center">
            <div className="rounded-2xl bg-red-50 p-4 transition hover:bg-red-100/80 cursor-pointer">
              <p className="font-bold text-red-600">4 thuốc sắp hết hạn</p>
              <p className="mt-1 text-sm text-red-500/80 font-medium">
                Cần kiểm tra và xử lý trong tuần này.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4 transition hover:bg-yellow-100/80 cursor-pointer">
              <p className="font-bold text-yellow-700">24 mặt hàng tồn kho thấp</p>
              <p className="mt-1 text-sm text-yellow-600/80 font-medium">
                Nên tạo phiếu nhập hàng mới sớm.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-4 transition hover:bg-blue-100/80 cursor-pointer">
              <p className="font-bold text-blue-700">3 đơn chờ xác nhận</p>
              <p className="mt-1 text-sm text-blue-600/80 font-medium">
                Hoàn tất đối soát trước 18:00.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATS CARDS */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="group rounded-[26px] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 transition group-hover:scale-110">
                {item.icon}
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                  item.up
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >
                {item.up ? <FaArrowUp size={10} /> : <FaArrowDown size={10} />}
                {item.change}
              </div>
            </div>

            <p className="mt-6 text-sm font-medium text-slate-500">{item.title}</p>
            <h3 className="mt-1 text-3xl font-bold text-slate-900">{item.value}</h3>
          </div>
        ))}
      </section>

      {/* SECTION 3: CHARTS & TOP PRODUCTS */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Hiệu suất doanh thu</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Tổng quan 12 tháng gần nhất</p>
            </div>

            <select className="rounded-2xl bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 outline-none hover:bg-slate-100 cursor-pointer">
              <option>Năm nay</option>
              <option>Năm ngoái</option>
            </select>
          </div>

          <div className="mt-8 flex h-[300px] items-end justify-between gap-2 sm:gap-4 rounded-[24px] bg-slate-50 p-6">
            {[45, 70, 58, 86, 72, 96, 80, 68, 92, 88, 98, 110].map((h, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center justify-end gap-3 cursor-pointer">
                {/* Tooltip ẩn hiện khi hover */}
                <div className="opacity-0 group-hover:opacity-100 transition duration-200 bg-slate-800 text-white text-xs py-1 px-2 rounded-lg absolute -translate-y-10 whitespace-nowrap pointer-events-none">
                  {h} Triệu
                </div>
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-500 to-teal-400 opacity-80 transition duration-300 group-hover:opacity-100 group-hover:scale-y-105 origin-bottom"
                  style={{ height: `${h * 2}px` }}
                />
                <span className="text-xs font-semibold text-slate-500 group-hover:text-emerald-600">
                  T{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Top bán chạy</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">Sản phẩm nổi bật trong tháng</p>

          <div className="mt-8 space-y-6">
            {topProducts.map((item) => (
              <div key={item.name} className="group cursor-default">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-bold text-slate-700 group-hover:text-emerald-600 transition">{item.name}</span>
                  <span className="text-sm font-medium text-slate-500">{item.sold} lượt</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
                    style={{ width: item.percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: ORDERS & LOW STOCK */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100 xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Đơn hàng gần đây</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Danh sách giao dịch mới nhất</p>
            </div>

            <Link to="/orders" className="rounded-2xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition">
              Xem tất cả
            </Link>
          </div>

          <div className="overflow-x-auto rounded-[22px] border border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr>
                  <th className="p-4 whitespace-nowrap font-medium">Mã đơn</th>
                  <th className="p-4 whitespace-nowrap font-medium">Khách hàng</th>
                  <th className="p-4 whitespace-nowrap font-medium text-right">Tổng tiền</th>
                  <th className="p-4 whitespace-nowrap font-medium text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4 font-bold text-slate-800">{item.id}</td>
                    <td className="p-4 font-medium text-slate-600">{item.customer}</td>
                    <td className="p-4 font-bold text-slate-800 text-right">{item.total}</td>
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          item.status === 'Đã thanh toán'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-yellow-50 text-yellow-700'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Tồn kho thấp</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">Cần nhập thêm sớm</p>
            </div>

            <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600">
              Cảnh báo
            </span>
          </div>

          <div className="space-y-4">
            {lowStock.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 border border-transparent hover:border-red-100 hover:bg-red-50/50 transition cursor-pointer"
              >
                <div>
                  <p className="font-bold text-slate-800">{item.name}</p>
                  <p className="mt-1 text-xs font-medium text-slate-500">Hạn dùng: {item.expire}</p>
                </div>

                <div className="text-right">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">Tồn kho</p>
                  <p className="text-xl font-black text-red-500">{item.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}