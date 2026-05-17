import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'inventory_alert_store_v2'
const DEMO_SEED_TIME = '2026-04-14T08:00:00.000Z'
const ROOT_EMPLOYEE_ID = 'NV001'
const ROOT_ACCOUNT_ID = 1
const EXPIRY_WARNING_DAYS = 7
const DEMO_EXPIRED_BATCH_KEY = 'demo_expired_batches_seeded_v1'
const DEMO_EXPIRED_MEDICINE_KEY = 'demo_expired_medicine_seeded_v1'
const DEMO_MANY_BATCH_MEDICINE_KEY = 'demo_many_batch_medicine_seeded_v1'

const initialMedicines = [
  {
    id: 'SP001',
    name: 'Paracetamol 500mg',
    unit: 'Viên',
    stock: 120,
    minStock: 20,
    type: 'Thuốc không kê đơn',
    category: 'Giảm đau',
    listPrice: 15000,
    salePrice: 15000,
    status: 'ACTIVE',
    batches: [
      { id: 'LOT-SP001-EXPIRED', lotCode: 'PCT-0126-HH', qty: 12, expiryDate: '2026-01-15' },
      { id: 'LOT-SP001-EXPIRED-02', lotCode: 'PCT-0226-HH', qty: 8, expiryDate: '2026-02-10' },
      { id: 'LOT-SP001-01', lotCode: 'PCT-0426', qty: 120, expiryDate: '2026-12-12' },
    ],
    supplierName: 'Công ty Dược ABC',
    manufacturerName: 'DHG Pharma',
    lastImportPrice: 11000,
    avgSold7d: 18,
    avgSold30d: 72,
    alertStatus: 'NONE', // NONE | PENDING
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP002',
    name: 'Ibuprofen 400mg',
    unit: 'Viên',
    stock: 5,
    minStock: 15,
    type: 'Thuốc không kê đơn',
    category: 'Giảm đau',
    listPrice: 162000,
    salePrice: 162000,
    status: 'ACTIVE',
    batches: [
      { id: 'LOT-SP002-01', lotCode: 'IBU-0526', qty: 5, expiryDate: '2026-05-22' },
    ],
    supplierName: 'Dược phẩm Minh Phúc',
    manufacturerName: 'Abbott Laboratories',
    lastImportPrice: 6200,
    avgSold7d: 24,
    avgSold30d: 95,
    alertStatus: 'PENDING',
    alertNote: 'Hệ thống tự động sinh cảnh báo do tồn kho dưới ngưỡng tối thiểu.',
    alertBy: 'Hệ thống',
    alertAt: DEMO_SEED_TIME,
  },
  {
    id: 'SP003',
    name: 'Vitamin C',
    unit: 'Hộp',
    stock: 0,
    minStock: 10,
    type: 'Thuốc không kê đơn',
    category: 'Thuốc bổ & vitamin',
    listPrice: 85000,
    salePrice: 85000,
    status: 'OUT_OF_STOCK',
    batches: [
      { id: 'LOT-SP003-01', lotCode: 'VTC-0326', qty: 0, expiryDate: '2026-03-30' },
    ],
    supplierName: 'Công ty Y tế Ánh Dương',
    manufacturerName: 'Bayer Consumer Care',
    lastImportPrice: 70000,
    avgSold7d: 10,
    avgSold30d: 45,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP004',
    name: 'Oresol vị cam',
    unit: 'Gói',
    stock: 200,
    minStock: 40,
    type: 'Thuốc không kê đơn',
    category: 'Tiêu hóa',
    listPrice: 5000,
    salePrice: 5000,
    status: 'ACTIVE',
    batches: [
      { id: 'LOT-SP004-01', lotCode: 'ORS-0926', qty: 200, expiryDate: '2026-09-18' },
    ],
    supplierName: 'Dược phẩm Quốc Tế',
    manufacturerName: 'Việt Nam Oresol',
    lastImportPrice: 3200,
    avgSold7d: 30,
    avgSold30d: 120,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    supplierName: 'Dược phẩm Minh Phúc',
    manufacturerName: 'Sanofi Winthrop Industrie',
    lastImportPrice: 6200,
    avgSold7d: 18,
    avgSold30d: 70,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP006',
    name: 'Tràng Vị Khang',
    unit: 'Hộp',
    stock: 15,
    minStock: 20,
    type: 'Thuốc không kê đơn',
    category: 'Tiêu hóa',
    listPrice: 90000,
    salePrice: 90000,
    status: 'ACTIVE',
    batches: [
      { id: 'LOT-SP006-EXPIRED-DEMO', lotCode: 'TVK-0126-HH', qty: 6, expiryDate: '2026-01-25' },
      { id: 'LOT-SP006-01', lotCode: 'TVK-0526', qty: 15, expiryDate: '2026-05-20' },
    ],
    supplierName: 'Công ty Dược Nam Dược',
    manufacturerName: 'Nam Dược Pharmacology',
    lastImportPrice: 70000,
    avgSold7d: 7,
    avgSold30d: 22,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP007',
    name: 'Nước muối sinh lý',
    unit: 'Chai',
    stock: 500,
    minStock: 60,
    type: 'Thuốc không kê đơn',
    category: 'Mắt mũi',
    listPrice: 6000,
    salePrice: 6000,
    status: 'ACTIVE',
    batches: [
      { id: 'LOT-SP007-01', lotCode: 'NMSL-1026', qty: 500, expiryDate: '2026-10-11' },
    ],
    supplierName: 'Thiết bị Y tế Thành Công',
    manufacturerName: 'LD Pharma',
    lastImportPrice: 4200,
    avgSold7d: 34,
    avgSold30d: 140,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP008',
    name: 'Khẩu trang y tế',
    unit: 'Hộp',
    stock: 80,
    minStock: 30,
    type: 'Vật tư y tế',
    category: 'Vật tư',
    listPrice: 35000,
    salePrice: 35000,
    status: 'ACTIVE',
    batches: [
      { id: 'LOT-SP008-01', lotCode: 'KTYT-1226', qty: 80, expiryDate: '2026-12-30' },
    ],
    supplierName: 'Thiết bị Y tế Thành Công',
    manufacturerName: 'Nam An Safety',
    lastImportPrice: 24000,
    avgSold7d: 12,
    avgSold30d: 45,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP009',
    name: 'Siro ho trẻ em',
    unit: 'Chai',
    stock: 18,
    minStock: 10,
    type: 'Thuốc không kê đơn',
    category: 'Hô hấp',
    listPrice: 68000,
    salePrice: 68000,
    status: 'ACTIVE',
    batches: [
      {
        id: 'LOT-SP009-EXPIRED-DEMO',
        lotCode: 'SH-0326-HH',
        qty: 18,
        expiryDate: '2026-03-15',
        importPrice: 45000,
      },
    ],
    supplierName: 'Dược phẩm An Khang',
    manufacturerName: 'OPV Pharma',
    lastImportPrice: 45000,
    avgSold7d: 4,
    avgSold30d: 16,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP010',
    name: 'Amoxicillin 500mg',
    unit: 'Hộp',
    stock: 280,
    minStock: 60,
    type: 'Thuốc kê đơn',
    category: 'Kháng sinh',
    listPrice: 125000,
    salePrice: 125000,
    status: 'ACTIVE',
    batches: [
      { id: 'LOT-SP010-EXPIRED-01', lotCode: 'AMX-0226-HH', qty: 15, expiryDate: '2026-02-18', importPrice: 82000 },
      { id: 'LOT-SP010-EXPIRED-02', lotCode: 'AMX-0426-HH', qty: 10, expiryDate: '2026-04-22', importPrice: 83000 },
      { id: 'LOT-SP010-WARN-01', lotCode: 'AMX-0518', qty: 12, expiryDate: '2026-05-18', importPrice: 85000 },
      { id: 'LOT-SP010-WARN-02', lotCode: 'AMX-0521', qty: 18, expiryDate: '2026-05-21', importPrice: 85000 },
      { id: 'LOT-SP010-ZERO-01', lotCode: 'AMX-1010-Z', qty: 0, expiryDate: '2026-10-10', importPrice: 86000 },
      { id: 'LOT-SP010-01', lotCode: 'AMX-0826-A', qty: 30, expiryDate: '2026-08-12', importPrice: 87000 },
      { id: 'LOT-SP010-02', lotCode: 'AMX-0926-B', qty: 45, expiryDate: '2026-09-05', importPrice: 87000 },
      { id: 'LOT-SP010-03', lotCode: 'AMX-1026-C', qty: 28, expiryDate: '2026-10-28', importPrice: 88000 },
      { id: 'LOT-SP010-04', lotCode: 'AMX-1126-D', qty: 40, expiryDate: '2026-11-15', importPrice: 88000 },
      { id: 'LOT-SP010-05', lotCode: 'AMX-1226-E', qty: 22, expiryDate: '2026-12-20', importPrice: 89000 },
      { id: 'LOT-SP010-06', lotCode: 'AMX-0127-F', qty: 35, expiryDate: '2027-01-18', importPrice: 90000 },
      { id: 'LOT-SP010-07', lotCode: 'AMX-0227-G', qty: 50, expiryDate: '2027-02-25', importPrice: 90000 },
    ],
    supplierName: 'Công ty Dược Phúc Long',
    manufacturerName: 'Sandoz Vietnam',
    lastImportPrice: 90000,
    avgSold7d: 20,
    avgSold30d: 86,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
]

const initialOrders = [
  {
    id: 'HD00105',
    customerName: 'Nguyễn Văn An',
    phone: '0901234567',
    date: '06/04/2026 14:30',
    createdAt: '2026-04-06T14:30:00.000Z',
    total: 1944000,
    status: 'Hoàn thành',
    createdBy: 'Quản trị viên',
    items: [
      { id: 'SP002', name: 'Telfast BD', unit: 'Viên', qty: 12, price: 162000, total: 1944000 },
    ],
  },
  {
    id: 'HD00104',
    customerName: 'Khách lẻ',
    phone: '',
    date: '06/04/2026 10:15',
    createdAt: '2026-04-06T10:15:00.000Z',
    total: 750000,
    status: 'Hoàn thành',
    createdBy: 'Nhân viên',
    items: [{ id: 'SP001', name: 'Panadol Extra', unit: 'Vỉ', qty: 50, price: 15000, total: 750000 }],
  },
  {
    id: 'HD00103',
    customerName: 'Trần Thị Bích',
    phone: '0987654321',
    date: '05/04/2026 16:45',
    createdAt: '2026-04-05T16:45:00.000Z',
    total: 500000,
    status: 'Hoàn thành',
    createdBy: 'Quản trị viên',
    items: [{ id: 'SP004', name: 'Oresol', unit: 'Gói', qty: 100, price: 5000, total: 500000 }],
  },
  {
    id: 'HD00102',
    customerName: 'Lê Hoàng Hải',
    phone: '0912223334',
    date: '05/04/2026 09:20',
    createdAt: '2026-04-05T09:20:00.000Z',
    total: 197500,
    status: 'Đã hủy',
    createdBy: 'Quản trị viên',
    items: [
      { id: 'SP005', name: 'Ibuprofen 400mg', unit: 'Viên', qty: 25, price: 7900, total: 197500 },
    ],
  },
]

const initialEmployees = [
  {
    id: 'NV001',
    accountId: ROOT_ACCOUNT_ID,
    fullName: 'Nguyễn Văn An',
    phone: '0901111222',
    username: 'admin01',
    role: 'Admin',
    isActive: true,
    isRoot: true,
  },
  {
    id: 'NV002',
    accountId: 2,
    fullName: 'Trần Thị Bình',
    phone: '0988333444',
    username: 'staff01',
    role: 'Nhân viên bán hàng',
    isActive: true,
  },
  {
    id: 'NV003',
    accountId: 3,
    fullName: 'Lê Minh Châu',
    phone: '0912555666',
    username: 'staff02',
    role: 'Nhân viên bán hàng',
    isActive: false,
  },
]

const initialAlerts = [
  {
    id: 'ALT-DEMO-001',
    medicineId: 'SP002',
    medicineName: 'Ibuprofen 400mg',
    stock: 5,
    minStock: 15,
    avgSold7d: 24,
    avgSold30d: 95,
    supplierName: 'Dược phẩm Minh Phúc',
    manufacturerName: 'Sanofi Winthrop Industrie',
    lastImportPrice: 6200,
    status: 'PENDING',
    note: 'Hệ thống tự động sinh cảnh báo do tồn kho dưới ngưỡng tối thiểu.',
    createdBy: 'Hệ thống',
    createdAt: DEMO_SEED_TIME,
    resolvedAt: '',
    resolution: null,
  },
]
const initialNotifications = [
  {
    id: 'NTF-DEMO-ADMIN-001',
    targetRole: 'admin',
    message: 'Hệ thống tự động tạo cảnh báo: Ibuprofen 400mg đang dưới ngưỡng tồn kho.',
    createdAt: DEMO_SEED_TIME,
    read: false,
  },
]

const InventoryAlertContext = createContext(null)

function isRootEmployee(employee) {
  return (
    employee?.isRoot === true ||
    Number(employee?.accountId) === ROOT_ACCOUNT_ID ||
    String(employee?.id || '').toUpperCase() === ROOT_EMPLOYEE_ID
  )
}

function normalizeEmployees(items) {
  if (!Array.isArray(items)) return initialEmployees
  return items.map((item, index) => {
    const root = isRootEmployee(item)
    return {
      ...item,
      accountId: Number(item?.accountId) || (root ? ROOT_ACCOUNT_ID : index + 1),
      isRoot: root,
    }
  })
}

function toIsoDateText(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toISOString().slice(0, 10)
}

function isBatchExpired(batch) {
  if (!batch?.expiryDate) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiryDate = new Date(batch.expiryDate)
  expiryDate.setHours(0, 0, 0, 0)
  return !Number.isNaN(expiryDate.getTime()) && expiryDate < today
}

function sumBatchQty(batches) {
  if (!Array.isArray(batches)) return 0
  return batches.reduce(
    (sum, batch) => sum + (isBatchExpired(batch) ? 0 : Number(batch.qty || 0)),
    0,
  )
}

function normalizeBatch(
  batch,
  index,
  medicineId,
  fallbackImportPrice = 0,
  fallbackSupplierName = '',
  fallbackManufacturerName = '',
) {
  const expiryDate = toIsoDateText(batch?.expiryDate)
  const importDate = toIsoDateText(batch?.importDate || batch?.importedAt || batch?.createdAt) || toIsoDateText(DEMO_SEED_TIME)
  return {
    id: batch?.id || `LOT-${medicineId}-${Date.now()}-${index}`,
    lotCode: batch?.lotCode || batch?.code || `LOT-${medicineId}-${String(index + 1).padStart(2, '0')}`,
    qty: Math.max(0, Number(batch?.qty || 0)),
    expiryDate,
    importDate,
    importPrice: Number(batch?.importPrice ?? batch?.costPrice ?? fallbackImportPrice ?? 0),
    supplierName: batch?.supplierName || fallbackSupplierName || 'Chưa cập nhật',
    manufacturerName: batch?.manufacturerName || fallbackManufacturerName || 'Chưa cập nhật',
  }
}

function normalizeMedicine(item, index = 0) {
  const id = item?.id || `SP${String(index + 1).padStart(3, '0')}`
  const fallbackImportPrice = Number(item?.lastImportPrice ?? item?.costPrice ?? 0)
  const fallbackSupplierName = item?.supplierName || 'Chưa cập nhật'
  const fallbackManufacturerName = item?.manufacturerName || ''
  const hasExplicitBatches = Array.isArray(item?.batches)
  const explicitBatches = hasExplicitBatches
    ? item.batches.map((batch, batchIndex) =>
        normalizeBatch(batch, batchIndex, id, fallbackImportPrice, fallbackSupplierName, fallbackManufacturerName),
      )
    : []
  const fallbackStock = Math.max(0, Number(item?.stock || 0))
  const batches =
    hasExplicitBatches
      ? explicitBatches
      : [
          {
            id: `LOT-${id}-DEFAULT`,
            lotCode: `LOT-${id}`,
            qty: fallbackStock,
            expiryDate: toIsoDateText(item?.expiryDate) || '2026-12-31',
            importDate: toIsoDateText(DEMO_SEED_TIME),
            importPrice: fallbackImportPrice,
            supplierName: fallbackSupplierName,
            manufacturerName: fallbackManufacturerName || 'Chưa cập nhật',
          },
        ]
  const stock = sumBatchQty(batches)
  const listPrice = Number(item?.listPrice ?? item?.salePrice ?? item?.price ?? 0)
  const status =
    item?.status ||
    (stock <= 0 ? 'OUT_OF_STOCK' : item?.directSale === false ? 'INACTIVE' : 'ACTIVE')

  return {
    ...item,
    id,
    name: item?.name || 'Chưa đặt tên',
    unit: item?.unit || 'Chưa xác định',
    type: item?.type || 'Thuốc không kê đơn',
    category: item?.category || item?.group || 'Chưa phân nhóm',
    listPrice,
    salePrice: Number(item?.salePrice ?? listPrice),
    price: Number(item?.price ?? listPrice),
    stock,
    minStock: Number(item?.minStock ?? 10),
    status,
    directSale: item?.directSale !== false && status !== 'INACTIVE',
    batches,
    supplierName: item?.supplierName || 'Chưa cập nhật',
    manufacturerName: item?.manufacturerName || '',
    lastImportPrice: fallbackImportPrice,
    avgSold7d: Number(item?.avgSold7d || 0),
    avgSold30d: Number(item?.avgSold30d || 0),
    alertStatus: item?.alertStatus || 'NONE',
    alertNote: item?.alertNote || '',
    alertBy: item?.alertBy || '',
    alertAt: item?.alertAt || '',
  }
}

function normalizeMedicines(items) {
  const source = Array.isArray(items) && items.length > 0 ? items : initialMedicines
  return source.map(normalizeMedicine)
}

export function getNearestExpiryBatch(item) {
  const activeBatches = (item?.batches || [])
    .filter((batch) => Number(batch.qty || 0) > 0 && batch.expiryDate)
    .sort((a, b) => new Date(a.expiryDate) - new Date(b.expiryDate))
  return activeBatches[0] || null
}

export function getExpiryWarning(item, days = EXPIRY_WARNING_DAYS) {
  const batch = getNearestExpiryBatch(item)
  if (!batch) return { isWarning: false, batch: null, daysLeft: null }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expiryDate = new Date(batch.expiryDate)
  expiryDate.setHours(0, 0, 0, 0)
  const daysLeft = Math.ceil((expiryDate - today) / 86400000)

  return {
    isWarning: daysLeft <= days,
    isExpired: daysLeft < 0,
    batch,
    daysLeft,
  }
}

function isRootActor(actor) {
  return (
    actor?.isRoot === true ||
    Number(actor?.accountId) === ROOT_ACCOUNT_ID ||
    String(actor?.employeeId || '').toUpperCase() === ROOT_EMPLOYEE_ID ||
    actor?.email === 'admin@gmail.com'
  )
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        medicines: normalizeMedicines(initialMedicines),
        orders: normalizeOrders(initialOrders),
        employees: initialEmployees,
        alerts: initialAlerts,
        notifications: initialNotifications,
      }
    }
    const parsed = JSON.parse(raw)
    return {
      medicines: normalizeMedicines(parsed?.medicines),
      orders: normalizeOrders(parsed?.orders),
      employees: Array.isArray(parsed?.employees)
        ? normalizeEmployees(parsed.employees)
        : initialEmployees,
      alerts: Array.isArray(parsed?.alerts) ? parsed.alerts : initialAlerts,
      notifications: Array.isArray(parsed?.notifications)
        ? parsed.notifications
        : initialNotifications,
    }
  } catch {
    return {
      medicines: normalizeMedicines(initialMedicines),
      orders: normalizeOrders(initialOrders),
      employees: initialEmployees,
      alerts: initialAlerts,
      notifications: initialNotifications,
    }
  }
}

