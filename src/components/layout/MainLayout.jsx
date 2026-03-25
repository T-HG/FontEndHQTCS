import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function MainLayout() {
  return (
    <div className="min-h-screen p-3 md:p-5">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1600px] rounded-[32px] border border-white/60 bg-white/70 shadow-2xl backdrop-blur">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="flex-1 p-4 md:p-6 xl:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}