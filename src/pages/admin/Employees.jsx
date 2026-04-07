import { useMemo, useState } from 'react'
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUserTie,
  FaExclamationTriangle,
} from 'react-icons/fa'

const initialEmployees = [
  {
    id: 'NV001',
    fullName: 'Nguyễn Văn An',
    phone: '0901111222',
    username: 'admin01',
    password: '123456',
    role: 'Admin',
  },
  {
    id: 'NV002',
    fullName: 'Trần Thị Bình',
    phone: '0988333444',
    username: 'staff01',
    password: '123456',
    role: 'Nhân viên bán hàng',
  },
  {
    id: 'NV003',
    fullName: 'Lê Minh Châu',
    phone: '0912555666',
    username: 'staff02',
    password: '123456',
    role: 'Nhân viên bán hàng',
  },
]

const roleOptions = ['Admin', 'Nhân viên bán hàng']

export default function Employees() {
  const isAdmin = true // Chỉnh thành false để test quyền của nhân viên thường

  const [employees, setEmployees] = useState(initialEmployees)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('Tất cả')

  // --- STATE MODAL FORM THÊM/SỬA ---
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add') 
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    username: '',
    password: '',
    role: 'Nhân viên bán hàng',
  })

  // --- STATE POPUP CẢNH BÁO / XÁC NHẬN ---
  const [dialog, setDialog] = useState({
    isOpen: false,
    type: 'alert', // 'alert' (chỉ hiện thông báo) | 'confirm' (xác nhận Có/Không)
    title: '',
    message: '',
    onConfirm: null, // Hàm chạy khi bấm Đồng ý
  })

  // Hàm mở Popup Cảnh báo
  const showAlert = (title, message) => {
    setDialog({ isOpen: true, type: 'alert', title, message, onConfirm: null })
  }

  // Hàm mở Popup Xác nhận
  const showConfirm = (title, message, onConfirmCallback) => {
    setDialog({ isOpen: true, type: 'confirm', title, message, onConfirm: onConfirmCallback })
  }

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, isOpen: false }))
  }

  const filteredEmployees = useMemo(() => {
    return employees.filter((item) => {
      const keyword = search.trim().toLowerCase()

      const matchSearch =
        !keyword ||
        item.fullName.toLowerCase().includes(keyword) ||
        item.username.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword) ||
        item.phone.includes(keyword)

      const matchRole =
        filterRole === 'Tất cả' || item.role === filterRole

      return matchSearch && matchRole
    })
  }, [employees, search, filterRole])

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '',
      username: '',
      password: '',
      role: 'Nhân viên bán hàng',
    })
    setSelectedEmployeeId(null)
  }

  const openAddModal = () => {
    resetForm()
    setModalMode('add')
    setShowModal(true)
  }

  const openEditModal = (employee) => {
    setModalMode('edit')
    setSelectedEmployeeId(employee.id)
    setFormData({
      fullName: employee.fullName,
      phone: employee.phone || '',
      username: employee.username,
      password: employee.password,
      role: employee.role,
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    resetForm()
  }

  const handleChangeForm = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      showAlert('Thiếu thông tin', 'Vui lòng nhập họ tên nhân viên.')
      return
    }

    if (!formData.username.trim()) {
      showAlert('Thiếu thông tin', 'Vui lòng nhập tên đăng nhập (Username).')
      return
    }

    if (!formData.password.trim()) {
      showAlert('Thiếu thông tin', 'Vui lòng nhập mật khẩu.')
      return
    }

    const finalRole = isAdmin ? formData.role : (modalMode === 'edit' ? employees.find(e => e.id === selectedEmployeeId).role : 'Nhân viên bán hàng')

    if (modalMode === 'add') {
      const existed = employees.some(
        (item) => item.username.toLowerCase() === formData.username.toLowerCase()
      )

      if (existed) {
        showAlert('Trùng lặp dữ liệu', 'Username này đã tồn tại trong hệ thống. Vui lòng chọn tên khác.')
        return
      }

      const newEmployee = {
        id: `NV${String(employees.length + 1).padStart(3, '0')}`,
        fullName: formData.fullName,
        phone: formData.phone,
        username: formData.username,
        password: formData.password,
        role: finalRole,
      }

      setEmployees((prev) => [newEmployee, ...prev])
    }

    if (modalMode === 'edit') {
      setEmployees((prev) =>
        prev.map((item) =>
          item.id === selectedEmployeeId
            ? {
                ...item,
                fullName: formData.fullName,
                phone: formData.phone,
                username: formData.username,
                password: formData.password,
                role: finalRole,
              }
            : item
        )
      )
    }

    closeModal()
  }

  // Hàm Xóa (Sử dụng Custom Popup)
  const handleDelete = (employee) => {
    if (!isAdmin) {
      showAlert('Từ chối truy cập', 'Chỉ Quản trị viên (Admin) mới có quyền xóa tài khoản!')
      return
    }

    showConfirm(
      'Xóa tài khoản vĩnh viễn',
      `Bạn có chắc chắn muốn xóa tài khoản của nhân viên [${employee.fullName}] không? Thao tác này không thể hoàn tác.`,
      () => {
        // Hàm này sẽ được gọi khi người dùng bấm "Xóa" trên popup
        setEmployees((prev) => prev.filter((item) => item.id !== employee.id))
        closeDialog()
      }
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full pt-0">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý nhân viên</h1>
          <p className="mt-1 text-sm text-slate-500">
            Tạo, sửa, xóa tài khoản và phân quyền truy cập hệ thống
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30"
        >
          <FaPlus />
          Thêm nhân viên
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard title="Tổng nhân viên" value={employees.length} subtitle="Toàn bộ tài khoản đã tạo" />
        <StatCard title="Quản trị viên" value={employees.filter((item) => item.role === 'Admin').length} subtitle="Tài khoản cấp Admin" />
        <StatCard title="Nhân viên bán hàng" value={employees.filter((item) => item.role === 'Nhân viên bán hàng').length} subtitle="Tài khoản cấp Staff" />
      </div>

      <div className="rounded-[28px] bg-white p-5 shadow-lg ring-1 ring-slate-100">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex w-full items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-slate-400 xl:max-w-xl">
            <FaSearch />
            <input
              type="text"
              placeholder="Tìm theo mã, họ tên, username, SĐT..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-emerald-400"
            >
              <option value="Tất cả">Tất cả vai trò</option>
              <option value="Admin">Admin</option>
              <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto rounded-[22px] border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="p-4 whitespace-nowrap">Mã NV</th>
                <th className="p-4 whitespace-nowrap">Họ tên</th>
                <th className="p-4 whitespace-nowrap">Điện thoại</th>
                <th className="p-4 whitespace-nowrap">Username</th>
                <th className="p-4 whitespace-nowrap">Vai trò</th>
                <th className="p-4 whitespace-nowrap text-right">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4 font-semibold text-slate-800">{item.id}</td>
                    <td className="p-4 text-slate-700 font-medium">{item.fullName}</td>
                    <td className="p-4 text-slate-600">{item.phone || '-'}</td>
                    <td className="p-4 text-slate-600">{item.username}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                          item.role === 'Admin'
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-emerald-50 text-emerald-600'
                        }`}
                      >
                        {item.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          title="Sửa thông tin"
                        >
                          <FaEdit />
                        </button>

                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(item)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                            title="Xóa vĩnh viễn"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="p-10 text-center text-slate-400">
                    Không tìm thấy nhân viên nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL THÊM/SỬA NHÂN VIÊN --- */}
      {showModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[28px] bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <FaUserTie size={20}/>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {modalMode === 'add' ? 'Thêm nhân viên' : 'Cập nhật nhân viên'}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">Nhập thông tin tài khoản và phân quyền</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-5">
                  <InputField label="Họ tên (*)" value={formData.fullName} onChange={(e) => handleChangeForm('fullName', e.target.value)} placeholder="Nhập họ tên" />
                  <InputField label="Số điện thoại" value={formData.phone} onChange={(e) => handleChangeForm('phone', e.target.value)} placeholder="Nhập SĐT" type="tel" />
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                      Vai trò
                      {!isAdmin && <span className="text-[10px] text-red-500 italic">(Chỉ Admin mới được sửa)</span>}
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleChangeForm('role', e.target.value)}
                      disabled={!isAdmin}
                      className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${!isAdmin ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-50 border-slate-200 focus:border-emerald-400 focus:bg-white text-slate-700'}`}
                    >
                      {roleOptions.map((item) => <option key={item} value={item}>{item}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-5">
                  <InputField label="Username (*)" value={formData.username} onChange={(e) => handleChangeForm('username', e.target.value)} placeholder="Nhập username" />
                  <InputField label="Password (*)" value={formData.password} onChange={(e) => handleChangeForm('password', e.target.value)} placeholder="Nhập mật khẩu" type="password" />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                <button type="button" onClick={closeModal} className="rounded-2xl bg-slate-100 px-5 py-3 font-medium text-slate-600 hover:bg-slate-200 transition">
                  Hủy
                </button>
                <button type="submit" className="rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30">
                  {modalMode === 'add' ? 'Lưu nhân viên' : 'Cập nhật'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- CUSTOM POPUP (THAY THẾ ALERT/CONFIRM) --- */}
      {dialog.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${dialog.type === 'confirm' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                <FaExclamationTriangle size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{dialog.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{dialog.message}</p>
            </div>

            <div className="flex gap-3 bg-slate-50 p-4">
              {dialog.type === 'confirm' ? (
                <>
                  <button onClick={closeDialog} className="flex-1 rounded-xl bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition">
                    Hủy
                  </button>
                  <button onClick={dialog.onConfirm} className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-red-700 transition">
                    Xóa tài khoản
                  </button>
                </>
              ) : (
                <button onClick={closeDialog} className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition">
                  Đã hiểu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-[28px] bg-white p-5 shadow-lg ring-1 ring-slate-100 hover:shadow-xl transition">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-slate-900">{value}</h3>
      <p className="mt-2 text-xs font-medium text-slate-400">{subtitle}</p>
    </div>
  )
}

function InputField({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 focus:bg-white transition"
      />
    </div>
  )
}