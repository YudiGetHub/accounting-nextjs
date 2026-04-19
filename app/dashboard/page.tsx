'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
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
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Welcome {email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}
