'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import DashboardContent from '@/components/dashboard/DashboardContent'
import AuthLoader from '@/components/ui/AuthLoader'
import { toast } from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, isAuthenticated } = useAuth()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (isLoading) return
      
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        toast.error('Please log in to access the dashboard')
        router.push('/login')
        return
      }

      setIsCheckingAuth(false)
    }

    checkAuthStatus()
  }, [isAuthenticated, isLoading, router])

  // Show loader while checking auth
  if (isLoading || isCheckingAuth) {
    return <AuthLoader />
  }

  // Show dashboard if authenticated
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardContent user={user} />
      </div>
    )
  }

  return null
}