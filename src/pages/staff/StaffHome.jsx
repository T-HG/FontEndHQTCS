export default function StaffHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Trang nhân viên</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Đơn hàng hôm nay</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">12</h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Ca làm hiện tại</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">Sáng</h3>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Khách đang chờ</p>
          <h3 className="mt-2 text-2xl font-bold text-slate-800">5</h3>
        </div>
      </div>
    </div>
  )
}