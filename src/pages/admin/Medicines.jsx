import { useMemo, useState } from 'react'
import {
  FaPlus,
  FaFileImport,
  FaFileExport,
  FaSearch,
  FaTimes,
} from 'react-icons/fa'

const initialMedicines = [
  {
    id: 'SP000032',
    name: 'PQA viêm mũi dị ứng',
    unit: 'Lọ',
    type: 'Thuốc kê đơn',
    category: 'Thuốc dị ứng',
    costPrice: 1200,
    salePrice: 800,
    stock: 464,
    directSale: true,
    group: 'Thuốc kê đơn',
    route: 'Uống',
    location: 'Kệ A1',
  },
  {
    id: 'SP000031',
    name: 'Ibuprofen 400mg',
    unit: 'Viên',
    type: 'Thuốc không kê đơn',
    category: 'Giảm đau',
    costPrice: 10000,
    salePrice: 7900,
    stock: 30,
    directSale: true,
    group: 'Thuốc giảm đau',
    route: 'Uống',
    location: 'Kệ A2',
  },
  {
    id: 'SP000030',
    name: 'Telfast BD',
    unit: 'Viên',
    type: 'Thuốc không kê đơn',
    category: 'Thuốc dị ứng',
    costPrice: 180000,
    salePrice: 162000,
    stock: 200,
    directSale: true,
    group: 'Thuốc dị ứng',
    route: 'Uống',
    location: 'Kệ B1',
  },
  {
    id: 'SP000029',
    name: 'JointCarePlus - Mỹ',
    unit: 'Hộp 60 viên',
    type: 'Thuốc không kê đơn',
    category: 'Thực phẩm chức năng',
    costPrice: 6500,
    salePrice: 5500,
    stock: 50,
    directSale: true,
    group: 'TPCN',
    route: 'Uống',
    location: 'Kệ C1',
  },
  {
    id: 'SP000028',
    name: 'Tràng Vị Khang - Đông Á',
    unit: 'Hộp',
    type: 'Thuốc không kê đơn',
    category: 'Tiêu hóa',
    costPrice: 100000,
    salePrice: 90000,
    stock: 0,
    directSale: false,
    group: 'Thuốc tiêu hóa',
    route: 'Uống',
    location: 'Kệ B3',
  },
]

const groupOptions = [
  'Thuốc dị ứng',
  'Thuốc giải độc, khử độc và hỗ trợ cai nghiện',
  'Thuốc da liễu',
  'Miếng dán, cao xoa, dầu',
  'Cơ - xương - khớp',
  'Thuốc bổ & vitamin',
  'Thuốc ung thư',
  'Thuốc giảm đau, hạ sốt, kháng viêm',
  'Thuốc hô hấp',
  'Thuốc kháng sinh, kháng nấm',
  'Thuốc Mắt, Tai, Mũi, Họng',
  'Thuốc hệ thần kinh',
  'Thuốc tiêm chích & dịch truyền',
  'Thuốc tiêu hoá & gan mật',
  'Thuốc tim mạch & máu',
  'Thuốc tiết niệu - sinh dục',
  'Thuốc tê bôi',
  'Thuốc trị tiểu đường',
]

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN').format(Number(value || 0))
}

