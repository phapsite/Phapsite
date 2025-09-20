'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState
} from 'react'
import {
    getSession,
    destroySession
} from '@/lib/auth'
import toast from 'react-hot-toast'
import {
    useRouter
} from 'next/navigation'

const AuthContext = createContext(undefined)

export function AuthProvider( {
    children
}: {
    children: React.ReactNode
}) {
    const [user,
        setUser] = useState(null)
    const [isAuthenticated,
        setIsAuthenticated] = useState(false)
    const [isLoading,
        setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const session = await getSession()
            if (session?.user) {
                setUser(session.user)
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, password
                }),
            })

            const data = await response.json()

            if (response.ok) {
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`
                setUser(data.user)
                setIsAuthenticated(true)
                router.push('/dashboard')
                return true
            } else {
                toast.error(data.message || 'Login failed')
                return false
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error('Network error during login')
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST'
            })
            setUser(null)
            setIsAuthenticated(false)
            destroySession()
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <AuthContext.Provider value={ { user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}