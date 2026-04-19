'use client'

import Link from 'next/link'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

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
      
      {/* Header */}
      <div style={{
        background: '#111',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <h2>Accounting</h2>
        <button onClick={() => setOpen(true)}>Menu</button>
      </div>

      {/* Sidebar */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '220px',
            height: '100%',
            background: '#111',
            color: '#fff',
            padding: '20px',
            zIndex: 9999
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
            <Link href="/dashboard/accounts" onClick={() => setOpen(false)}>Accounts</Link>
            <Link href="/dashboard/journal" onClick={() => setOpen(false)}>Journal</Link>
            <Link href="/dashboard/reports" onClick={() => setOpen(false)}>Reports</Link>
          </div>

          <button
            onClick={handleLogout}
            style={{ marginTop: '20px' }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  )
}
