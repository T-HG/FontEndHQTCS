import { useNavigate } from 'react-router-dom'
import { FaBell, FaEnvelope, FaSearch } from 'react-icons/fa'

export default function Header() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  if (!user) return null

  return (
    <header className="border-b border-slate-200/70 bg-white/50 px-4 py-4 backdrop-blur md:px-6 xl:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {user.role === 'admin' ? 'Dashboard quản trị' : 'Khu vực nhân viên'}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Theo dõi hoạt động hệ thống nhà thuốc theo thời gian thực
          </p>
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          

          <div className="flex items-center gap-3">
           

            <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 font-bold text-white">
                {(user.name || 'U').charAt(0)}
              </div>

              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-500">
                  {user.role === 'admin' ? 'Administrator' : 'Staff'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-2xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}