import { useState, useMemo } from 'react'
import {
  FaSearch,
  FaUserPlus,
  FaTrash,
  FaMinus,
  FaPlus,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaFileInvoice,
  FaTimes,
  FaEye,
  FaCartPlus
} from 'react-icons/fa'

// --- DỮ LIỆU MẪU ---
const mockMedicines = [
  { id: 'SP001', name: 'Panadol Extra', unit: 'Vỉ', price: 15000, stock: 120, category: 'Giảm đau', ingredient: 'Paracetamol 500mg, Caffeine 65mg', usage: 'Giảm đau đầu, đau răng, hạ sốt nhanh' },
  { id: 'SP002', name: 'Telfast BD 60mg', unit: 'Viên', price: 162000, stock: 50, category: 'Dị ứng', ingredient: 'Fexofenadine hydrochloride 60mg', usage: 'Điều trị các triệu chứng viêm mũi dị ứng, mề đay vô căn' },
  { id: 'SP003', name: 'Vitamin C 500mg', unit: 'Hộp', price: 85000, stock: 30, category: 'Bổ sung', ingredient: 'Acid Ascorbic 500mg', usage: 'Bổ sung vitamin C, tăng cường sức đề kháng cho cơ thể' },
  { id: 'SP004', name: 'Oresol vị cam', unit: 'Gói', price: 5000, stock: 200, category: 'Tiêu hóa', ingredient: 'Glucose khan, Natri clorid, Kali clorid', usage: 'Bù nước và điện giải trong các trường hợp tiêu chảy, sốt cao' },
  { id: 'SP005', name: 'Ibuprofen 400mg', unit: 'Viên', price: 7900, stock: 100, category: 'Giảm đau', ingredient: 'Ibuprofen 400mg', usage: 'Giảm các cơn đau nhẹ đến vừa, chống viêm không steroid' },
  { id: 'SP006', name: 'Tràng Vị Khang', unit: 'Hộp', price: 90000, stock: 15, category: 'Tiêu hóa', ingredient: 'Chiết xuất thảo dược tự nhiên (Ngưu nhĩ phong, La liễu)', usage: 'Hỗ trợ giảm viêm đại tràng cấp và mãn tính, tiêu hóa kém' },
  { id: 'SP007', name: 'Nước muối sinh lý', unit: 'Chai', price: 6000, stock: 500, category: 'Mắt mũi', ingredient: 'Natri clorid 0.9%', usage: 'Rửa mắt, mũi, súc miệng kháng khuẩn hàng ngày' },
  { id: 'SP008', name: 'Khẩu trang y tế', unit: 'Hộp', price: 35000, stock: 80, category: 'Vật tư', ingredient: 'Vải không dệt 4 lớp, giấy kháng khuẩn', usage: 'Lọc bụi mịn, kháng khuẩn, bảo vệ đường hô hấp' },
]

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN').format(Number(value || 0)) + ' đ'
}

// Hàm tạo mã hóa đơn tự động
const generateInvoiceId = () => `HD${Math.floor(100000 + Math.random() * 900000)}`

