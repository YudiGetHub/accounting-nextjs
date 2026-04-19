export const metadata = {
  title: 'Accounting System',
  description: 'Professional Accounting SaaS'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
