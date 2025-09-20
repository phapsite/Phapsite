'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import Sidebar from './Sidebar'
import Header from './Header'
import MainContent from './MainContent'
import { User } from '@/types/user'

interface DashboardContentProps {
  user: User
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        onLogout={logout}
      />

      {/* Main Layout */}
      <div className="flex flex-col flex-1 overflow-hidden lg:ml-64">
        <Header 
          user={user}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          onLogout={logout}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <MainContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  )
}