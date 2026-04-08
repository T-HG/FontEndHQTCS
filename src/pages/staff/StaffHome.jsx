import { 
  FaShoppingCart, 
  FaPills, 
  FaMoneyBillWave, 
  FaCashRegister, 
  FaWarehouse, 
  FaArrowRight 
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN').format(Number(value || 0)) + ' đ'
}

export default function StaffHome() {
  // Giả lập dữ liệu bán hàng trong ngày của nhân viên
  const shiftData = {
    ordersToday: 24,
    itemsSold: 156, // Số lượng sản phẩm đã bán
    revenue: 3450000,
  }

  return (
    <div className="w-full space-y-6 pt-0 animate-in fade-in duration-300">
      {/* HEADER */}
      <div className="flex flex-col gap-4 border-b border-slate-100 pb-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tổng quan bán hàng</h1>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi tiến độ bán hàng và công việc trong ngày của bạn
          </p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {/* Đơn hàng */}
        <div className="group rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
              <FaShoppingCart size={24} />
            </div>
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">Đơn hàng đã bán</p>
          <h3 className="mt-1 text-3xl font-bold text-slate-900">{shiftData.ordersToday}</h3>
        </div>

        {/* Sản phẩm đã bán (Thay cho Ca làm) */}
        <div className="group rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white">
              <FaPills size={24} />
            </div>
          </div>
          <p className="mt-5 text-sm font-medium text-slate-500">Sản phẩm bán ra</p>
          <h3 className="mt-1 text-3xl font-bold text-slate-900">{shiftData.itemsSold}</h3>
        </div>

        {/* Doanh thu */}
        <div className="group rounded-[24px] bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/40">
          <div className="flex items-start justify-between">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm transition group-hover:scale-110">
              <FaMoneyBillWave size={24} />
            </div>
          </div>
          <p className="mt-5 text-sm font-medium text-emerald-50">Doanh thu trong ngày</p>
          <h3 className="mt-1 text-3xl font-bold">{formatMoney(shiftData.revenue)}</h3>
        </div>
      </div>

      {/* QUICK ACTIONS (Lối tắt) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <FaCashRegister size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Bán hàng</h2>
            </div>
            <p className="text-sm text-slate-500">Mở giao diện máy tính tiền, tìm kiếm sản phẩm và tạo hóa đơn cho khách hàng.</p>
          </div>
          
          <Link 
            to="/sales" 
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 shadow-lg shadow-blue-600/30"
          >
            Mở POS ngay <FaArrowRight />
          </Link>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                <FaWarehouse size={20} />
              </div>
              <h2 className="text-xl font-bold text-slate-800">Kiểm tra kho</h2>
            </div>
            <p className="text-sm text-slate-500">Tra cứu nhanh số lượng tồn kho, giá bán và vị trí đặt thuốc trên kệ.</p>
          </div>
          
          <Link 
            to="/inventory" 
            className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-200"
          >
            Tra cứu kho <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  )
}