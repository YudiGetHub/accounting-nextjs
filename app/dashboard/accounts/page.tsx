'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Asset')
  const [companyId, setCompanyId] = useState<string | null>(null)

  // Load Company
  useEffect(() => {
    const loadCompany = async () => {
      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) return

      const { data: companyData } = await supabase
        .from('user_companies')
        .select('company_id')
        .eq('user_id', userData.user.id)
        .single()

      if (companyData) {
        setCompanyId(companyData.company_id)
      }
    }

    loadCompany()
  }, [])

  // Load Accounts
  useEffect(() => {
    if (!companyId) return

    const fetchAccounts = async () => {
      const { data } = await supabase
        .from('accounts')
        .select('*')
        .eq('company_id', companyId)
        .order('code', { ascending: true })

      if (data) setAccounts(data)
    }

    fetchAccounts()
  }, [companyId])

  const handleAddAccount = async () => {
    if (!companyId) return

    await supabase.from('accounts').insert([
      {
        company_id: companyId,
        code,
        name,
        category
      }
    ])

    setCode('')
    setName('')

    const { data } = await supabase
      .from('accounts')
      .select('*')
      .eq('company_id', companyId)
      .order('code', { ascending: true })

    if (data) setAccounts(data)
  }

  return (
    <div>
      <h1>Chart of Accounts</h1>

      <div style={{ marginTop: '20px' }}>
        <input
          placeholder="Account Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          placeholder="Account Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Asset</option>
          <option>Liability</option>
          <option>Equity</option>
          <option>Revenue</option>
          <option>Expense</option>
        </select>

        <button onClick={handleAddAccount}>
          Add Account
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3>Account List</h3>

        <table border={1} cellPadding={8}>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id}>
                <td>{acc.code}</td>
                <td>{acc.name}</td>
                <td>{acc.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
