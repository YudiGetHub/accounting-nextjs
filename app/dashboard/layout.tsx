'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar */}
      <div style={{
        width: '220px',
        background: '#111',
        color: '#fff',
        padding: '20px'
      }}>
        <h2>Accounting</h2>

        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
          <Link href="/dashboard/accounts" style={{ color: '#fff' }}>Chart of Accounts</Link>
          <Link href="/dashboard/journal" style={{ color: '#fff' }}>Journal</Link>
          <Link href="/dashboard/reports" style={{ color: '#fff' }}>Reports</Link>
        </div>

        <button
          onClick={handleLogout}
          style={{
            marginTop: '40px',
            background: 'red',
            color: 'white',
            padding: '8px',
            border: 'none'
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '40px' }}>
        {children}
      </div>
    </div>
  )
}