function parseStorePayload(raw) {
  try {
    const parsed = JSON.parse(raw)
    return {
      medicines: normalizeMedicines(parsed?.medicines),
      orders: normalizeOrders(parsed?.orders),
      employees: Array.isArray(parsed?.employees)
        ? normalizeEmployees(parsed.employees)
        : initialEmployees,
      alerts: Array.isArray(parsed?.alerts) ? parsed.alerts : initialAlerts,
      notifications: Array.isArray(parsed?.notifications)
        ? parsed.notifications
        : initialNotifications,
    }
  } catch {
    return null
  }
}

function cloneSeed(data) {
  return JSON.parse(JSON.stringify(data))
}

function formatDateTime(iso) {
  return new Date(iso).toLocaleString('vi-VN')
}

function normalizeOrderStatusForStore(status) {
  if (status === 'Đã hủy') {
    return status
  }
  return 'Hoàn thành'
}

function normalizeOrders(items) {
  const source = Array.isArray(items) ? items : initialOrders
  return source.map((item) => ({
    ...item,
    status: normalizeOrderStatusForStore(item?.status),
  }))
}

export function getDisplayStatus(item) {
  if (item.status === 'INACTIVE') return { label: 'Ngừng bán', tone: 'disabled' }
  if (item.stock > item.minStock) return { label: 'Bình thường', tone: 'safe' }
  if (item.stock === 0) return { label: 'Hết hàng', tone: 'danger' }
  return { label: 'Sắp hết', tone: 'danger' }
}

