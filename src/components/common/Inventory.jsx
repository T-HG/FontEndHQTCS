import { useMemo, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

const mockData = [
  {
    id: 'SP001',
    name: 'Paracetamol 500mg',
    unit: 'Viên',
    stock: 120,
  },
  {
    id: 'SP002',
    name: 'Ibuprofen 400mg',
    unit: 'Viên',
    stock: 5,
  },
  {
    id: 'SP003',
    name: 'Vitamin C',
    unit: 'Hộp',
    stock: 0,
  },
]

function getStatus(stock) {
  if (stock === 0) return 'Hết hàng'
  if (stock <= 10) return 'Sắp hết'
  return 'Còn hàng'
}

export default function Inventory() {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('Tất cả')

  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const keyword = search.toLowerCase()

      const matchSearch =
        !keyword ||
        item.name.toLowerCase().includes(keyword) ||
        item.id.toLowerCase().includes(keyword)

      const status = getStatus(item.stock)

      const matchStatus =
        filterStatus === 'Tất cả' || status === filterStatus

      return matchSearch && matchStatus
    })
  }, [search, filterStatus])

  return (
    <div className="space-y-6 pt-0 w-full animate-in fade-in duration-300">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-3xl font-bold text-slate-900">Kiểm tra tồn kho</h1>
        <p className="mt-1 text-sm text-slate-500">Tra cứu tồn kho thuốc realtime</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100 transition focus-within:ring-emerald-400">
          <FaSearch className="text-slate-400" />
          <input
            placeholder="Tìm theo mã, tên thuốc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-slate-700 text-sm"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100 text-slate-700 text-sm outline-none focus:ring-emerald-400"
        >
          <option>Tất cả</option>
          <option>Còn hàng</option>
          <option>Sắp hết</option>
          <option>Hết hàng</option>
        </select>
      </div>

      <div className="rounded-[28px] bg-white p-5 shadow-lg ring-1 ring-slate-100">
        <div className="overflow-x-auto rounded-[22px] border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-slate-500">
              <tr>
                <th className="p-4 whitespace-nowrap">Mã thuốc</th>
                <th className="p-4 whitespace-nowrap">Tên thuốc</th>
                <th className="p-4 whitespace-nowrap">Đơn vị</th>
                <th className="p-4 whitespace-nowrap text-right">Tồn kho</th>
                <th className="p-4 whitespace-nowrap text-center">Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const status = getStatus(item.stock)

                  return (
                    <tr key={item.id} className="border-t border-slate-100 hover:bg-slate-50 transition">
                      <td className="p-4 font-semibold text-slate-800">{item.id}</td>
                      <td className="p-4 text-slate-700 font-medium">{item.name}</td>
                      <td className="p-4 text-slate-600">{item.unit}</td>
                      <td className="p-4 font-bold text-slate-800 text-right">{item.stock}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                            status === 'Còn hàng'
                              ? 'bg-emerald-50 text-emerald-600'
                              : status === 'Sắp hết'
                              ? 'bg-yellow-50 text-yellow-600'
                              : 'bg-red-50 text-red-600'
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-400">
                    Không tìm thấy thuốc phù hợp với từ khóa.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}