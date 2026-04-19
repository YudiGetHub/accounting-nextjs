'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.push('/login')
      } else {
        setEmail(data.user.email || '')
      }
    }

    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial' }}>
      
      {/* Sidebar */}
      <div style={{
        width: '220px',
        background: '#0f172a',
        color: 'white',
        padding: '20px'
      }}>
        <h2 style={{ marginBottom: '30px' }}>Accounting</h2>
        <p style={{ marginBottom: '15px', cursor: 'pointer' }}>Dashboard</p>
        <p style={{ marginBottom: '15px', cursor: 'pointer' }}>Accounts</p>
        <p style={{ marginBottom: '15px', cursor: 'pointer' }}>Journals</p>
        <p style={{ marginBottom: '15px', cursor: 'pointer' }}>Reports</p>
      </div>

      {/* Main */}
      <div style={{ flex: 1, background: '#f1f5f9', padding: '30px' }}>
        
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '30px'
        }}>
          <h1>Dashboard</h1>
          <div>
            <span style={{ marginRight: '15px' }}>{email}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 15px',
                borderRadius: '6px',
                border: 'none',
                background: '#ef4444',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{
            flex: 1,
            background: 'white',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <h3>Total Asset</h3>
            <p style={{ fontSize: '20px', marginTop: '10px' }}>Rp 0</p>
          </div>

          <div style={{
            flex: 1,
            background: 'white',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <h3>Total Liability</h3>
            <p style={{ fontSize: '20px', marginTop: '10px' }}>Rp 0</p>
          </div>

          <div style={{
            flex: 1,
            background: 'white',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <h3>Equity</h3>
            <p style={{ fontSize: '20px', marginTop: '10px' }}>Rp 0</p>
          </div>
        </div>

      </div>
    </div>
  )
}