export function InventoryAlertProvider({ children }) {
  const initialState = useMemo(loadInitialState, [])
  const [medicines, setMedicines] = useState(initialState.medicines)
  const [orders, setOrders] = useState(initialState.orders)
  const [employees, setEmployees] = useState(initialState.employees)
  const [alerts, setAlerts] = useState(initialState.alerts)
  const [notifications, setNotifications] = useState(initialState.notifications)
  const [updatedAt, setUpdatedAt] = useState(new Date().toISOString())

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ medicines, orders, employees, alerts, notifications }),
    )
  }, [alerts, employees, medicines, notifications, orders])

  useEffect(() => {
    if (localStorage.getItem(DEMO_EXPIRED_BATCH_KEY)) return
    const demoBatches = [
      {
        id: 'LOT-SP001-EXPIRED',
        lotCode: 'PCT-0126-HH',
        qty: 12,
        expiryDate: '2026-01-15',
        importPrice: 11000,
      },
      {
        id: 'LOT-SP001-EXPIRED-02',
        lotCode: 'PCT-0226-HH',
        qty: 8,
        expiryDate: '2026-02-10',
        importPrice: 11000,
      },
      {
        id: 'LOT-SP006-EXPIRED-DEMO',
        lotCode: 'TVK-0126-HH',
        qty: 6,
        expiryDate: '2026-01-25',
        importPrice: 70000,
      },
    ]

    setMedicines((prev) =>
      prev.map((medicine) => {
        const batchesToAdd = demoBatches.filter(
          (batch) =>
            batch.id.includes(medicine.id) &&
            !(medicine.batches || []).some((item) => item.id === batch.id),
        )
        if (batchesToAdd.length === 0) return medicine
        return normalizeMedicine({
          ...medicine,
          batches: [...batchesToAdd, ...(medicine.batches || [])],
        })
      }),
    )
    localStorage.setItem(DEMO_EXPIRED_BATCH_KEY, 'true')
  }, [])

  useEffect(() => {
    if (localStorage.getItem(DEMO_EXPIRED_MEDICINE_KEY)) return
    const expiredDemoMedicine = initialMedicines.find((medicine) => medicine.id === 'SP009')
    if (!expiredDemoMedicine) return

    setMedicines((prev) => {
      if (prev.some((medicine) => medicine.id === expiredDemoMedicine.id)) return prev
      return [...prev, normalizeMedicine(expiredDemoMedicine, prev.length)]
    })
    localStorage.setItem(DEMO_EXPIRED_MEDICINE_KEY, 'true')
  }, [])

  useEffect(() => {
    if (localStorage.getItem(DEMO_MANY_BATCH_MEDICINE_KEY)) return
    const manyBatchDemoMedicine = initialMedicines.find((medicine) => medicine.id === 'SP010')
    if (!manyBatchDemoMedicine) return

    setMedicines((prev) => {
      if (prev.some((medicine) => medicine.id === manyBatchDemoMedicine.id)) return prev
      return [...prev, normalizeMedicine(manyBatchDemoMedicine, prev.length)]
    })
    localStorage.setItem(DEMO_MANY_BATCH_MEDICINE_KEY, 'true')
  }, [])

  // Realtime sync when data changes from another tab/window.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return
      const nextState = parseStorePayload(event.newValue)
      if (!nextState) return
      setMedicines(nextState.medicines)
      setOrders(nextState.orders)
      setEmployees(normalizeEmployees(nextState.employees))
      setAlerts(nextState.alerts)
      setNotifications(nextState.notifications)
      setUpdatedAt(new Date().toISOString())
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const pendingAlerts = useMemo(
    () => alerts.filter((item) => item.status === 'PENDING'),
    [alerts],
  )

  useEffect(() => {
    const eligibleMedicines = medicines.filter(
      (medicine) =>
        medicine.stock <= medicine.minStock &&
        medicine.alertStatus !== 'PENDING' &&
        !alerts.some(
          (alert) => alert.medicineId === medicine.id && alert.status === 'PENDING',
        ),
    )
    if (eligibleMedicines.length === 0) return

    const now = new Date().toISOString()
    const nextAlerts = eligibleMedicines.map((medicine, index) => ({
      id: `ALT-AUTO-${Date.now()}-${index}`,
      medicineId: medicine.id,
      medicineName: medicine.name,
      stock: medicine.stock,
      minStock: medicine.minStock,
      avgSold7d: medicine.avgSold7d,
      avgSold30d: medicine.avgSold30d,
      supplierName: medicine.supplierName,
      lastImportPrice: medicine.lastImportPrice,
      status: 'PENDING',
      note: 'Hệ thống tự động sinh cảnh báo do tồn kho dưới ngưỡng tối thiểu.',
      createdBy: 'Hệ thống',
      createdAt: now,
      resolvedAt: '',
      resolution: null,
    }))

    setAlerts((prev) => [...nextAlerts, ...prev])
    setMedicines((prev) =>
      prev.map((item) => {
        const shouldMark = eligibleMedicines.some((medicine) => medicine.id === item.id)
        if (!shouldMark) return item
        return {
          ...item,
          alertStatus: 'PENDING',
          alertNote: 'Tự động cảnh báo tồn kho thấp',
          alertBy: 'Hệ thống',
          alertAt: now,
        }
      }),
    )
    setNotifications((prev) => [
      {
        id: `NTF-${Date.now()}-admin-auto`,
        targetRole: 'admin',
        message: `Hệ thống tự động tạo ${nextAlerts.length} cảnh báo tồn kho thấp.`,
        createdAt: now,
        read: false,
      },
      ...prev,
    ])
    setUpdatedAt(now)
  }, [alerts, medicines])

  const lowStockAlerts = useMemo(
    () => medicines.filter((item) => item.stock <= item.minStock),
    [medicines],
  )

  const customersFromOrders = useMemo(() => {
    const map = new Map()
    orders.forEach((order) => {
      const customerName = (order.customerName || '').trim()
      if (!customerName || customerName.toLowerCase() === 'khách lẻ') return
      const phone = (order.phone || '').trim()
      const key = phone || customerName.toLowerCase()
      const prev = map.get(key) || {
        id: `KH${String(map.size + 1).padStart(6, '0')}`,
        name: customerName,
        phone,
        gender: '-',
        totalSpent: 0,
      }
      map.set(key, {
        ...prev,
        name: customerName,
        phone,
        totalSpent: prev.totalSpent + Number(order.total || 0),
      })
    })
    return [...map.values()]
  }, [orders])

  const orderStatusSummary = useMemo(
    () => ({
      completed: orders.filter((item) => item.status === 'Hoàn thành').length,
      cancelled: orders.filter((item) => item.status === 'Đã hủy').length,
    }),
    [orders],
  )

  const sendAlert = (medicineId, note = '') => {
    const medicine = medicines.find((item) => item.id === medicineId)
    if (!medicine) return
    if (medicine.stock > medicine.minStock || medicine.alertStatus !== 'NONE') return

    const now = new Date().toISOString()
    const alertId = `ALT-${Date.now()}`
    const alertItem = {
      id: alertId,
      medicineId: medicine.id,
      medicineName: medicine.name,
      stock: medicine.stock,
      minStock: medicine.minStock,
      avgSold7d: medicine.avgSold7d,
      avgSold30d: medicine.avgSold30d,
      supplierName: medicine.supplierName,
      lastImportPrice: medicine.lastImportPrice,
      status: 'PENDING', // PENDING | RESOLVED | REJECTED
      note: note.trim() || 'Hệ thống tự động sinh cảnh báo do tồn kho dưới ngưỡng tối thiểu.',
      createdBy: 'Hệ thống',
      createdAt: now,
      resolvedAt: '',
      resolution: null,
    }

    setAlerts((prev) => [alertItem, ...prev])
    setMedicines((prev) =>
      prev.map((item) =>
        item.id === medicineId
          ? {
              ...item,
              alertStatus: 'PENDING',
              alertNote: note.trim() || 'Tự động cảnh báo tồn kho thấp',
              alertBy: 'Hệ thống',
              alertAt: now,
            }
          : item,
      ),
    )
    setNotifications((prev) => [
      {
        id: `NTF-${Date.now()}-admin`,
        targetRole: 'admin',
        message: `Hệ thống tự động tạo cảnh báo: ${medicine.name} đang dưới ngưỡng tồn kho.`,
        createdAt: now,
        read: false,
      },
      ...prev,
    ])
    setUpdatedAt(now)
  }

  const resolveAlert = (alertId, resolution) => {
    const now = new Date().toISOString()
    const alert = alerts.find((item) => item.id === alertId)
    if (!alert || alert.status !== 'PENDING') return false

    if (resolution.type === 'RECEIPT') {
      const qty = Number(resolution.quantity)
      if (!Number.isFinite(qty) || qty <= 0) return false
      setMedicines((prev) =>
        prev.map((item) =>
          item.id === alert.medicineId
            ? {
                ...item,
                batches: [
                  ...(item.batches || []),
                  {
                    id: `LOT-${item.id}-${Date.now()}`,
                    lotCode: `NHAP-${String(Date.now()).slice(-6)}`,
                    qty,
                    expiryDate: '2027-12-31',
                  },
                ],
                stock: item.stock + qty,
                status: 'ACTIVE',
                alertStatus: 'NONE',
                alertNote: '',
                alertBy: '',
                alertAt: '',
              }
            : item,
        ),
      )
    } else if (resolution.type === 'ADJUSTMENT') {
      const actualStock = Number(resolution.actualStock)
      if (!Number.isFinite(actualStock) || actualStock < 0) return false
      setMedicines((prev) =>
        prev.map((item) =>
          item.id === alert.medicineId
            ? {
                ...item,
                batches: [
                  {
                    id: `LOT-${item.id}-ADJ-${Date.now()}`,
                    lotCode: `KK-${String(Date.now()).slice(-6)}`,
                    qty: actualStock,
                    expiryDate: getNearestExpiryBatch(item)?.expiryDate || '2027-12-31',
                  },
                ],
                stock: actualStock,
                status: actualStock <= 0 ? 'OUT_OF_STOCK' : 'ACTIVE',
                alertStatus: 'NONE',
                alertNote: '',
                alertBy: '',
                alertAt: '',
              }
            : item,
        ),
      )
    } else if (resolution.type === 'REJECT') {
      setMedicines((prev) =>
        prev.map((item) =>
          item.id === alert.medicineId
            ? {
                ...item,
                alertStatus: 'NONE',
                alertNote: '',
                alertBy: '',
                alertAt: '',
              }
            : item,
        ),
      )
    } else {
      return false
    }

    setAlerts((prev) =>
      prev.map((item) =>
        item.id === alertId
          ? {
              ...item,
              status: resolution.type === 'REJECT' ? 'REJECTED' : 'RESOLVED',
              resolvedAt: now,
              resolution,
            }
          : item,
      ),
    )

    const staffNotifyMessage =
      resolution.type === 'RECEIPT'
        ? `Admin đã nhập thêm ${resolution.quantity} ${alert.medicineName}.`
        : resolution.type === 'ADJUSTMENT'
        ? `Admin đã điều chỉnh tồn kho ${alert.medicineName} về ${resolution.actualStock}.`
        : `Admin từ chối nhập ${alert.medicineName}: ${resolution.reason || 'Không nêu lý do'}.`

    setNotifications((prev) => [
      {
        id: `NTF-${Date.now()}-staff`,
        targetRole: 'staff',
        message: staffNotifyMessage,
        createdAt: now,
        read: false,
      },
      ...prev,
    ])
    setUpdatedAt(now)
    return true
  }

  const processAlert = (medicineId, addQty) => {
    const alert = pendingAlerts.find((item) => item.medicineId === medicineId)
    if (!alert) return false
    return resolveAlert(alert.id, { type: 'RECEIPT', quantity: addQty })
  }

  const addOrder = (payload) => {
    const nowIso = payload.createdAt || new Date().toISOString()
    const dateLabel =
      payload.date ||
      new Date(nowIso).toLocaleString('vi-VN', {
        hour12: false,
      })
    const order = {
      id: payload.id,
      customerName: payload.customerName || 'Khách lẻ',
      phone: payload.phone || '',
      date: dateLabel,
      createdAt: nowIso,
      total: Number(payload.total || 0),
      status: payload.status || 'Hoàn thành',
      createdBy: payload.createdBy || 'Nhân viên',
      items: payload.items || [],
    }
    setOrders((prev) => [order, ...prev])
    setUpdatedAt(nowIso)
  }

  const consumeStock = (items) => {
    const shortages = []
    const normalized = items.map((line) => ({
      id: line.id,
      qty: Number(line.qty) || 0,
      name: line.name,
    }))

    normalized.forEach((line) => {
      const medicine = medicines.find((m) => m.id === line.id)
      if (!medicine) return
      if (line.qty <= 0) return
      if (medicine.stock < line.qty) {
        shortages.push({
          id: line.id,
          name: line.name || medicine.name,
          requested: line.qty,
          available: medicine.stock,
        })
      }
    })

    if (shortages.length > 0) {
      return { ok: false, shortages }
    }

    setMedicines((prev) =>
      prev.map((item) => {
        const soldLine = normalized.find((line) => line.id === item.id)
        if (!soldLine || soldLine.qty <= 0) return item
        let remainingQty = soldLine.qty
        const batches = [...(item.batches || [])]
          .sort((a, b) => new Date(a.expiryDate || '9999-12-31') - new Date(b.expiryDate || '9999-12-31'))
          .map((batch) => {
            if (remainingQty <= 0) return batch
            if (isBatchExpired(batch)) return batch
            const currentQty = Number(batch.qty || 0)
            const usedQty = Math.min(currentQty, remainingQty)
            remainingQty -= usedQty
            return { ...batch, qty: currentQty - usedQty }
          })
        const nextStock = sumBatchQty(batches)
        return {
          ...item,
          batches,
          stock: nextStock,
          status: nextStock <= 0 ? 'OUT_OF_STOCK' : item.status === 'OUT_OF_STOCK' ? 'ACTIVE' : item.status,
        }
      }),
    )
    setUpdatedAt(new Date().toISOString())
    return { ok: true, shortages: [] }
  }

  const updateOrderStatus = (orderId, nextStatus) => {
    const validStatuses = ['Hoàn thành', 'Đã hủy']
    if (!validStatuses.includes(nextStatus)) return
    setOrders((prev) =>
      prev.map((item) =>
        item.id === orderId
          ? {
              ...item,
              status: nextStatus,
            }
          : item,
      ),
    )
    setUpdatedAt(new Date().toISOString())
  }

  const addMedicine = (payload) => {
    if (!payload || !payload.id || !payload.name) return
    setMedicines((prev) => {
      const exists = prev.some((item) => item.id === payload.id)
      if (exists) return prev
      return [normalizeMedicine(payload, prev.length), ...prev]
    })
    setUpdatedAt(new Date().toISOString())
  }

  const updateMedicine = (medicineId, patch) => {
    if (!medicineId || !patch) return
    setMedicines((prev) =>
      prev.map((item) => {
        if (item.id !== medicineId) return item
        return normalizeMedicine(
          {
            ...item,
            ...patch,
            batches: patch.batches || item.batches,
          },
          0,
        )
      }),
    )
    setUpdatedAt(new Date().toISOString())
  }

  const deleteMedicine = (medicineId) => {
    if (!medicineId) return
    setMedicines((prev) => prev.filter((item) => item.id !== medicineId))
    setAlerts((prev) => prev.filter((item) => item.medicineId !== medicineId))
    setUpdatedAt(new Date().toISOString())
  }

  const returnOrderItems = (orderId, returnLines) => {
    const order = orders.find((item) => item.id === orderId)
    if (!order || normalizeOrderStatusForStore(order.status) === 'Đã hủy') return false

    const normalizedLines = (returnLines || [])
      .map((line) => ({
        id: line.id,
        qty: Math.max(0, Number(line.qty || 0)),
      }))
      .filter((line) => line.id && line.qty > 0)
    if (normalizedLines.length === 0) return false

    const restockLines = []
    const nextItems = order.items
      .map((item) => {
      const returning = normalizedLines.find((line) => line.id === item.id)
      if (!returning) return item
      const currentQty = Number(item.qty || 0)
      const maxReturnable = Math.max(0, currentQty)
      const acceptedReturnQty = Math.min(returning.qty, maxReturnable)
      if (acceptedReturnQty > 0) {
        restockLines.push({ id: item.id, qty: acceptedReturnQty })
      }
      const nextQty = currentQty - acceptedReturnQty
      const price = Number(item.price || 0)
      return {
        ...item,
        qty: nextQty,
        total: nextQty * price,
      }
    })
      .filter((item) => Number(item.qty || 0) > 0)
    if (restockLines.length === 0) return false
    const isFullyReturned = nextItems.length === 0
    const nextTotal = nextItems.reduce((sum, item) => sum + Number(item.total || 0), 0)

    setOrders((prev) =>
      prev.map((item) =>
        item.id === orderId
          ? {
              ...item,
              items: isFullyReturned ? item.items.map((line) => ({ ...line, qty: 0, total: 0 })) : nextItems,
              total: isFullyReturned ? 0 : nextTotal,
              status: isFullyReturned ? 'Đã hủy' : 'Hoàn thành',
              returnedAt: new Date().toISOString(),
            }
          : item,
      ),
    )

    setMedicines((prev) =>
      prev.map((medicine) => {
        const returning = restockLines.find((line) => line.id === medicine.id)
        if (!returning) return medicine
        const batches = [
          {
            id: `LOT-${medicine.id}-RETURN-${Date.now()}`,
            lotCode: `HOAN-${String(Date.now()).slice(-6)}`,
            qty: returning.qty,
            expiryDate: getNearestExpiryBatch(medicine)?.expiryDate || '2027-12-31',
          },
          ...(medicine.batches || []),
        ]
        return normalizeMedicine({ ...medicine, batches }, 0)
      }),
    )
    setUpdatedAt(new Date().toISOString())
    return true
  }

  const updateEmployeeRole = (employeeId, nextRole, actor = null) => {
    if (!employeeId || !nextRole) return
    const actorIsRoot = isRootActor(actor)
    setEmployees((prev) =>
      prev.map((item) => {
        if (item.id !== employeeId) return item
        if (isRootEmployee(item)) return item
        if (item.role === 'Admin' && !actorIsRoot) return item
        return { ...item, role: nextRole }
      }),
    )
    setUpdatedAt(new Date().toISOString())
  }

  const toggleEmployeeStatus = (employeeId, isActive, actor = null) => {
    if (!employeeId) return
    const actorIsRoot = isRootActor(actor)
    setEmployees((prev) =>
      prev.map((item) => {
        if (item.id !== employeeId) return item
        if (isRootEmployee(item)) return item
        if (item.role === 'Admin' && !actorIsRoot) return item
        return { ...item, isActive: Boolean(isActive) }
      }),
    )
    setUpdatedAt(new Date().toISOString())
  }

  const seedDemoData = () => {
    setMedicines(normalizeMedicines(cloneSeed(initialMedicines)))
    setOrders(cloneSeed(initialOrders))
    setEmployees(cloneSeed(initialEmployees))
    setAlerts(cloneSeed(initialAlerts))
    setNotifications(cloneSeed(initialNotifications))
    setUpdatedAt(new Date().toISOString())
  }

  const staffNotifications = useMemo(
    () => notifications.filter((item) => item.targetRole === 'staff').slice(0, 10),
    [notifications],
  )
  const adminNotifications = useMemo(
    () => notifications.filter((item) => item.targetRole === 'admin').slice(0, 10),
    [notifications],
  )

  const value = useMemo(
    () => ({
      medicines,
      orders,
      employees,
      alerts,
      pendingAlerts,
      lowStockAlerts,
      customersFromOrders,
      orderStatusSummary,
      staffNotifications,
      adminNotifications,
      updatedAt,
      sendAlert,
      resolveAlert,
      processAlert,
      addOrder,
      consumeStock,
      updateOrderStatus,
      addMedicine,
      updateMedicine,
      deleteMedicine,
      returnOrderItems,
      updateEmployeeRole,
      toggleEmployeeStatus,
      seedDemoData,
      formatDateTime,
    }),
    [
      adminNotifications,
      alerts,
      customersFromOrders,
      employees,
      lowStockAlerts,
      medicines,
      orderStatusSummary,
      orders,
      pendingAlerts,
      staffNotifications,
      updatedAt,
    ],
  )

  return (
    <InventoryAlertContext.Provider value={value}>
      {children}
    </InventoryAlertContext.Provider>
  )
}

export function useInventoryAlerts() {
  const ctx = useContext(InventoryAlertContext)
  if (!ctx) {
    throw new Error('useInventoryAlerts must be used within InventoryAlertProvider')
  }
  return ctx
}