export default function Medicines() {
  const [medicines, setMedicines] = useState(initialMedicines)
  const [search, setSearch] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('Tất cả')
  const [showModal, setShowModal] = useState(false)

  const [formData, setFormData] = useState({
    code: '',
    barcode: '',
    name: '',
    drugCode: '',
    type: 'Thuốc không kê đơn', // Mặc định là thuốc không kê đơn
    group: '',
    unit: '',
    route: '',
    location: '',
    costPrice: '',
    salePrice: '',
    stock: '',
    weight: '',
    directSale: true,
  })

  const filteredMedicines = useMemo(() => {
    return medicines.filter((item) => {
      const keyword = search.trim().toLowerCase()
      const matchSearch =
        !keyword ||
        item.id.toLowerCase().includes(keyword) ||
        item.name.toLowerCase().includes(keyword)

      const matchType =
        selectedTypes.length === 0 || selectedTypes.includes(item.type)

      const matchGroup =
        selectedGroup === 'Tất cả' || item.category === selectedGroup

      return matchSearch && matchType && matchGroup
    })
  }, [medicines, search, selectedTypes, selectedGroup])

  const handleCloseModal = () => {
    setShowModal(false)
    setFormData({
      code: '',
      barcode: '',
      name: '',
      drugCode: '',
      type: 'Thuốc không kê đơn',
      group: '',
      unit: '',
      route: '',
      location: '',
      costPrice: '',
      salePrice: '',
      stock: '',
      weight: '',
      directSale: true,
    })
  }

  const handleChangeForm = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitMedicine = (e) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên thuốc')
      return
    }

    const newItem = {
      id: formData.code || `SP${String(medicines.length + 29).padStart(6, '0')}`,
      name: formData.name,
      unit: formData.unit || 'Chưa xác định',
      type: formData.type, // Lấy loại hàng từ Form
      category: formData.group || 'Chưa phân nhóm',
      costPrice: Number(formData.costPrice || 0),
      salePrice: Number(formData.salePrice || 0),
      stock: Number(formData.stock || 0),
      directSale: formData.directSale,
      group: formData.group,
      route: formData.route,
      location: formData.location,
      drugCode: formData.drugCode,
    }

    setMedicines((prev) => [newItem, ...prev])
    handleCloseModal()
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quản lý thuốc</h1>
          <p className="mt-1 text-sm text-slate-500">
            Quản lý danh mục thuốc, tồn kho, giá bán và thông tin chi tiết
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
                  placeholder="Tìm kiếm nhóm..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none"
                />
              </div>
            </div>

            <div className="custom-scrollbar mt-4 max-h-[360px] space-y-1 overflow-y-auto pr-2">
              {groupOptions.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedGroup(item)}
                  className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                    selectedGroup === item
                      ? 'bg-emerald-50 font-semibold text-emerald-600'
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
                placeholder="Theo mã, tên hàng..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white hover:bg-emerald-700"
              >
                <FaPlus />
                Thêm mới
              </button>

              <button className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-100">
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
                  <th className="whitespace-nowrap p-4">Mã hàng</th>
                  <th className="whitespace-nowrap p-4">Tên hàng</th>
                  <th className="whitespace-nowrap p-4">Đơn vị</th>
                  <th className="whitespace-nowrap p-4">Giá vốn</th>
                  <th className="whitespace-nowrap p-4">Giá bán</th>
                  <th className="whitespace-nowrap p-4">Loại hàng</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.length > 0 ? (
                  filteredMedicines.map((item) => (
                    <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50">
                      <td className="p-4 font-semibold text-slate-800">{item.id}</td>
                      <td className="p-4 text-slate-700">{item.name}</td>
                      <td className="p-4 text-slate-600">{item.unit}</td>
                      <td className="p-4 text-slate-600">{formatMoney(item.costPrice)}</td>
                      <td className="p-4 font-semibold text-slate-800">
                        {formatMoney(item.salePrice)}
                      </td>
                      <td className="p-4 text-slate-600">
                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${item.type === 'Thuốc kê đơn' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'}`}>
                          {item.type}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-slate-400">
                      Không có dữ liệu phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>
              Hiển thị <span className="font-semibold">{filteredMedicines.length}</span> / Tổng số{' '}
              <span className="font-semibold">{medicines.length}</span> hàng hóa
            </p>

            <div className="flex items-center gap-2">
              <button className="rounded-xl bg-slate-100 px-3 py-2">1</button>
              <button className="rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-100">2</button>
              <button className="rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-100">3</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL ADD DRUG */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[28px] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Thêm thuốc</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Nhập thông tin thuốc, giá bán và thông tin phân loại
                </p>
              </div>

              <button
                onClick={handleCloseModal}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="border-b border-slate-100 px-6 pt-4">
              <div className="flex gap-8">
                <button className="border-b-2 border-emerald-500 pb-3 text-sm font-semibold text-emerald-600">
                  Thông tin
                </button>
                <button className="pb-3 text-sm text-slate-400">Mô tả chi tiết</button>
              </div>
            </div>

            <form onSubmit={handleSubmitMedicine} className="p-6">
              <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
                {/* LEFT */}
                <div className="space-y-5">
                  <FormRow label="Mã hàng">
                    <input
                      value={formData.code}
                      onChange={(e) => handleChangeForm('code', e.target.value)}
                      placeholder="Mã hàng tự động"
                      className="input-line"
                    />
                  </FormRow>

                  <FormRow label="Mã vạch">
                    <input
                      value={formData.barcode}
                      onChange={(e) => handleChangeForm('barcode', e.target.value)}
                      placeholder="Nhập mã vạch"
                      className="input-line"
                    />
                  </FormRow>

                  <FormRow label="Tên thuốc">
                    <input
                      value={formData.name}
                      onChange={(e) => handleChangeForm('name', e.target.value)}
                      placeholder="Paracetamol 500 mg"
                      className="input-line"
                    />
                  </FormRow>

                  <FormRow label="Mã thuốc">
                    <input
                      value={formData.drugCode}
                      onChange={(e) => handleChangeForm('drugCode', e.target.value)}
                      placeholder="DQG00001536"
                      className="input-line"
                    />
                  </FormRow>

                  <FormRow label="Loại hàng">
                    <select
                      value={formData.type}
                      onChange={(e) => handleChangeForm('type', e.target.value)}
                      className="input-line"
                    >
                      <option value="Thuốc không kê đơn">Thuốc không kê đơn</option>
                      <option value="Thuốc kê đơn">Thuốc kê đơn</option>
                    </select>
                  </FormRow>

                  <FormRow label="Nhóm thuốc">
                    <select
                      value={formData.group}
                      onChange={(e) => handleChangeForm('group', e.target.value)}
                      className="input-line"
                    >
                      <option value="">---Lựa chọn nhóm---</option>
                      {groupOptions.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </FormRow>

                  <div>
                    <label className="mb-3 block text-sm font-medium text-slate-700">
                      Hình ảnh
                    </label>

                    <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400"
                        >
                          Ảnh
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="space-y-5">
                  <FormRow label="Đơn vị đóng gói">
                    <input
                      type="text"
                      value={formData.unit}
                      onChange={(e) => handleChangeForm('unit', e.target.value)}
                      placeholder="Viên, vỉ, hộp, lọ..."
                      className="input-line"
                    />
                  </FormRow>

                  <FormRow label="Số lượng">
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => handleChangeForm('stock', e.target.value)}
                      placeholder="0"
                      className="input-line text-right"
                    />
                  </FormRow>

                  <FormRow label="Giá vốn">
                    <input
                      type="number"
                      value={formData.costPrice}
                      onChange={(e) => handleChangeForm('costPrice', e.target.value)}
                      placeholder="0"
                      className="input-line text-right"
                    />
                  </FormRow>

                  <FormRow label="Giá bán">
                    <input
                      type="number"
                      value={formData.salePrice}
                      onChange={(e) => handleChangeForm('salePrice', e.target.value)}
                      placeholder="0"
                      className="input-line text-right"
                    />
                  </FormRow>

                  <FormRow label="Trọng lượng">
                    <input
                      value={formData.weight}
                      onChange={(e) => handleChangeForm('weight', e.target.value)}
                      placeholder="Nhập trọng lượng"
                      className="input-line"
                    />
                  </FormRow>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-2xl bg-slate-100 px-5 py-3 font-medium text-slate-600 hover:bg-slate-200"
                >
                  Hủy
                </button>

                <button
                  type="submit"
                  className="rounded-2xl bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700"
                >
                  Lưu thuốc
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
          border-bottom-color: #10b981;
        }

        /* Làm đẹp thanh cuộn */
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
    <div className="grid grid-cols-1 gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:items-center">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <div>{children}</div>
    </div>
  )
}