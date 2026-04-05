import { useState, useMemo } from 'react'
import {
  FaSearch,
  FaUserPlus,
  FaTrash,
  FaMinus,
  FaPlus,
  FaMoneyBillWave,
  FaTimes,
  FaPhoneAlt
} from 'react-icons/fa'

// --- DỮ LIỆU MẪU ---
const mockMedicines = [
  { id: 'SP001', name: 'Panadol Extra', unit: 'Vỉ', price: 15000, stock: 120, category: 'Giảm đau' },
  { id: 'SP002', name: 'Telfast BD 60mg', unit: 'Viên', price: 162000, stock: 50, category: 'Dị ứng' },
  { id: 'SP003', name: 'Vitamin C 500mg', unit: 'Hộp', price: 85000, stock: 30, category: 'Bổ sung' },
  { id: 'SP004', name: 'Oresol vị cam', unit: 'Gói', price: 5000, stock: 200, category: 'Tiêu hóa' },
  { id: 'SP005', name: 'Ibuprofen 400mg', unit: 'Viên', price: 7900, stock: 100, category: 'Giảm đau' },
  { id: 'SP006', name: 'Tràng Vị Khang', unit: 'Hộp', price: 90000, stock: 15, category: 'Tiêu hóa' },
  { id: 'SP007', name: 'Nước muối sinh lý', unit: 'Chai', price: 6000, stock: 500, category: 'Mắt mũi' },
  { id: 'SP008', name: 'Khẩu trang y tế', unit: 'Hộp', price: 35000, stock: 80, category: 'Vật tư' },
]

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN').format(Number(value || 0)) + ' đ'
}

export default function Sales() {
  const [medicines] = useState(mockMedicines)
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  
  // State thông tin khách hàng
  const [customerName, setCustomerName] = useState('Tên khách hàng')
  const [customerPhone, setCustomerPhone] = useState('')
  
  const filteredMedicines = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase()
    return medicines.filter(
      (med) =>
        med.name.toLowerCase().includes(keyword) ||
        med.id.toLowerCase().includes(keyword)
    )
  }, [searchQuery, medicines])

  const handleAddToCart = (med) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === med.id)
      if (existingItem) {
        return prev.map((item) =>
          item.id === med.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { ...med, qty: 1 }]
    })
  }

  const handleUpdateQty = (id, newQty) => {
    if (newQty < 1) return
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    )
  }

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc muốn hủy đơn hàng hiện tại?')) {
      setCart([])
      setCustomerName('Khách lẻ')
      setCustomerPhone('')
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng đang trống!')
      return
    }
    alert(`Thanh toán thành công!\nKhách hàng: ${customerName}\nSĐT: ${customerPhone || 'N/A'}\nTổng tiền: ${formatMoney(totalPrice)}`)
    setCart([])
    setCustomerName('Khách lẻ')
    setCustomerPhone('')
  }

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div className="mx-auto w-full max-w-7xl space-y-4 pt-0 animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Bán hàng tại quầy</h1>
          <p className="mt-1 text-sm text-slate-500">Tìm kiếm sản phẩm và thanh toán nhanh chóng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
        
        {/* KHU VỰC TRÁI (SẢN PHẨM) */}
        <div className="space-y-4 lg:col-span-2 xl:col-span-3">
          {/* Thanh tìm kiếm đã bỏ nút Quét mã */}
          <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
            <FaSearch className="text-slate-400" />
            <input
              type="text"
              placeholder="Tìm thuốc theo mã hoặc tên sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map((med) => (
                <div
                  key={med.id}
                  onClick={() => handleAddToCart(med)}
                  className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-blue-400 select-none"
                >
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                      {med.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2">{med.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">Mã: {med.id}</p>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Kho: {med.stock} {med.unit}</p>
                      <p className="text-base font-bold text-blue-600">{formatMoney(med.price)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-10 text-center text-slate-400">Không có thuốc phù hợp</div>
            )}
          </div>
        </div>

        {/* KHU VỰC PHẢI (HÓA ĐƠN) */}
        <div className="flex flex-col overflow-hidden rounded-[24px] bg-white shadow-xl ring-1 ring-slate-100 lg:col-span-1 h-[calc(100vh-140px)] min-h-[620px] sticky top-6">
          
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-slate-800">Đơn hàng mới</h2>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                {totalItems} SP
              </span>
            </div>
            
            {/* THÔNG TIN KHÁCH HÀNG: Tên & SĐT */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                <FaUserPlus className="text-slate-400 shrink-0" size={14} />
                <input 
                  type="text" 
                  placeholder="Tên khách hàng"
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full outline-none text-sm text-slate-700 font-medium"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                <FaPhoneAlt className="text-slate-400 shrink-0" size={14} />
                <input 
                  type="tel" 
                  placeholder="Số điện thoại"
                  value={customerPhone} 
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full outline-none text-sm text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-400 p-4">
                <p className="text-sm italic">Bấm vào thuốc bên trái để thêm vào hóa đơn</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.id} className="relative rounded-xl border border-slate-100 p-3 hover:bg-slate-50 transition">
                    <div className="flex justify-between gap-2">
                      <h4 className="text-sm font-semibold text-slate-800 leading-tight">{item.name}</h4>
                      <button onClick={() => handleRemoveItem(item.id)} className="text-slate-300 hover:text-red-500 shrink-0">
                        <FaTrash size={12} />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm font-bold text-blue-600">{formatMoney(item.price)}</p>
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white">
                        <button onClick={() => handleUpdateQty(item.id, item.qty - 1)} className="px-2 py-1 text-slate-500 hover:bg-slate-100"><FaMinus size={10} /></button>
                        <input type="number" value={item.qty} readOnly className="w-8 text-center text-sm font-semibold outline-none" />
                        <button onClick={() => handleUpdateQty(item.id, item.qty + 1)} className="px-2 py-1 text-slate-500 hover:bg-slate-100"><FaPlus size={10} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white p-5">
            <div className="mb-4 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between font-bold text-lg text-slate-900 border-t border-dashed border-slate-200 pt-2">
                <span>Tổng cộng:</span>
                <span className="text-blue-600">{formatMoney(totalPrice)}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handleClearCart} disabled={cart.length === 0} className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50">Hủy</button>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 disabled:bg-slate-300 disabled:shadow-none transition">
                <FaMoneyBillWave /> Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>
    </div>
  )
}