export default function Sales() {
  const [medicines] = useState(mockMedicines)
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  
  // State mã hóa đơn & khách hàng
  const [invoiceId, setInvoiceId] = useState(generateInvoiceId())
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')

  // State lưu thông tin thuốc đang được chọn để hiển thị Modal
  const [selectedMedicine, setSelectedMedicine] = useState(null)
  
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
          item.id === med.id ? { ...item, qty: (Number(item.qty) || 0) + 1 } : item
        )
      }
      return [...prev, { ...med, qty: 1 }]
    })
    setSelectedMedicine(null)
  }

  const handleUpdateQty = (id, newQty) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (newQty === '') return { ...item, qty: '' }
          const parsed = parseInt(newQty, 10)
          if (isNaN(parsed) || parsed < 1) return item
          return { ...item, qty: parsed }
        }
        return item
      })
    )
  }

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const resetForm = () => {
    setCart([])
    setCustomerName('')
    setCustomerPhone('')
    setInvoiceId(generateInvoiceId())
  }

  const handleClearCart = () => {
    if (window.confirm('Bạn có chắc muốn hủy đơn hàng hiện tại?')) {
      resetForm()
    }
  }

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Giỏ hàng đang trống!')
      return
    }
    const finalCustomer = customerName.trim() || 'Khách lẻ'
    alert(`Thanh toán thành công ${invoiceId}!\nKhách hàng: ${finalCustomer}\nSĐT: ${customerPhone || 'Không có'}\nTổng tiền: ${formatMoney(totalPrice)}`)
    resetForm()
  }

  const totalItems = cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * (Number(item.qty) || 0), 0)

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
                  onClick={() => setSelectedMedicine(med)}
                  className="relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md hover:ring-blue-400 select-none"
                >
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                      {med.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-800 line-clamp-2">{med.name}</h3>
                  </div>
                  
                  {/* Khu vực giá và nút Thêm vào giỏ */}
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500">Kho: {med.stock} {med.unit}</p>
                      <p className="text-base font-bold text-blue-600">{formatMoney(med.price)}</p>
                    </div>

                    {/* NÚT THÊM NHANH VÀO GIỎ HÀNG */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Ngăn chặn mở Modal khi bấm nút này
                        handleAddToCart(med);
                      }}
                      className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                      title="Thêm vào giỏ"
                    >
                      <FaCartPlus size={16} />
                    </button>
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
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-slate-800">
                <FaFileInvoice className="text-blue-600" />
                <h2 className="font-bold">{invoiceId}</h2>
              </div>
              <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-bold text-blue-700">
                {totalItems} SP
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                <FaUserPlus className="text-slate-400 shrink-0" size={14} />
                <input 
                  type="text" 
                  placeholder="Tên khách hàng (Mặc định: Khách lẻ)"
                  value={customerName} 
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full outline-none text-sm text-slate-700 font-medium placeholder-slate-400"
                />
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
                <FaPhoneAlt className="text-slate-400 shrink-0" size={14} />
                <input 
                  type="tel" 
                  placeholder="Số điện thoại"
                  value={customerPhone} 
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full outline-none text-sm text-slate-700 font-medium placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto p-2">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-slate-400 p-4">
                <p className="text-sm italic">Bấm vào nút <FaCartPlus className="inline mx-1 text-blue-400"/> ở sản phẩm để thêm vào hóa đơn</p>
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
                      <div className="flex items-center rounded-lg border border-slate-200 bg-white px-1">
                        <button onClick={() => handleUpdateQty(item.id, (Number(item.qty) || 0) - 1)} className="p-1.5 text-slate-500 hover:bg-slate-100 transition rounded-md"><FaMinus size={10} /></button>
                        
                        <input 
                          type="number" 
                          value={item.qty} 
                          onChange={(e) => handleUpdateQty(item.id, e.target.value)}
                          onBlur={() => {
                            if (item.qty === '') handleUpdateQty(item.id, 1)
                          }}
                          className="w-8 bg-transparent text-center text-sm font-semibold outline-none" 
                        />
                        
                        <span className="text-[13px] font-medium text-slate-500 pr-1 select-none">{item.unit}</span>

                        <button onClick={() => handleUpdateQty(item.id, (Number(item.qty) || 0) + 1)} className="p-1.5 text-slate-500 hover:bg-slate-100 transition rounded-md"><FaPlus size={10} /></button>
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
              <button onClick={handleClearCart} disabled={cart.length === 0} className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100 disabled:opacity-50 transition">Hủy</button>
              <button onClick={handleCheckout} disabled={cart.length === 0} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-base font-bold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700 disabled:bg-slate-300 disabled:shadow-none transition">
                <FaMoneyBillWave /> Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL HIỂN THỊ CHI TIẾT THUỐC */}
      {selectedMedicine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <h2 className="text-lg font-bold text-slate-900">Chi tiết sản phẩm</h2>
              <button
                onClick={() => setSelectedMedicine(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-red-50 hover:text-red-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-blue-700">{selectedMedicine.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">Mã: {selectedMedicine.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{formatMoney(selectedMedicine.price)}</p>
                  <p className="text-sm font-medium text-emerald-600">Kho: {selectedMedicine.stock} {selectedMedicine.unit}</p>
                </div>
              </div>

              <div className="space-y-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-700">
                <div>
                  <span className="mb-1 block font-bold text-slate-900">Danh mục</span>
                  <span className="inline-block rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                    {selectedMedicine.category}
                  </span>
                </div>
                <div>
                  <span className="mb-1 block font-bold text-slate-900">Thành phần chính</span>
                  <p className="leading-relaxed text-slate-600">{selectedMedicine.ingredient}</p>
                </div>
                <div>
                  <span className="mb-1 block font-bold text-slate-900">Công dụng / Chỉ định</span>
                  <p className="leading-relaxed text-slate-600">{selectedMedicine.usage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 10px; }
        /* Xóa mũi tên tăng giảm số lượng mặc định của trình duyệt */
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  )
}