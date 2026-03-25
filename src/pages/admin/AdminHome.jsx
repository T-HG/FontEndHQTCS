import {
  FaArrowUp,
  FaArrowDown,
  FaCapsules,
  FaUserFriends,
  FaFileInvoiceDollar,
  FaWarehouse,
} from 'react-icons/fa'

const stats = [
  {
    title: 'Doanh thu tháng',
    value: '285.400.000đ',
    change: '+12.5%',
    up: true,
    icon: <FaFileInvoiceDollar />,
  },
  {
    title: 'Đơn hàng',
    value: '1.248',
    change: '+8.2%',
    up: true,
    icon: <FaCapsules />,
  },
  {
    title: 'Khách hàng',
    value: '2.680',
    change: '+5.1%',
    up: true,
    icon: <FaUserFriends />,
  },
  {
    title: 'Tồn kho cảnh báo',
    value: '24',
    change: '-3.4%',
    up: false,
    icon: <FaWarehouse />,
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
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
<div className="overflow-hidden rounded-[28px] bg-gradient-to-r from-emerald-500 via-green-500 to-teal-400 p-7 text-white shadow-xl">            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-white/75">
                  Hệ thống quản lý nhà thuốc
                </p>
                <h1 className="mt-3 text-4xl font-bold leading-tight">
                  Xin chào, quản trị viên
                </h1>
                <p className="mt-3 max-w-xl text-white/85">
                  Theo dõi doanh thu, tồn kho, đơn hàng và hiệu suất hoạt động trong
                  một giao diện tập trung.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-2xl bg-white px-5 py-3 font-semibold text-indigo-700 shadow">
                    Xem báo cáo
                  </button>
                  <button className="rounded-2xl border border-white/40 px-5 py-3 font-semibold text-white">
                    Xuất dữ liệu
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Doanh thu hôm nay</p>
                  <h3 className="mt-2 text-2xl font-bold">12.500.000đ</h3>
                </div>

                <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Đơn hôm nay</p>
                  <h3 className="mt-2 text-2xl font-bold">28</h3>
                </div>

                <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Khách mới</p>
                  <h3 className="mt-2 text-2xl font-bold">24</h3>
                </div>

                <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
                  <p className="text-sm text-white/80">Cảnh báo kho</p>
                  <h3 className="mt-2 text-2xl font-bold">14</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Thông báo nhanh</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
              Hôm nay
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-red-50 p-4">
              <p className="font-semibold text-red-600">4 thuốc sắp hết hạn</p>
              <p className="mt-1 text-sm text-red-500">
                Cần kiểm tra và xử lý trong tuần này.
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-4">
              <p className="font-semibold text-yellow-700">24 mặt hàng tồn kho thấp</p>
              <p className="mt-1 text-sm text-yellow-600">
                Nên tạo phiếu nhập hàng mới.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="font-semibold text-blue-700">3 đơn chờ xác nhận</p>
              <p className="mt-1 text-sm text-blue-600">
                Hoàn tất đối soát trước 18:00.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.title}
            className="rounded-[26px] bg-white p-5 shadow-lg ring-1 ring-slate-100"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow">
                {item.icon}
              </div>

              <div
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  item.up
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-rose-50 text-rose-600'
                }`}
              >
                {item.up ? <FaArrowUp /> : <FaArrowDown />}
                {item.change}
              </div>
            </div>

            <p className="mt-5 text-sm text-slate-500">{item.title}</p>
            <h3 className="mt-2 text-3xl font-bold text-slate-900">{item.value}</h3>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100 xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Hiệu suất doanh thu</h2>
              <p className="text-sm text-slate-500">Tổng quan 6 tháng gần nhất</p>
            </div>

            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
              Tháng này
            </div>
          </div>

          <div className="mt-8 flex h-[300px] items-end justify-between gap-4 rounded-[24px] bg-slate-50 p-6">
            {[45, 70, 58, 86, 72, 96, 80, 68, 92, 88, 98, 110].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center justify-end gap-3">
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-violet-600 to-sky-400"
                  style={{ height: `${h * 2}px` }}
                />
                <span className="text-xs text-slate-500">
                  T{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Top bán chạy</h2>
          <p className="text-sm text-slate-500">Sản phẩm nổi bật trong tháng</p>

          <div className="mt-6 space-y-5">
            {topProducts.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-700">{item.name}</span>
                  <span className="text-sm text-slate-500">{item.sold} lượt</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500"
                    style={{ width: item.percent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-[28px] bg-white p-6 shadow-lg ring-1 ring-slate-100 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Đơn hàng gần đây</h2>
              <p className="text-sm text-slate-500">Danh sách giao dịch mới nhất</p>
            </div>

            <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Xem tất cả
            </button>
          </div>

          <div className="overflow-hidden rounded-[22px] border border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left text-slate-500">
                <tr>
                  <th className="p-4">Mã đơn</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Tổng tiền</th>
                  <th className="p-4">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="p-4 font-semibold text-slate-800">{item.id}</td>
                    <td className="p-4 text-slate-600">{item.customer}</td>
                    <td className="p-4 font-semibold text-slate-800">{item.total}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
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
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Tồn kho thấp</h2>
              <p className="text-sm text-slate-500">Cần nhập thêm sớm</p>
            </div>

            <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
              Cảnh báo
            </span>
          </div>

          <div className="space-y-4">
            {lowStock.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <p className="mt-1 text-sm text-slate-500">Hạn dùng: {item.expire}</p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-slate-500">Tồn kho</p>
                  <p className="text-lg font-bold text-red-500">{item.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}