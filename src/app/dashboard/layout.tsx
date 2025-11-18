import Navbar from '@/components/ui/Navbar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <Navbar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}

export default DashboardLayout;