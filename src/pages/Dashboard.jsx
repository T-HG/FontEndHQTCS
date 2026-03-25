import StatCard from '../components/common/StatCard'

const lowStockMedicines = [
  { id: 1, name: 'Paracetamol 500mg', stock: 12, expiry: '12/2026' },
  { id: 2, name: 'Amoxicillin 500mg', stock: 8, expiry: '09/2025' },
  { id: 3, name: 'Vitamin C', stock: 15, expiry: '03/2026' },
  { id: 4, name: 'Cetirizine 10mg', stock: 6, expiry: '11/2025' },
]

const recentOrders = [
  { id: 'HD001', customer: 'Nguyễn Văn A', total: '320.000đ', status: 'Đã thanh toán' },
  { id: 'HD002', customer: 'Trần Thị B', total: '185.000đ', status: 'Chờ thanh toán' },
  { id: 'HD003', customer: 'Lê Minh C', total: '560.000đ', status: 'Đã thanh toán' },
  { id: 'HD004', customer: 'Phạm Thị D', total: '240.000đ', status: 'Đã thanh toán' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold text-slate-800">Tổng quan nhà thuốc</h1>
        <p className="mt-1 text-sm text-slate-500">
          Theo dõi doanh thu, đơn hàng, thuốc tồn kho và hoạt động bán hàng
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Doanh thu hôm nay"
          value="12.500.000đ"
          subtitle="+8.5% so với hôm qua"
        />
        <StatCard
          title="Đơn hàng hôm nay"
          value="28"
          subtitle="5 đơn đang chờ xử lý"
        />
        <StatCard
          title="Thuốc sắp hết"
          value="14"
          subtitle="Cần nhập thêm trong hôm nay"
        />
        <StatCard
          title="Khách hàng"
          value="1.260"
          subtitle="Tăng 24 khách trong tuần"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Doanh thu nhanh</h2>
              <p className="text-sm text-slate-500">Tóm tắt hoạt động bán hàng trong ngày</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Tiền mặt</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">4.200.000đ</h3>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Chuyển khoản</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">6.800.000đ</h3>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Bán nợ / chờ thanh toán</p>
              <h3 className="mt-2 text-xl font-bold text-slate-800">1.500.000đ</h3>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-400">
            Khu vực biểu đồ doanh thu
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Thông báo nhanh</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              Có 4 thuốc sắp hết hạn trong tháng này
            </div>
            <div className="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">
              14 mặt hàng tồn kho thấp
            </div>
            <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
              3 đơn hàng đang chờ thanh toán
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Thuốc sắp hết hàng</h2>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white">
              Xem tất cả
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-left text-slate-600">
                <tr>
                  <th className="p-4">Tên thuốc</th>
                  <th className="p-4">Tồn kho</th>
                  <th className="p-4">Hạn dùng</th>
                </tr>
              </thead>
              <tbody>
                {lowStockMedicines.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4 font-medium text-slate-800">{item.name}</td>
                    <td className="p-4 text-red-500">{item.stock}</td>
                    <td className="p-4 text-slate-600">{item.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Đơn hàng gần đây</h2>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Chi tiết
            </button>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
              >
                <div>
                  <p className="font-semibold text-slate-800">{order.id}</p>
                  <p className="text-sm text-slate-500">{order.customer}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-slate-800">{order.total}</p>
                  <p
                    className={`text-sm ${
                      order.status === 'Đã thanh toán' ? 'text-green-600' : 'text-yellow-600'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}