import { useMemo, useState } from 'react'
import {
  FaPlus,
  FaFileExport,
  FaSearch,
  FaTimes,
  FaUser,
} from 'react-icons/fa'

// Dữ liệu mẫu cho Khách hàng
const initialCustomers = [
  {
    id: 'KH000005',
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    group: 'Khách VIP',
    gender: 'Nam',
    totalSpent: 15600000,
    debt: 0,
    address: 'Q. Cầu Giấy, Hà Nội',
  },
  {
    id: 'KH000004',
    name: 'Trần Thị Bích',
    phone: '0987654321',
    group: 'Khách thường',
    gender: 'Nữ',
    totalSpent: 450000,
    debt: 50000,
    address: 'Q. Đống Đa, Hà Nội',
  },
  {
    id: 'KH000003',
    name: 'Lê Hoàng Hải',
    phone: '0912223334',
    group: 'Khách buôn',
    gender: 'Nam',
    totalSpent: 85000000,
    debt: 1200000,
    address: 'TP. Vĩnh Yên, Vĩnh Phúc',
  },
  {
    id: 'KH000002',
    name: 'Phạm Mai Lan',
    phone: '0933445566',
    group: 'Khách thường',
    gender: 'Nữ',
    totalSpent: 120000,
    debt: 0,
    address: 'TX. Phúc Yên, Vĩnh Phúc',
  },
]

const groupOptions = [
  'Khách thường',
  'Khách VIP',
  'Khách buôn',
  'Khách sỉ',
  'Đối tác',
]

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN').format(Number(value || 0))
}

