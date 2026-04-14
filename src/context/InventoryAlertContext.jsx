import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'inventory_alert_store_v2'
const DEMO_SEED_TIME = '2026-04-14T08:00:00.000Z'

const initialMedicines = [
  {
    id: 'SP001',
    name: 'Paracetamol 500mg',
    unit: 'Viên',
    stock: 120,
    minStock: 20,
    supplierName: 'Công ty Dược ABC',
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
    supplierName: 'Dược phẩm Minh Phúc',
    lastImportPrice: 6200,
    avgSold7d: 24,
    avgSold30d: 95,
    alertStatus: 'PENDING',
    alertNote: 'Thuốc bán nhanh trong ca tối, đề nghị nhập thêm sớm.',
    alertBy: 'Lê Thu Hà',
    alertAt: DEMO_SEED_TIME,
  },
  {
    id: 'SP003',
    name: 'Vitamin C',
    unit: 'Hộp',
    stock: 0,
    minStock: 10,
    supplierName: 'Công ty Y tế Ánh Dương',
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
    supplierName: 'Dược phẩm Quốc Tế',
    lastImportPrice: 3200,
    avgSold7d: 30,
    avgSold30d: 120,
    alertStatus: 'NONE',
    alertNote: '',
    alertBy: '',
    alertAt: '',
  },
  {
    id: 'SP005',
    name: 'Ibuprofen 400mg',
    unit: 'Viên',
    stock: 100,
    minStock: 25,
    supplierName: 'Dược phẩm Minh Phúc',
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
    supplierName: 'Công ty Dược Nam Dược',
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
    supplierName: 'Thiết bị Y tế Thành Công',
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
    supplierName: 'Thiết bị Y tế Thành Công',
    lastImportPrice: 24000,
    avgSold7d: 12,
    avgSold30d: 45,
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
    status: 'Đang xử lý',
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
    fullName: 'Nguyễn Văn An',
    phone: '0901111222',
    username: 'admin01',
    role: 'Admin',
    isActive: true,
  },
  {
    id: 'NV002',
    fullName: 'Trần Thị Bình',
    phone: '0988333444',
    username: 'staff01',
    role: 'Nhân viên bán hàng',
    isActive: true,
  },
  {
    id: 'NV003',
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
    lastImportPrice: 6200,
    status: 'PENDING',
    note: 'Thuốc bán nhanh trong ca tối, đề nghị nhập thêm sớm.',
    createdBy: 'Lê Thu Hà',
    createdAt: DEMO_SEED_TIME,
    resolvedAt: '',
    resolution: null,
  },
]
const initialNotifications = [
  {
    id: 'NTF-DEMO-ADMIN-001',
    targetRole: 'admin',
    message: 'Cảnh báo demo: Ibuprofen 400mg đang chờ xử lý nhập thêm.',
    createdAt: DEMO_SEED_TIME,
    read: false,
  },
  {
    id: 'NTF-DEMO-STAFF-001',
    targetRole: 'staff',
    message: 'Demo: Bạn có thể gửi cảnh báo mới cho thuốc Tràng Vị Khang (SP006).',
    createdAt: DEMO_SEED_TIME,
    read: false,
  },
]

const InventoryAlertContext = createContext(null)

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return {
        medicines: initialMedicines,
        orders: initialOrders,
        employees: initialEmployees,
        alerts: initialAlerts,
        notifications: initialNotifications,
      }
    }
    const parsed = JSON.parse(raw)
    return {
      medicines: Array.isArray(parsed?.medicines) ? parsed.medicines : initialMedicines,
      orders: Array.isArray(parsed?.orders) ? parsed.orders : initialOrders,
      employees: Array.isArray(parsed?.employees) ? parsed.employees : initialEmployees,
      alerts: Array.isArray(parsed?.alerts) ? parsed.alerts : initialAlerts,
      notifications: Array.isArray(parsed?.notifications)
        ? parsed.notifications
        : initialNotifications,
    }
  } catch {
    return {
      medicines: initialMedicines,
      orders: initialOrders,
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
      medicines: Array.isArray(parsed?.medicines) ? parsed.medicines : initialMedicines,
      orders: Array.isArray(parsed?.orders) ? parsed.orders : initialOrders,
      employees: Array.isArray(parsed?.employees) ? parsed.employees : initialEmployees,
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

export function getDisplayStatus(item) {
  if (item.stock > item.minStock) return { label: 'Bình thường', tone: 'safe' }
  if (item.alertStatus === 'PENDING') return { label: 'Đang xử lý', tone: 'pending' }
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

  // Realtime sync when data changes from another tab/window.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== STORAGE_KEY || !event.newValue) return
      const nextState = parseStorePayload(event.newValue)
      if (!nextState) return
      setMedicines(nextState.medicines)
      setOrders(nextState.orders)
      setEmployees(nextState.employees)
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
      processing: orders.filter((item) => item.status === 'Đang xử lý').length,
      cancelled: orders.filter((item) => item.status === 'Đã hủy').length,
    }),
    [orders],
  )

  const sendAlert = (medicineId, note, userName) => {
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
      note: note.trim(),
      createdBy: userName || 'Nhân viên',
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
              alertNote: note.trim(),
              alertBy: userName || 'Nhân viên',
              alertAt: now,
            }
          : item,
      ),
    )
    setNotifications((prev) => [
      {
        id: `NTF-${Date.now()}-admin`,
        targetRole: 'admin',
        message: `Cảnh báo mới: ${medicine.name} đang dưới ngưỡng tồn kho.`,
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
                stock: item.stock + qty,
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
                stock: actualStock,
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
        return {
          ...item,
          stock: Math.max(0, item.stock - soldLine.qty),
        }
      }),
    )
    setUpdatedAt(new Date().toISOString())
    return { ok: true, shortages: [] }
  }

  const updateOrderStatus = (orderId, nextStatus) => {
    const validStatuses = ['Hoàn thành', 'Đang xử lý', 'Đã hủy']
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
      return [payload, ...prev]
    })
    setUpdatedAt(new Date().toISOString())
  }

  const updateEmployeeRole = (employeeId, nextRole) => {
    if (!employeeId || !nextRole) return
    setEmployees((prev) =>
      prev.map((item) => (item.id === employeeId ? { ...item, role: nextRole } : item)),
    )
    setUpdatedAt(new Date().toISOString())
  }

  const toggleEmployeeStatus = (employeeId, isActive) => {
    if (!employeeId) return
    setEmployees((prev) =>
      prev.map((item) => (item.id === employeeId ? { ...item, isActive: Boolean(isActive) } : item)),
    )
    setUpdatedAt(new Date().toISOString())
  }

  const seedDemoData = () => {
    setMedicines(cloneSeed(initialMedicines))
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
