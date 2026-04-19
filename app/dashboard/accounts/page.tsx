'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<any[]>([])
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [category, setCategory] = useState('Asset')
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // ✅ Load Company ID
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

  // ✅ Load Accounts
  useEffect(() => {
    if (!companyId) return

    fetchAccounts()
  }, [companyId])

  const fetchAccounts = async () => {
    if (!companyId) return

    const { data } = await supabase
      .from('accounts')
      .select('*')
      .eq('company_id', companyId)
      .order('code', { ascending: true })

    if (data) setAccounts(data)
  }

  // ✅ Add Account
  const handleAddAccount = async () => {
    if (!companyId) {
      alert("Company belum siap")
      return
    }

    if (!code.trim() || !name.trim()) {
      alert("Code dan Name wajib diisi")
      return
    }

    setLoading(true)

    const { error } = await supabase.from('accounts').insert([
      {
        company_id: companyId,
        code: code.trim(),
        name: name.trim(),
        category
      }
    ])

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    // Reset form
    setCode('')
    setName('')

    await fetchAccounts()
  }

  return (
    <div>
      <h1>Chart of Accounts</h1>

      {/* ✅ Form */}
      <div style={{
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '400px'
      }}>
        <input
          placeholder="Account Code (ex: 101)"
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
          <option value="Asset">Asset</option>
          <option value="Liability">Liability</option>
          <option value="Equity">Equity</option>
          <option value="Revenue">Revenue</option>
          <option value="Expense">Expense</option>
        </select>

        <button
          type="button"
          onClick={handleAddAccount}
          disabled={loading}
          style={{
            background: '#111',
            color: '#fff',
            padding: '8px',
            border: 'none'
          }}
        >
          {loading ? "Saving..." : "Add Account"}
        </button>
      </div>

      {/* ✅ Table */}
      <div style={{ marginTop: '30px' }}>
        <h3>Account List</h3>

        <table border={1} cellPadding={8} style={{ marginTop: '10px' }}>
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
