'use client'

import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      
      {/* Top Bar (Mobile) */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: '#111',
        color: '#fff'
      }}>
        <h2>Accounting</h2>
        <button onClick={() => setOpen(!open)} style={{
          background: '#fff',
          color: '#000',
          padding: '5px 10px',
          border: 'none'
        }}>
          Menu
        </button>
      </div>

      <div style={{ display: 'flex' }}>
        
        {/* Sidebar */}
        <div style={{
          width: open ? '200px' : '0px',
          overflow: 'hidden',
          transition: '0.3s',
          background: '#111',
          color: '#fff',
          minHeight: '100vh'
        }}>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link href="/dashboard" style={{ color: '#fff' }}>Dashboard</Link>
              <Link href="/dashboard/accounts" style={{ color: '#fff' }}>Chart of Accounts</Link>
              <Link href="/dashboard/journal" style={{ color: '#fff' }}>Journal</Link>
              <Link href="/dashboard/reports" style={{ color: '#fff' }}>Reports</Link>
            </div>

            <button
              onClick={handleLogout}
              style={{
                marginTop: '30px',
                background: 'red',
                color: 'white',
                padding: '8px',
                border: 'none'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          padding: '20px',
          width: '100%'
        }}>
          {children}
        </div>

      </div>
    </div>
  )
}