export default function Customers() {
  const [customers, setCustomers] = useState(initialCustomers)
  const [search, setSearch] = useState('')
  const [selectedGroup, setSelectedGroup] = useState('Tất cả')
  const [showModal, setShowModal] = useState(false)

  // State cho Form thêm khách hàng mới
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    phone: '',
    group: 'Khách thường',
    gender: 'Nam',
    email: '',
    address: '',
    dob: '',
  })

  // Lọc danh sách khách hàng
  const filteredCustomers = useMemo(() => {
    return customers.filter((item) => {
      const keyword = search.trim().toLowerCase()
      const matchSearch =
        !keyword ||
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword) ||
        item.phone.includes(keyword)

      const matchGroup =
        selectedGroup === 'Tất cả' || item.group === selectedGroup

      return matchSearch && matchGroup
    })
  }, [customers, search, selectedGroup])

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({
      code: '',
      name: '',
      phone: '',
      group: 'Khách thường',
      gender: 'Nam',
      email: '',
      address: '',
      dob: '',
    })
  }

  const handleChangeForm = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitCustomer = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên khách hàng')
      return
    }

    if (!formData.phone.trim()) {
      alert('Vui lòng nhập số điện thoại')
      return
    }

    const newItem = {
      id: formData.code || `KH${String(customers.length + 6).padStart(6, '0')}`,
      name: formData.name,
      phone: formData.phone,
      group: formData.group,
      gender: formData.gender,
      totalSpent: 0,
      debt: 0,
      address: formData.address,
    }

    setCustomers((prev) => [newItem, ...prev])
    handleCloseModal()
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      {/* HEADER */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Khách hàng</h1>
          <p className="mt-1 text-sm text-slate-500">
            Quản lý thông tin liên hệ, lịch sử mua hàng và công nợ khách hàng
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* LEFT FILTER */}
        <div className="space-y-5">
          <div className="rounded-[28px] bg-white p-5 shadow-lg ring-1 ring-slate-100">
            <div className="mt-2">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-slate-400">
                <FaSearch />
                <input
                  type="text"
                  placeholder="Tìm nhóm khách..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none"
                />
              </div>
            </div>

            <div className="custom-scrollbar mt-4 max-h-[360px] space-y-1 overflow-y-auto pr-2">
              <button
                onClick={() => setSelectedGroup('Tất cả')}
                className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                  selectedGroup === 'Tất cả'
                    ? 'bg-blue-50 font-semibold text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Tất cả nhóm
              </button>
              {groupOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedGroup(item)}
                  className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                    selectedGroup === item
                      ? 'bg-blue-50 font-semibold text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="rounded-[28px] bg-white p-5 shadow-lg ring-1 ring-slate-100">
          {/* TOOLBAR */}
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex w-full items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-slate-400 xl:max-w-xs">
              <FaSearch />
              <input
                type="text"
                placeholder="Theo mã, tên, số điện thoại..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                <FaPlus />
                Thêm mới
              </button>

              <button className="flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100">
                <FaFileExport />
                Xuất file
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-5 overflow-x-auto rounded-[22px] border border-slate-100">
            <table className="w-full text-sm">
              <thead className="bg-sky-50 text-left text-slate-500">
                <tr>
                  <th className="whitespace-nowrap p-4">Mã KH</th>
                  <th className="whitespace-nowrap p-4">Tên khách hàng</th>
                  <th className="whitespace-nowrap p-4">Điện thoại</th>
                  <th className="whitespace-nowrap p-4 text-right">Tổng bán</th>
                  <th className="whitespace-nowrap p-4 text-right">Nợ hiện tại</th>
                  <th className="whitespace-nowrap p-4">Nhóm khách</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-semibold text-slate-800">{item.id}</td>
                      <td className="p-4 font-medium text-blue-600">{item.name}</td>
                      <td className="p-4 text-slate-600">{item.phone}</td>
                      <td className="p-4 text-right text-slate-800">
                        {formatMoney(item.totalSpent)}
                      </td>
                      <td className="p-4 text-right font-semibold text-red-500">
                        {formatMoney(item.debt)}
                      </td>
                      <td className="p-4 text-slate-600">
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                          {item.group}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-slate-400">
                      Không có dữ liệu khách hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION INFO */}
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>
              Hiển thị <span className="font-semibold">{filteredCustomers.length}</span> / Tổng số{' '}
              <span className="font-semibold">{customers.length}</span> khách hàng
            </p>

            <div className="flex items-center gap-2">
              <button className="rounded-xl bg-slate-100 px-3 py-2">1</button>
              <button className="rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-100">2</button>
              <button className="rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-100">3</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ADD CUSTOMER */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FaUser size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Thêm khách hàng</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Nhập thông tin cơ bản của khách hàng
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitCustomer} className="p-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* LEFT */}
                <div className="space-y-5">
                  <FormRow label="Mã khách hàng">
                    <input
                      value={formData.code}
                      onChange={(e) => handleChangeForm('code', e.target.value)}
                      placeholder="Mã tự động"
                      className="input-line"
                    />
                  </FormRow>

                  <FormRow label="Tên khách hàng (*)">
                    <input
                      value={formData.name}
                      onChange={(e) => handleChangeForm('name', e.target.value)}
                      placeholder="Nhập tên khách hàng"
                      className="input-line"
                      required
                    />
                  </FormRow>

                  <FormRow label="Số điện thoại (*)">
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChangeForm('phone', e.target.value)}
                      placeholder="Nhập số điện thoại"
                      className="input-line"
                      required
                    />
                  </FormRow>

                  <FormRow label="Ngày sinh">
                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleChangeForm('dob', e.target.value)}
                      className="input-line text-slate-600"
                    />
                  </FormRow>
                </div>

                {/* RIGHT */}
                <div className="space-y-5">
                  <FormRow label="Nhóm khách hàng">
                    <select
                      value={formData.group}
                      onChange={(e) => handleChangeForm('group', e.target.value)}
                      className="input-line"
                    >
                      {groupOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </FormRow>

                  <FormRow label="Giới tính">
                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="radio"
                          name="gender"
                          value="Nam"
                          checked={formData.gender === 'Nam'}
                          onChange={(e) => handleChangeForm('gender', e.target.value)}
                          className="h-4 w-4 accent-blue-600"
                        />
                        Nam
                      </label>
                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="radio"
                          name="gender"
                          value="Nữ"
                          checked={formData.gender === 'Nữ'}
                          onChange={(e) => handleChangeForm('gender', e.target.value)}
                          className="h-4 w-4 accent-blue-600"
                        />
                        Nữ
                      </label>
                    </div>
                  </FormRow>

                  <FormRow label="Email">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChangeForm('email', e.target.value)}
                      placeholder="example@gmail.com"
                      className="input-line"
                    />
                  </FormRow>

                  <FormRow label="Địa chỉ">
                    <input
                      value={formData.address}
                      onChange={(e) => handleChangeForm('address', e.target.value)}
                      placeholder="Nhập địa chỉ"
                      className="input-line"
                    />
                  </FormRow>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-2xl bg-slate-100 px-6 py-3 font-medium text-slate-600 transition hover:bg-slate-200"
                >
                  Hủy bỏ
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSS STYLE (Tương tự trang Thuốc) */}
      <style>{`
        .input-line {
          width: 100%;
          border: none;
          border-bottom: 2px solid #e2e8f0;
          padding: 10px 0;
          outline: none;
          background: transparent;
          color: #0f172a;
          font-size: 15px;
        }

        .input-line:focus {
          border-bottom-color: #2563eb; /* Đổi sang màu blue cho hợp tông Khách hàng */
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}</style>
    </div>
  )
}

function FormRow({ label, children }) {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div>{children}</div>
    </div>
  )
}