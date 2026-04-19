'use client'

import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage() {

  useEffect(() => {
    const setupCompany = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const userId = userData.user.id

      // cek apakah sudah punya company
      const { data: existing } = await supabase
        .from('user_companies')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (!existing) {
        // buat company baru
        const { data: newCompany } = await supabase
          .from('companies')
          .insert([{ name: 'My Company' }])
          .select()
          .single()

        await supabase.from('user_companies').insert([
          {
            user_id: userId,
            company_id: newCompany?.id,
            role: 'owner'
          }
        ])
      }
    }

    setupCompany()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Company setup automatic.</p>
    </div>
  )
}
