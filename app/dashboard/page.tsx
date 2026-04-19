'use client'

import { useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function DashboardPage() {

  useEffect(() => {
    const setupCompany = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const userId = userData.user.id

      // cek apakah user sudah punya company
      let { data: existingCompany } = await supabase
        .from('user_companies')
        .select('company_id')
        .eq('user_id', userId)
        .single()

      let companyId = existingCompany?.company_id

      // jika belum ada company → buat
      if (!companyId) {
        const { data: newCompany } = await supabase
          .from('companies')
          .insert([{ name: 'My Company' }])
          .select()
          .single()

        if (!newCompany) return

        companyId = newCompany.id

        await supabase.from('user_companies').insert([
          {
            user_id: userId,
            company_id: companyId,
            role: 'owner'
          }
        ])
      }

      // ✅ CEK APAKAH ACCOUNTS SUDAH ADA
      const { data: existingAccounts } = await supabase
        .from('accounts')
        .select('id')
        .eq('company_id', companyId)

      if (!existingAccounts || existingAccounts.length === 0) {

        await supabase.from('accounts').insert([
          { company_id: companyId, code: '101', name: 'Cash', category: 'Asset' },
          { company_id: companyId, code: '102', name: 'Bank', category: 'Asset' },
          { company_id: companyId, code: '201', name: 'Accounts Payable', category: 'Liability' },
          { company_id: companyId, code: '301', name: 'Owner Capital', category: 'Equity' },
          { company_id: companyId, code: '401', name: 'Revenue', category: 'Revenue' },
          { company_id: companyId, code: '501', name: 'Expense', category: 'Expense' }
        ])
      }
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
