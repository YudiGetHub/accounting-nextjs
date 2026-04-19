export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{
          background: '#f4f4f4',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Total Asset</h3>
          <p>Rp 0</p>
        </div>

        <div style={{
          background: '#f4f4f4',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Total Liability</h3>
          <p>Rp 0</p>
        </div>

        <div style={{
          background: '#f4f4f4',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <h3>Equity</h3>
          <p>Rp 0</p>
        </div>
