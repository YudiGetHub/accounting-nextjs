'use client'

import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage() {

  useEffect(() => {
    const setupCompany = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const userId = userData.user.id

      // ✅ cek apakah user sudah punya company
      const { data: existingCompany } = await supabase
        .from('user_companies')
        .select('company_id')
        .eq('user_id', userId)
        .single()

      if (existingCompany) return

      // ✅ buat company baru
      const { data: newCompany, error: companyError } = await supabase
        .from('companies')
        .insert([{ name: 'My Company' }])
        .select()
        .single()

      if (companyError || !newCompany) {
        console.error(companyError)
        return
      }

      // ✅ hubungkan user dengan company
      await supabase.from('user_companies').insert([
        {
          user_id: userId,
          company_id: newCompany.id,
          role: 'owner'
        }
      ])

      // ✅ AUTO DEFAULT ACCOUNTS
      await supabase.from('accounts').insert([
        { company_id: newCompany.id, code: '101', name: 'Cash', category: 'Asset' },
        { company_id: newCompany.id, code: '102', name: 'Bank', category: 'Asset' },
        { company_id: newCompany.id, code: '201', name: 'Accounts Payable', category: 'Liability' },
        { company_id: newCompany.id, code: '301', name: 'Owner Capital', category: 'Equity' },
        { company_id: newCompany.id, code: '401', name: 'Revenue', category: 'Revenue' },
        { company_id: newCompany.id, code: '501', name: 'Expense', category: 'Expense' }
      ])

      console.log("✅ Company & default accounts created")
    }

    setupCompany()
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <p>System ready.</p>
    </div>
  )
}
