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
    <div style={{ minHeight: '100vh', position: 'relative' }}>

      {/* Top Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        background: '#111',
        color: '#fff'
      }}>
        <h2>Accounting</h2>
        <button
          onClick={() => setOpen(true)}
          style={{
            background: '#fff',
            color: '#000',
            padding: '6px 12px',
            border: 'none'
          }}
        >
          Menu
        </button>
      </div>

      {/* Sidebar Overlay */}
      {open && (
        <>
          {/* Dark Overlay */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.4)',
              zIndex: 998
            }}
          />

          {/* Sidebar */}
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '250px',
            height: '100%',
            background: '#111',
            color: '#fff',
            padding: '20px',
            zIndex: 999
          }}>
            <h3>Menu</h3>

            <div style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <Link href="/dashboard" style={{ color: '#fff' }} onClick={() => setOpen(false)}>
                Dashboard
              </Link>
              <Link href="/dashboard/accounts" style={{ color: '#fff' }} onClick={() => setOpen(false)}>
                Chart of Accounts
              </Link>
              <Link href="/dashboard/journal" style={{ color: '#fff' }} onClick={() => setOpen(false)}>
                Journal
              </Link>
              <Link href="/dashboard/reports" style={{ color: '#fff' }} onClick={() => setOpen(false)}>
                Reports
              </Link>
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
        </>
      )}

      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  )
}
