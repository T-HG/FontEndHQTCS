import { useMemo, useState } from 'react'
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
  FaUserTie,
} from 'react-icons/fa'

const initialEmployees = [
  {
    id: 'NV001',
    fullName: 'Nguyễn Văn An',
    phone: '0901111222', // Thêm SĐT mẫu
    username: 'admin01',
    password: '123456',
    role: 'Admin',
    status: 'Đang hoạt động',
  },
  {
    id: 'NV002',
    fullName: 'Trần Thị Bình',
    phone: '0988333444', // Thêm SĐT mẫu
    username: 'staff01',
    password: '123456',
    role: 'Nhân viên bán hàng',
    status: 'Đang hoạt động',
  },
  {
    id: 'NV003',
    fullName: 'Lê Minh Châu',
    phone: '0912555666', // Thêm SĐT mẫu
    username: 'staff02',
    password: '123456',
    role: 'Nhân viên bán hàng',
    status: 'Vô hiệu hóa',
  },
]

const roleOptions = ['Admin', 'Nhân viên bán hàng']

export default function Employees() {
  const [employees, setEmployees] = useState(initialEmployees)
  const [search, setSearch] = useState('')
  const [filterRole, setFilterRole] = useState('Tất cả')

  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState('add') // add | edit
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '', // State SĐT
    username: '',
    password: '',
    role: 'Nhân viên bán hàng',
  })

  const filteredEmployees = useMemo(() => {
    return employees.filter((item) => {
      const keyword = search.trim().toLowerCase()

      const matchSearch =
        !keyword ||
        item.fullName.toLowerCase().includes(keyword) ||
        item.username.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword) ||
        item.phone.includes(keyword) // Hỗ trợ tìm theo SĐT

      const matchRole =
        filterRole === 'Tất cả' || item.role === filterRole

      return matchSearch && matchRole
    })
  }, [employees, search, filterRole])

  const resetForm = () => {
    setFormData({
      fullName: '',
      phone: '', // Reset SĐT
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
      phone: employee.phone || '', // Load SĐT lên Form
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
      alert('Vui lòng nhập họ tên')
      return
    }

    if (!formData.username.trim()) {
      alert('Vui lòng nhập username')
      return
    }

    if (!formData.password.trim()) {
      alert('Vui lòng nhập password')
      return
    }

    if (modalMode === 'add') {
      const existed = employees.some(
        (item) => item.username.toLowerCase() === formData.username.toLowerCase()
      )

      if (existed) {
        alert('Username đã tồn tại')
        return
      }

      const newEmployee = {
        id: `NV${String(employees.length + 1).padStart(3, '0')}`,
        fullName: formData.fullName,
        phone: formData.phone, // Lưu SĐT
        username: formData.username,
        password: formData.password,
        role: formData.role,
        status: 'Đang hoạt động',
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
                phone: formData.phone, // Cập nhật SĐT
                username: formData.username,
                password: formData.password,
                role: formData.role,
              }
            : item
        )
      )
    }

    closeModal()
  }

  const handleDisable = (employee) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn vô hiệu hóa tài khoản ${employee.fullName}?`
    )

    if (!confirmDelete) return

    setEmployees((prev) =>
      prev.map((item) =>
        item.id === employee.id
          ? { ...item, status: 'Vô hiệu hóa' }
          : item
      )
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 w-full pt-0">
      {/* HEADER */}
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý nhân viên</h1>
          <p className="mt-1 text-sm text-slate-500">
            Tạo, sửa, vô hiệu hóa tài khoản và phân quyền truy cập hệ thống
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

      {/* STATS */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <StatCard
          title="Tổng nhân viên"
          value={employees.length}
          subtitle="Toàn bộ tài khoản đã tạo"
        />
        <StatCard
          title="Đang hoạt động"
          value={employees.filter((item) => item.status === 'Đang hoạt động').length}
          subtitle="Có thể đăng nhập hệ thống"
        />
        <StatCard
          title="Vô hiệu hóa"
          value={employees.filter((item) => item.status === 'Vô hiệu hóa').length}
          subtitle="Tài khoản đã bị khóa"
        />
      </div>

      {/* FILTER + TABLE */}
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
                <th className="p-4 whitespace-nowrap">Điện thoại</th> {/* Cột mới */}
                <th className="p-4 whitespace-nowrap">Username</th>
                <th className="p-4 whitespace-nowrap">Vai trò</th>
                <th className="p-4 whitespace-nowrap">Trạng thái</th>
                <th className="p-4 whitespace-nowrap text-right">Hành động</th>
              </tr>
            </thead>

            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                    <td className="p-4 font-semibold text-slate-800">{item.id}</td>
                    <td className="p-4 text-slate-700 font-medium">{item.fullName}</td>
                    <td className="p-4 text-slate-600">{item.phone || '-'}</td> {/* Hiển thị SĐT */}
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
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === 'Đang hoạt động'
                            ? 'bg-emerald-50 text-emerald-600'
                            : 'bg-red-50 text-red-600'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          title="Sửa"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDisable(item)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-600 hover:text-white"
                          title="Vô hiệu hóa"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="p-10 text-center text-slate-400">
                    Không tìm thấy nhân viên nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
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
                  <p className="mt-1 text-sm text-slate-500">
                    Nhập thông tin tài khoản và phân quyền truy cập
                  </p>
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
                  <InputField
                    label="Họ tên (*)"
                    value={formData.fullName}
                    onChange={(e) => handleChangeForm('fullName', e.target.value)}
                    placeholder="Nhập họ tên nhân viên"
                  />
                  <InputField
                    label="Số điện thoại"
                    value={formData.phone}
                    onChange={(e) => handleChangeForm('phone', e.target.value)}
                    placeholder="Nhập số điện thoại"
                    type="tel"
                  />
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Vai trò
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleChangeForm('role', e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-emerald-400 transition"
                    >
                      {roleOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-5">
                  <InputField
                    label="Username (*)"
                    value={formData.username}
                    onChange={(e) => handleChangeForm('username', e.target.value)}
                    placeholder="Nhập username"
                  />

                  <InputField
                    label="Password (*)"
                    value={formData.password}
                    onChange={(e) => handleChangeForm('password', e.target.value)}
                    placeholder="Nhập mật khẩu"
                    type="password"
                  />
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-2xl bg-slate-100 px-5 py-3 font-medium text-slate-600 hover:bg-slate-200 transition"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/30"
                >
                  {modalMode === 'add' ? 'Lưu nhân viên' : 'Cập nhật'}
                </button>
              </div>
            </form>
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

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
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