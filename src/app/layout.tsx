import '@/styles/globals.css'

export const metadata = {
  title: 'SaaS Starter',
  description: 'Next.js SaaS starter template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
